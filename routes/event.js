const router = require('express').Router()
const EventController = require('../controllers/Event')

router.get('/', EventController.findAll)
router.get('/add', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, EventController.addForm)
router.post('/add', EventController.create)
router.get('/edit/:id', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, EventController.editForm)
router.post('/edit/:id', EventController.edit)
router.get('/addUserForm/:id', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, EventController.addUserForm)
router.get('/delete/:id', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, EventController.delete)
router.post('/addUser/:id', EventController.addUser)


module.exports = router;