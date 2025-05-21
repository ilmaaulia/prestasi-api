const express = require('express');
const router = express.Router();
const { create, find, index, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.post('/news', authenticateUser, authorizeRoles('admin'), create);
router.get('/newses', authenticateUser, index);
router.get('/news/:id', authenticateUser, find);
router.put('/news/:id', authenticateUser, authorizeRoles('admin'), update);
router.delete('/news/:id', authenticateUser, authorizeRoles('admin'), destroy);

router.get('/public/newses', index);
router.get('/public/news/:id', find);

module.exports = router;
