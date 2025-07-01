
const mongoose = require('mongoose');
const Review = require('./Review'); 
const User = require('./User');

const productSchema = new mongoose.Schema({
    name: {  
        type: String,
        trim: true,
        required: true
    }, 
    img: {  
        type: String,
        trim: true,
        default: '/images/unknown.avif'
    },       
    price: {  
        type: Number,
        required: true
    },
    desc: {  
        type: String,
        trim: true
    },
    reviews: [
        {  
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'           // reference to the Review model
        }
    ],
    avgRating: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }  
});


// middleware jo BTS mongoDB operations karwane par use hote hain and iske andar 'pre' and 'post' middlewares
// hote hain which are basically used over the schema and always written before the model-creation 

productSchema.post('findOneAndDelete', async function (deletedProduct) {
    if (deletedProduct) {
        if (deletedProduct.reviews.length > 0) 
            await Review.deleteMany({ _id: { $in: deletedProduct.reviews } });

        await User.updateMany(
            { cart: deletedProduct._id },            // Filter: jinke cart me wo product hai
            { $pull: { cart: deletedProduct._id } }  // Update: unke cart se us product ko hata do
        )
    }
});
// On deleting a product, it's reviews will also get delete and Users' cart will get modified


const Product = mongoose.model('Product', productSchema);
module.exports = Product;