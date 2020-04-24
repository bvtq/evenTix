const router = require('express').Router()
const AdminController = require('../controllers/Admin')

router.get('/', AdminController.findAll)


module.exports = router;