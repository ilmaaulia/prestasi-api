const express = require('express');
const router = express();
const { create, find, index, update, destroy } = require('./controller');

router.post('/news', create);
router.get('/newses', index);
router.get('/news/:id', find);
router.put('/news/:id', update);
router.delete('/news/:id', destroy);

module.exports = router;