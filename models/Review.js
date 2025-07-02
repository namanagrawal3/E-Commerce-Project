
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({      
    rating: {  
        type: Number,
        min: 0,
        max: 5
    },
    comment: {  
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });       // to add "createdAt" and "updatedAt" timestamps fields automatically


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;