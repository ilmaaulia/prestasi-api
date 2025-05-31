const express = require('express');
const router = express.Router();
const { create, find } = require('./controller');

const upload = require('../../../middlewares/multer');

router.post('/images', upload.single('image'), create);
router.get('/images/:id', find); 

module.exports = router;
