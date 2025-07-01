const Product = require('../models/Product');


const showAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.render('products/index', { products });
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    }   
};

const showNewProductForm = (req, res) => {
    try {
        res.render('products/new');  
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    } 
};

const addNewProduct = async (req, res) => {
    try {
        const { name, price, desc, img } = req.body;
        await Product.create({ name, price: parseFloat(price), desc, img, author: req.user._id }); 
        req.flash('success', 'Product added successfully!!');     // flash message to show success message  
        res.redirect('/products');  
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    }                    
};

const showParticularProduct = async (req, res) => {
    try {
        const { ID } = req.params; 
        const foundProduct = await Product.findById(ID).populate('reviews'); 
        // res.render('products/show', { foundProduct, success: req.flash('success') }); // sending flash-message without "locals"
        res.render('products/show', { foundProduct }); 
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    }  
};

const showEditProductForm = async (req, res) => {
    try {
        const { ID } = req.params; 
        const foundProduct = await Product.findById(ID); 
        res.render('products/edit', { foundProduct }); 
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    }  
};

const updateProduct = async (req, res) => {  
    try {
        const { ID } = req.params; 
        const { name, price, desc, img } = req.body; 
        await Product.findByIdAndUpdate(ID, { name, price, desc, img });
        req.flash('success', 'Product edited successfully!!');     // flash message to show success message
        res.redirect(`/products/${ID}`); 
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    }    
};

const deleteProduct = async (req, res) => {
    try {
        // // 1. Easy way to delete a product
        // const { ID } = req.params; 
        // const foundProduct = await Product.findById(ID);
        
        // for (let reviewId of foundProduct.reviews) {
        //     await Review.findByIdAndDelete(reviewId);  
        // }
        
        // await Product.findByIdAndDelete(ID); 
        // res.redirect('/products');    


        // 2. Production way to delete a product (using Mongoose-middlewares)
        const { ID } = req.params; 
        await Product.findByIdAndDelete(ID);   // "findByIdAndDelete()" method will internally call the "findOneAndDelete()" mongoose-middleware
        req.flash('success', 'Product deleted successfully!!');     // flash message to show success message
        res.redirect('/products');  
    }
    catch(e) {
        res.status(500).render('error', { error: e.message });
    }  
};


module.exports = { showAllProducts, showNewProductForm, addNewProduct, showParticularProduct, showEditProductForm, updateProduct, deleteProduct };