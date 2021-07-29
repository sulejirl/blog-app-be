const express = require('express');
const router = express.Router();

const { getBlogs, postBlog, postComment } = require('./controller');

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get Blogs
 *     description: Retrieve a list of Blogposts
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Blogposts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The blog ID.
 *                         example: 6102e12ef4051d32846154ab
 *                       body:
 *                         type: string
 *                         description: The body of blog.
 *                         example: <p>Test Body</p>
 *                       title:
 *                         type: string
 *                         description: The title of blog.
 *                         example: Title
 *                       createdAt:
 *                         type: string
 *                         description: creation date.
 *                         example: 2021-07-29T17:11:10.535Z
 *                       updatedAt:
 *                         type: string
 *                         description: Last update date.
 *                         example: 2021-07-29T17:11:10.535Z
 *                       status:
 *                         type: boolean
 *                         description: Status.
 *                         example: true
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: The blog ID.
 *                             body:
 *                               type: string
 *                               description: The body of comment.
 *                               example: Test Body of comment
 *                             name:
 *                               type: string
 *                               description: The name of comment owner.
 *                               example: Title
 *                             createdAt:
 *                               type: string
 *                               description: creation date.
 *                               example: 2021-07-29T17:11:10.535Z
 *                             updatedAt:
 *                               type: string
 *                               description: Last update date.
 *                               example: 2021-07-29T17:11:10.535Z
 *                             status:
 *                               type: boolean
 *                               description: Status.
 *                               example: true
 */
router.get('/', getBlogs);

/**
 * @swagger
 * /blogs/:id:
 *   get:
 *     summary: Get a Blog
 *     description: Retrive a Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Retrive a Blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Blogposts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The blog ID.
 *                       example: 6102e12ef4051d32846154ab
 *                     body:
 *                       type: string
 *                       description: The body of blog.
 *                       example: <p>Test Body</p>
 *                     title:
 *                       type: string
 *                       description: The title of blog.
 *                       example: Title
 *                     createdAt:
 *                       type: string
 *                       description: creation date.
 *                       example: 2021-07-29T17:11:10.535Z
 *                     updatedAt:
 *                       type: string
 *                       description: Last update date.
 *                       example: 2021-07-29T17:11:10.535Z
 *                     status:
 *                       type: boolean
 *                       description: Status.
 *                       example: true
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The blog ID.
 *                           body:
 *                             type: string
 *                             description: The body of comment.
 *                             example: Test Body of comment
 *                           name:
 *                             type: string
 *                             description: The name of comment owner.
 *                             example: Title
 *                           createdAt:
 *                             type: string
 *                             description: creation date.
 *                             example: 2021-07-29T17:11:10.535Z
 *                           updatedAt:
 *                             type: string
 *                             description: Last update date.
 *                             example: 2021-07-29T17:11:10.535Z
 *                           status:
 *                             type: boolean
 *                             description: Status.
 *                             example: true
 */
router.get('/:id', getBlogs);
/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Post Blog
 *     description: Post a Blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Blog Title.
 *                 example: Title
 *               body:
 *                 type: string
 *                 description: The Blog Body.
 *                 example: <p>Test Body</p>
 */
router.post('/', postBlog);
/**
 * @swagger
 * /blogs/comment:
 *   post:
 *     summary: Post Comment
 *     description: Post a Comment to a Blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The Blog Id.
 *                 example: 61030603268c945cd4247cc5
 *               name:
 *                 type: string
 *                 description: The Comment Owner Name.
 *                 example: Title
 *               body:
 *                 type: string
 *                 description: The Comment Body.
 *                 example: Test Body
 */
router.post('/comment', postComment);

module.exports = router;
