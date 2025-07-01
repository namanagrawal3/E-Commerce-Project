
const mongoose = require('mongoose');
const Product = require('./models/Product');


const products = [
    {
        name: 'Apple iPhone 14 Pro Max',
        img: 'https://images.unsplash.com/photo-1680687688158-e9165395ff00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZSUyMDE0JTIwcHJvJTIwbWF4fGVufDB8fDB8fHww',
        price: 164000,
        desc: 'The iPhone 14 Pro Max features a stunning Super Retina XDR display, A16 Bionic chip, and an advanced camera system for exceptional photography.'
    },
    {
        name: 'Samsung Galaxy S23 Ultra',
        img: 'https://images.unsplash.com/photo-1678958274412-563119ec18ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZyUyMGdhbGF4eSUyMHMyMyUyMHVsdHJhfGVufDB8fDB8fHww',
        price: 85000,
        desc: 'The Galaxy S23 Ultra offers a large AMOLED display, Snapdragon 8 Gen 2 processor, and a versatile camera setup with up to 200MP resolution.'
    },
    {
        name: 'Google Pixel 7 Pro',
        img: 'https://images.unsplash.com/photo-1666238851883-1cdc90b547e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjA3JTIwcHJvfGVufDB8fDB8fHww',
        price: 45000,
        desc: 'The Pixel 7 Pro is known for its exceptional camera capabilities, clean Android experience, and AI-powered features.'
    },
    {
        name: 'OnePlus 11',
        img: 'https://images.unsplash.com/photo-1662627488889-3affc6ee6493?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b25lcGx1c3xlbnwwfHwwfHx8MA%3D%3D',
        price: 61000,
        desc: 'The OnePlus 11 combines flagship performance with a sleek design, featuring a Snapdragon 8 Gen 2 processor and a vibrant AMOLED display.'
    },
    {
        name: 'Xiaomi 13 Pro',
        img: 'https://images.unsplash.com/photo-1655356392708-c675781f1748?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eGlhb21pJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
        price: 74500,
        desc: 'The Xiaomi 13 Pro features a powerful Snapdragon 8 Gen 2 chip, a stunning AMOLED display, and a versatile camera system.'
    }
];


async function seedDB() {
    await Product.insertMany(products);
    console.log("Data seeded successfully!");
}

module.exports = seedDB;

