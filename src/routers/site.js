const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController')


router.get('/home', siteController.index2, siteController.index3)
router.use('/', siteController.index2,siteController.index)

module.exports = router;