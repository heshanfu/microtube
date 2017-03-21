// jshint esversion: 6, asi: true
// eslint-env es6

const express = require('express')
const path = require('path')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

const userController = require('./controllers/user')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.set('partials', path.join(__dirname, 'views', 'partials'))
app.set('port', 3000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

//Routes
app.post('/auth/google', userController.authGoogle)
app.get('/auth/google/callback', userController.authGoogleCallback)

app.use((req, res) => {
  res.render('layouts/main', {
    title: 'Youtube Lite',
    initialState: JSON.stringify({})
  })
})

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
