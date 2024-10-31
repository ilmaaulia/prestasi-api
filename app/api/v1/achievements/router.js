const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/achievements', index);

router.get('/achievements/:id', find);

router.put('/achievements/:id', update);

router.delete('/achievements/:id', destroy);

router.post('/achievements', create);

module.exports = router;