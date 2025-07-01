const User = require('../models/User');


const showSignUpForm = (req, res) => {
    res.render('auth/signup');
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({email, username, role});
        const newUser = await User.register(user, password);
        // res.redirect('/login');
        req.login(newUser, function(err) {
            if (err)
                return next(err);
            req.flash('success', `Welcome ${req.user.username}, you are registered successfully!!`);
            return res.redirect('/products');
        });
    }
    catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('auth/login');
};

const loginUser = (req, res) => {
    // console.log(req.user);
    req.flash('success', `Welcome back ${req.user.username}!!`);
    res.redirect('/products');
};

const logOutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err) 
            return next(err);
        req.flash('success', 'GoodBye, see you again!!');
        res.redirect('/login');
    });
};


module.exports = { showSignUpForm, registerUser, showLoginForm, loginUser, logOutUser };