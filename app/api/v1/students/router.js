const express = require('express');
const router = express.Router();
const { signup, index, find, update, destroy, activeStudent, signin } = require('./controller');
const { authenticateAdmin, authenticateStudent } = require('../../../middlewares/auth');

router.post('/students/signup', signup);
router.put('/students/active', activeStudent);
router.post('/students/signin', signin);
router.get('/students', index);
router.get('/students/:id', find);
router.put('/students/:id', authenticateAdmin, authenticateStudent, update);
router.delete('/students/:id', authenticateAdmin, destroy);

module.exports = router;