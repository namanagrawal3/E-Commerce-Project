const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { isLoggedIn } = require('../middleware');
const User = require('../models/User');


router.post('/payment/checkout', isLoggedIn, async (req, res) => {
    const user = req.user;
    const foundUser = await User.findById(user._id).populate('cart');
    // console.log(foundUser.cart);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: foundUser.cart.map((product) => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `${product.name}`,
                    },
                    unit_amount: product.price * 100,  // in paisa
                },
                quantity: 1,
            }
        }),
        mode: 'payment',
        success_url: 'http://localhost:8080/payment/success',
        cancel_url: 'http://localhost:8080/payment/fail',
    });

    res.redirect(303, session.url);         // Redirect to Stripe Checkout Page
});


router.get('/payment/success', (req, res) => {
    res.send("Payment Successful! Thank you.");
});


router.get('/payment/fail', (req, res) => {
    res.send("Payment Cancelled or Failed.");
});


module.exports = router;