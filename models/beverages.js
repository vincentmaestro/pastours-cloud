const Joi = require('joi');
const mongoose = require('mongoose');

function validateNewProduct(input) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(24),
        image: Joi.string().min(5),
        price: Joi.number().required().min(99),
        description: Joi.string().min(10).max(300),
        size: Joi.string().min(3),
        category: Joi.string().required().min(5),
        numberInStock: Joi.number().required().min(10)
    });

    return schema.validate({
        name: input.name,
        image: input.image,
        price: input.price,
        description: input.description,
        size: input.size,
        category: input.category,
        numberInStock: input.numberInStock
    });
}

const beverage = mongoose.model('beverage', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 24,
        unique: true
    },
    image: {
        type: String,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        min: 99
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 300
    },
    size: {
        type: String,
        minlength: 3
    },
    category: {
        type: String,
        required: true,
        minlength: 5
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 10
    }
}));

async function getItems() {
    try {
        const carbonatedDrinks = await beverage.find({ category: 'carbonated drink' }).select('-category -numberInStock -__v').sort('name');
        const yoghurtAndDiary = await beverage.find({ category: 'yoghurt and diary' }).select('-category -numberInStock -__v').sort('name');
        const energyDrinks = await beverage.find({ category: 'energy drink' }).select('-category -numberInStock -__v').sort('name');
        const juice = await beverage.find({ category: 'juice' }).select('-category -numberInStock -__v').sort('name');
        const maltDrinks = await beverage.find({ category: 'malt drink' }).select('-category -numberInStock -__v').sort('name');
        const powderedDrinks = await beverage.find({ category: 'powdered drink' }).select('-category -numberInStock -__v').sort('name');
        const sodaWater = await beverage.find({ category: 'soda water' }).select('-category -numberInStock -__v').sort('name');
        const water = await beverage.find({ category: 'water' }).select('-category -numberInStock -__v').sort('name');

        return { carbonatedDrinks, yoghurtAndDiary, energyDrinks, juice, maltDrinks, powderedDrinks, sodaWater, water };
    }
    catch(ex) {
        return ex.message
    }
}

module.exports = { validateNewProduct, beverage, getItems };