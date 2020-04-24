const { Event, User, Order } = require('../models/index')

let sendMail = require('../helper/mailer')

class EventController {
    static findAll(req, res) {
        Event.findAll()
            .then(events => res.render('events', { events }))
            .catch(err => res.send(err.message))
    }

    static addForm(req, res) {
        res.render('addEventForm')
    }

    static create(req, res) {
        const { name, location, price, capacity } = req.body;
        Event.create({
            name,
            location,
            price,
            capacity
        })
            .then(result => res.redirect('/events'))
            .catch(err => res.send(err.message))
    }

    static editForm(req, res) {
        Event.findByPk(req.params.id)
            .then(events => {
                res.render('eventEdit', { events })
            })
            .catch(err => res.send(err.message))
    }

    static edit(req, res) {
        const { name, location, price, capacity } = req.body;
        Event.update({
            name: name,
            location: location,
            price: price,
            capacity: capacity
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(events => res.redirect('/events'))
            .catch(err => res.send(err.message))
    }

    static delete(req, res) {
        Event.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => res.redirect('/events'))
            .catch(err => res.send(err.message))
    }

    static addUserForm(req, res) {
        const promises = [
            Event.findByPk(req.params.id),
            User.findAll(),
            Order.findAll({
                where: {
                    EventId: +req.params.id
                },
                include: [User, Event]
            })
        ]
        Promise.all(promises)
            .then(([events, users, orders]) => {
                res.render('addEventToCart', { events, users, orders })
            })
            .catch(err => res.send(err.message))
    }

    static addUser(req, res) {
        const { users, quantity } = req.body;
        Order.create({
            quantity: quantity,
            date: new Date(),
            UserId: users,
            EventId: req.params.id,
        })
            .then((result) => {
                res.redirect(`/events/addUserForm/${req.params.id}`)
            })
            .catch(err => res.send(err.message))
    }

}

module.exports = EventController;