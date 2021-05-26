const express = require('express');
const router = express.Router();
const manhController = require('../controllers/ManhController')

router.get('/',manhController.baocao1,manhController.baocao2)
router.get('/pagination', manhController.page)
router.put('/put/:id', manhController.pul)
router.delete('/delete', manhController.del)
router.get('/log', manhController.log)
router.post('/login', manhController.login)
router.post('/register', manhController.register)
router.use('/',  manhController.index)

module.exports = router;