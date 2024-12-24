const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy } = require('./controller');
const { authenticateAdmin } = require('../../../middlewares/auth');

router.post('/news', authenticateAdmin, create);
router.get('/newses', index);
router.get('/news/:id', find);
router.put('/news/:id', authenticateAdmin, update);
router.delete('/news/:id', authenticateAdmin, destroy);

module.exports = router;