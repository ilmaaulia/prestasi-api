const express = require('express');
const router = express.Router();
const { create } = require('./controller');

router.post('/admin', create);

module.exports = router;