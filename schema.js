
// Schemas for your "Server-Side Validation" (JOI)
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.number().required().min(0),  
    desc: Joi.string().required(),
});


const reviewSchema = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    comment: Joi.string().required(),
});


module.exports = { productSchema, reviewSchema };