const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
var session = require('express-session')

let usersList = []

let trips = []

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
  res.render('add-trips', { trips: trips })
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
     res.redirect('/login')
   }

 })

 app.post('/add-trips', function(req, res) {

  let title = req.body.tripTitle
  let image = req.body.tripImage
  let beginDate = req.body.departureDate
  let endDate = req.body.returnDate

  trips.push({title : title, image : image, beginDate : beginDate, endDate : endDate })

  res.redirect('/add-trips')

 })

app.post('/delete-trips', function(req, res) {

  let title = req.body.tripTitle

  trips = trips.filter(function(trip) {
    return trip.tripTitle != title
  })
  console.log(trips);
  res.render('delete-trips', {title: title})
})
   //let user = usersList.find(function(user) {
     //return user.userNameR == userNameR && user.passwordR == passwordR




//for user name to post on web page
//{ usersList: usersList, username : usersList[0 ].userNameR}



app.listen(port, function() {
  console.log("Welcome Back")
})
