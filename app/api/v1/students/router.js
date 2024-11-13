const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.post('/students', create);
router.get('/students', index);
router.get('/students/:id', find);
router.put('/students/:id', update);
router.delete('/students/:id', destroy);

module.exports = router;