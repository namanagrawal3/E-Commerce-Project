if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productApi');
const paymentRoutes = require('./routes/payment');


mongoose.connect(process.env.DB_URL)
.then(() => {
  console.log('MongoDB Atlas connected successfully');
})
.catch((err) => {
  console.log('Database connection failed'); 
  console.log(err);     
});


app.engine('ejs', ejsMate);         // using "ejs-mate" engine for ejs templating files

app.set('view engine', 'ejs');      // engine will read only ejs templating files
app.set('views', path.join(__dirname, 'views'));            // views folder
app.use(express.static(path.join(__dirname, 'public')));    // public folder
app.use(express.urlencoded({ extended: true }));    // to parse the incoming request body
app.use(methodOverride('_method'));   


// configuring the session
const configSession = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000
  }
};

app.use(session(configSession));    // session middleware 
app.use(flash());                   // flash middleware (Must come after session middleware)


// use static serialize and deserialize methods of model for passport session support
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); 


app.use((req, res, next) => {      // middleware to make flash-messages available in all templates(ejs files)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');  
  res.locals.error = req.flash('error');  
  next();  
});


// seeding the database
// seedDB();


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});


// Routes
app.use(productRoutes);     // middleware is used so that all incoming requests to the server will be checked whether they are productRoutes
app.use(reviewRoutes);   
app.use(authRoutes); 
app.use(cartRoutes); 
app.use(productApi);
app.use(paymentRoutes); 



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});