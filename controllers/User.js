const { User, Order, Event } = require('../models/index.js')

const sendMail = require('../helper/mailer')
const { compare } = require('../helper/bcrypt')

class UserController {

    static profile(req, res) {
        User.findAll()
            .then(users => {
                res.render('userProfile', { users })
            })
            .catch(err => res.send(err.message))
    }

    static registerForm(req, res) {
        res.render('userRegister')
    }

    static register(req, res) {
        const { first_name, last_name, email, phone_number, password } = req.body;
        User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            password: password
        })
            .then(users => {
                sendMail(users, 'Thank you for registering on EvenTix!')
                res.redirect('/users/login')
            })
            .catch(err => res.send(err.message))
    }

    static login(req, res) {
        const { error } = req.session
        delete req.session.error
        res.render('userLogin', { error })
    }

    static loginCheck(req, res) {
        const { email, password } = req.body;
    User.findOne({
      where: { email, password }
    })
      .then(result => {
        if (result) {
          if (compare(password, result.password)) {
            req.session.isLogin = true
            res.redirect("/users")
          } else {
            req.session.error = "wrong email/password"
            res.redirect("/users/login")
          }
        } else {
          req.session.error = "wrong email/password"
          res.redirect("/users/login")
        }
      })
      .catch(err => {
        req.session.error = err.message
        res.redirect("/users/login")
      })
    }

    static logout(req, res) {
        delete req.session.isLogin
        res.redirect('/users/login')
    }

    static editForm(req, res) {
        User.findByPk(req.params.id)
            .then(users => {
                res.render('userEdit', { users })
            })
            .catch(err => res.send(err.message))
    }

    static edit(req, res) {
        const { first_name, last_name, email, phone_number, password } = req.body;
        User.update({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            password: password
        }, {
            where: { id: req.params.id }
        })
            .then(result => res.redirect('/users'))
            .catch(err => res.send(err.message))
    }

    static delete(req, res) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => res.redirect('/users'))
            .catch(err => res.send(err.message))
    }

    // static addToCartForm(req, res) {
    //     // console.log(req.params.id);
    //     const promises = [
    //         User.findByPk(req.params.id),
    //         Event.findAll(),
    //         Order.findAll({
    //             where: {
    //                 UserId: +req.params.id
    //             },
    //             include: [Event]
    //         })
    //     ]
    //     Promise.all(promises)
    //         .then(([users, events, orders]) => {
    //             res.render('addEventToCart', { users, events, orders })
    //         })
    //         .catch(err => res.send(err.message))
    // }

    // static addToCart(req, res) {
    //     const { events, quantity } = req.body;
    //     console.log(req.body);
    //     Order.create({
    //         quantity: quantity,
    //         date: new Date(),
    //         EventId: events,
    //         UserId: req.params.id
    //     })
    //         .then(result => {
    //             res.redirect(`users/addToCart/${req.params.id}`)
    //         })
    //         .catch(err => res.send(err.message))
    // }

    static showEventList(req, res) {
        Order.findAll({
            where: {
                UserId: req.params.id
            },
            include: [User, Event]
        })
            .then((data) => {
                res.render('cart', { data })
            })
            .catch(err => res.send(err))
    }
}

module.exports = UserController;