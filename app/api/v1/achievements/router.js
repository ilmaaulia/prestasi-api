const express = require('express');
const router = express.Router();
const { create, index, find, update, destroy, updateStatus } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

router.post('/achievements', authenticateUser, authorizeRoles('admin', 'student'), create);
router.get('/achievements', index);
router.get('/achievements/:id', find);
router.put('/achievements/:id', authenticateUser, authorizeRoles('admin', 'student'), update);
router.delete('/achievements/:id', authenticateUser, authorizeRoles('admin', 'student'), destroy);
router.put('/achievements/:id/status', authenticateUser, authorizeRoles('admin'), updateStatus);

module.exports = router;
