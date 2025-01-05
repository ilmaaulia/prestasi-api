const express = require('express');
const router = express.Router();
const { create, index, find, update, destroy, updateStatus } = require('./controller');
const { authenticateAdmin, authenticateStudent } = require('../../../middlewares/auth');

router.post('/achievements', authenticateAdmin, authenticateStudent, create);
router.get('/achievements', index);
router.get('/achievements/:id', find);
router.put('/achievements/:id', authenticateAdmin, authenticateStudent, update);
router.delete('/achievements/:id', authenticateAdmin, destroy);
router.put('/achievements/:id/status', authenticateAdmin, updateStatus);

module.exports = router;