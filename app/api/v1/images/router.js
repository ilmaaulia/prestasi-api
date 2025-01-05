const express = require('express');
const router = express.Router();
const { create, update } = require('./controller');

const upload = require('../../../middlewares/multer');

router.post('/images', upload.single('image'), create);
router.put('/images/:id', upload.single('image'), update);

module.exports = router;
