const app = require('../app');
const mongoose = require('mongoose');
const { Blog } = require('../routes/Blog/schema');
const supertest = require('supertest');
require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV || 'development'}`,
});
const mongoUri = process.env.MONGO_URI;
beforeEach((done) => {
  mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

test('GET /blogs', async () => {
  const blog = new Blog({ title: 'Post 1', body: 'Lorem ipsum' });
  await blog.save();

  await supertest(app)
    .get('/blogs')
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.blogs)).toBeTruthy();

      // Check data
      expect(response.body.blogs[0].title).toBe(blog.title);
      expect(response.body.blogs[0].body).toBe(blog.body);
    });
});

test('GET /blogs', async () => {
  const blog = new Blog({ title: 'Post 1', body: 'Lorem ipsum' });
  await blog.save();

  await supertest(app)
    .get('/blogs')
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.blogs)).toBeTruthy();

      // Check data
      expect(response.body.blogs[0].title).toBe(blog.title);
      expect(response.body.blogs[0].body).toBe(blog.body);
    });
});

test('GET /blogs/:id', async () => {
  const blog = new Blog({ title: 'Post 1', body: 'Lorem ipsum' });
  await blog.save();
  let result = await Blog.find();
  await supertest(app)
    .get(`/blogs/${result[0]._id}`)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(typeof response.body).toBe('object');

      // Check data
      expect(response.body.title).toBe(blog.title);
      expect(response.body.body).toBe(blog.body);
    });
});
test('POST /blogs', async () => {
  const blog = { title: 'Post 1', body: 'Lorem ipsum' };
  await supertest(app)
    .post(`/blogs`)
    .send(blog)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe('object');
    });
});

test('POST /blogs/comments', async () => {
  const blog = new Blog({ title: 'Post 1', body: 'Lorem ipsum' });
  await blog.save();
  const comment = { name: 'Ahmet', body: 'Lorem ipsum' };

  let result = await Blog.find();
  let data = { _id: result._id, name: 'Ahmet', body: 'Lorem ipsum' };
  await supertest(app)
    .post(`/blogs/comment`)
    .send(data)
    .expect(200)
    .then((response) => {
      // Check type and length
      console.log(response.body)
      expect(response.statusCode).toEqual(200);

    });
});
