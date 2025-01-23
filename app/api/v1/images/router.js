const express = require('express');
const router = express.Router();
const { create, update, find } = require('./controller');

const upload = require('../../../middlewares/multer');

router.post('/images', upload.single('image'), create);
router.put('/images/:id', upload.single('image'), update);
router.get('/images/:id', find); 

module.exports = router;
