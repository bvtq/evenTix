"use strict";

const express = require('express')
const app = express();
const port = 3000;
const routes = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use('/', routes)


app.listen(port, () => console.log(`Connected to port ${port}`))