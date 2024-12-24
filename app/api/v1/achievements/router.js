const express = require('express');
const router = express.Router();
const { create, index, find, update, destroy, updateStatus } = require('./controller');
const { authenticateAdmin } = require('../../../middlewares/auth');

router.post('/achievements', authenticateAdmin, create);
router.get('/achievements', index);
router.get('/achievements/:id', find);
router.put('/achievements/:id', authenticateAdmin, update);
router.delete('/achievements/:id', authenticateAdmin, destroy);
router.put('/achievements/:id/status', authenticateAdmin, updateStatus);

module.exports = router;