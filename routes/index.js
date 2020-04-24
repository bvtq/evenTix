const router = require('express').Router()

const eventRouter = require('./event')
const userRouter = require('./user')

router.get('/', (req, res) => {
    res.render('home')
})

router.use('/events', eventRouter)
router.use('/users', userRouter)

module.exports = router;