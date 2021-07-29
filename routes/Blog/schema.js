const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    body: {
      type: String,
      required: [true, 'Comment body is required'],
    },
  },
  { timestamps: true }
);
const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    body: {
      type: String,
      required: [true, 'Blog body is required'],
    },
    comments: [CommentSchema],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports ={
  Blog:mongoose.model('blog', BlogSchema),
  Comment:mongoose.model('comment', CommentSchema)
};
