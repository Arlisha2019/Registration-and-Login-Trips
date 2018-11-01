const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
var session = require('express-session')

let usersList = []


app.use(session({
  secret: '123$$ABC$123',
  resave: false,
  saveUninitialized: false
}))

app.use(express.static('css'))

app.use(bodyParser.urlencoded({ extended: false}))

app.engine('mustache',mustacheExpress())

app.set('views','./login')

app.set('view engine', 'mustache')

app.get('/login', function(req, res) {
  res.render('login')
})

app.get('/register', function(reg, res) {
  res.render('login')
})

app.get('/add-trips', function(req, res) {
  res.render('add-trips')
})

app.post('/register', function(req, res) {

   let userNameR = req.body.userNameR
   let passwordR = req.body.passwordR

   usersList.push({ userName: userNameR, password: passwordR})
   res.redirect('/add-trips')
 })

 app.post('/login', function(req, res) {

   let userNameL = req.body.userNameL
   let passwordL = req.body.passwordL

   let user = usersList.find(function(user) {
     return user.userName == userNameL && user.password == passwordL
   })
   if(user) {
     res.redirect('/add-trips')
   }
   if(userNameL == usersList.userName && passwordL == usersList.password) {
     if(req.session) {
       req.session.userName = userName
       res.redirect('/add-trips')
     }
   } else {
     let wrong = "Incorrect login"
     res.redirect('/login', {wrong:wrong})
   }

 })

   //let user = usersList.find(function(user) {
     //return user.userNameR == userNameR && user.passwordR == passwordR




//for user name to post on web page
//{ usersList: usersList, username : usersList[0 ].userNameR}



app.listen(port, function() {
  console.log("Welcome Back")
})
