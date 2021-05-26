const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController')


router.post('/', registerController.register)
router.use('/', registerController.index2)


module.exports = router;