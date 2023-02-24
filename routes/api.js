const express = require('express');
const router = express.Router();

router.use('/book', require('./services/BookService'));
router.use('/user', require('./services/UserService'));

module.exports = router;