const express = require('express');
const router = express.Router();
const manageFileController = require('../controllers/ManageFileController')


router.delete('/', manageFileController.delete)
router.post('/store', manageFileController.check, manageFileController.store)
router.get('/', manageFileController.check, manageFileController.index2)
router.use('/', manageFileController.index)


module.exports = router;