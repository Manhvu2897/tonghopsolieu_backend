const express = require('express');
const router = express.Router();
const nextController = require('../controllers/NextController')


router.get('/', nextController.index2, nextController.index3)
router.use('/', nextController.index)


module.exports = router;