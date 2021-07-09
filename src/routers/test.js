const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController')



router.use('/', testController.index)


module.exports = router;