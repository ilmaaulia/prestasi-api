const express = require('express');
const router = express.Router();
const { signup, index, find, update, destroy, activeStudent, signin } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.post('/students/signup', signup);
router.put('/students/active', activeStudent);
router.post('/students/signin', signin);
router.get('/students', authenticateUser, index);
router.get('/students/:id', authenticateUser, find);
router.put('/students/:id', authenticateUser, authorizeRoles('admin', 'student'), update);
router.delete('/students/:id', authenticateUser, authorizeRoles('admin'), destroy);

router.get('/public/students', index);
router.get('/public/students/:id', find);

module.exports = router;
