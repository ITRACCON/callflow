const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

router.get('/', settingsController.getAllSettings);
router.put('/:key', settingsController.updateSetting);

module.exports = router;