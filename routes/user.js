const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, UserController.profile)
router.get('/register', UserController.registerForm)
router.post('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/login', UserController.loginCheck)
router.get('/logout', UserController.logout)
router.get('/edit/:id', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, UserController.editForm)
router.post('/edit/:id', UserController.edit)
router.get('/delete/:id', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, UserController.delete)

router.get('/events/:id', (req, res, next) => {
    if(req.session.isLogin) {
        next()
    } else {
        req.session.error = 'Please login first'
        res.redirect('/users/login')
    }
}, UserController.showEventList)

// router.get('/sendMail', UserController.sendSuccessMail)

module.exports = router;