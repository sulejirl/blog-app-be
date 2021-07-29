const getBlogsService = () => {
  try {
    let query = {};
    if (req.query.id) {
     let cachedResult =  cache.get(req.query.id);
     
      return await Blog.findOne(query);
    } else {
      return await Blog.find(query).sort({ createdAt: -1 });
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};
