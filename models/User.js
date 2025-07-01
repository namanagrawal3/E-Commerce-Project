
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');   // PLM will automatically store unique 'username' and hashed 'password' in DB

const userSchema = new mongoose.Schema({      
    email: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});


userSchema.plugin(passportLocalMongoose);                 // plug-in before the model creation


const User = mongoose.model('User', userSchema);
module.exports = User;