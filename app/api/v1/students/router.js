const express = require('express');
const router = express.Router();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateAdmin } = require('../../../middlewares/auth');

router.post('/students', create);
router.get('/students', index);
router.get('/students/:id', find);
router.put('/students/:id', authenticateAdmin, update);
router.delete('/students/:id', authenticateAdmin, destroy);

module.exports = router;