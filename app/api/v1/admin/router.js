const express = require('express');
const router = express.Router();
const { create, signinCms } = require('./controller');

router.post('/admin', create);
router.post('/admin/signin', signinCms);

module.exports = router;
