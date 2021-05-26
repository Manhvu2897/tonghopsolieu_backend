const express = require('express');
const router = express.Router();
const adminteController = require('../controllers/AdminteController')



router.post('/', adminteController.post)

router.get('/', adminteController.index1, adminteController.check ,adminteController.index2)

router.use('/', adminteController.index)


module.exports = router;