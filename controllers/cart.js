const User = require('../models/User');


const showUserCart = async (req, res) => {
    const foundUser = await User.findById(req.user._id).populate('cart');
    const totalAmount = foundUser.cart.reduce((sum, curr) => sum + curr.price, 0);
    const productInfo = foundUser.cart.map((product) => product.desc).join(',');
    res.render('cart/cart', { foundUser, totalAmount, productInfo });
};

const addProductInCart = async (req, res) => {
    const { productID } = req.params;
    const userID = req.user._id;
    const foundUser = await User.findById(userID);
    foundUser.cart.push(productID);
    await foundUser.save(); 
    req.flash('success', 'Product added to cart successfully!');
    res.redirect('/user/cart');
};

const removeProductFromCart = async (req, res) => {
    const { productID } = req.params;
    const user = req.user;
    await User.findByIdAndUpdate(user._id, { $pull: { cart: productID }});
    req.flash('success', 'Product removed from the cart!!');
    res.redirect('/user/cart');
};

const buyParticularProduct = async (req, res) => {
    const { productID } = req.params;
    const user = await User.findById(req.user._id);
    user.cart = [];
    user.cart.push(productID);
    await user.save();
    req.flash('success', 'Product added to the cart!!');
    res.redirect('/user/cart');
};


module.exports = { showUserCart, addProductInCart, removeProductFromCart, buyParticularProduct };