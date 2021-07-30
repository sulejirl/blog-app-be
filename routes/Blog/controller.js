const { Blog, Comment } = require('./schema');
const ObjectId = require('mongoose').Types.ObjectId;
const CacheService = require('../../utils/cache.js');

const ttl = 60 * 10 * 1; // cache for 10 min
const cache = new CacheService(ttl);
const getBlogs = async (req, res, next) => {
  try {
    let query = {};
    if (req.params.id) {
      let cachedResult = cache.get(`getBlogWithId_${req.params.id}`);
      if (cachedResult) {
        res.send(cachedResult);
      } else {
        query = { _id: req.params.id };
        let result = await Blog.findOne(query);
        cache.set(`getBlogWithId_${req.params.id}`, result);
        res.send(result);
      }
    } else {
      let cachedResult = cache.get(`getBlogs_${req.query.page}`);

      if (cachedResult) {
        res.send(cachedResult);
      } else {
        let query = [
          { $sort: { createdAt: -1 } },
          { $skip: (req.query.page - 1) * 8 },
          { $limit: Number(8) },
        ];
        let facet = [
          {
            $facet: {
              blogs: query,
              count: [{ $count: 'count' }],
            },
          },
        ];
        let result = await Blog.aggregate(facet);
        let response = {
          blogs: result[0].blogs,
          count: result[0].count[0].count,
        };

        cache.set(`getBlogs_${req.query.page}`, response);
        res.send(response);
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ error: e.toString() }) && next(e);
  }
};
const postBlog = async (req, res, next) => {
  try {
    let blog = new Blog(req.body);
    cache.delStartWith('getBlogs_');
    res.send(await blog.save());
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ error: e.message.toString() }) && next(e);
  }
};
const postComment = async (req, res, next) => {
  try {
    let id = req.body._id;
    let data = {
      name: req.body.name,
      body: req.body.body,
    };
    if (!req.body.name || !req.body.body) {
      throw new Error(!req.body.name ? 'Name is required' : 'Body is required');
    } else {
      let comment = new Comment(data);
      cache.del(`getBlogWithId_${req.body._id}`);
      let result = await Blog.updateOne(
        { _id: ObjectId(id) },
        { $push: { comments: comment } }
      );
      res.send(result);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ error: e.message.toString() })&& next(e);
  }
};

module.exports = {
  postBlog,
  getBlogs,
  postComment,
};
