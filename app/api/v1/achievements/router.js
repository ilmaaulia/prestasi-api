const express = require('express');
const router = express.Router();
const { create, index, find, update, destroy } = require('./controller');

router.post('/achievements', create);
router.get('/achievements', index);
router.get('/achievements/:id', find);
router.put('/achievements/:id', update);
router.delete('/achievements/:id', destroy);

module.exports = router;