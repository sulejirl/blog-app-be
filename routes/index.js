const router = (module.exports = require('express').Router());
const blog = require('./Blog');

router.use('/blogs', blog);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
