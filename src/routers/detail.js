const express = require('express');
const router = express.Router();
const detailController = require('../controllers/DetailController')

router.get('/', detailController.check, detailController.index2)
router.use('/', detailController.index)


module.exports = router;