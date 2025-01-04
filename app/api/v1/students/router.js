const express = require('express');
const router = express.Router();
const { signup, index, find, update, destroy, activeStudent } = require('./controller');
const { authenticateAdmin } = require('../../../middlewares/auth');

router.post('/students/signup', signup);
router.put('/students/active', activeStudent);
router.get('/students', index);
router.get('/students/:id', find);
router.put('/students/:id', authenticateAdmin, update);
router.delete('/students/:id', authenticateAdmin, destroy);

module.exports = router;