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

const alcoholic = mongoose.model('alcoholic', new mongoose.Schema({
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
        const beer = await alcoholic.find({ category: 'beer' }).select('-category -numberInStock -__v').sort('name');
        const cognac = await alcoholic.find({ category: 'cognac' }).select('-category -numberInStock -__v').sort('name');
        const champagne = await alcoholic.find({ category: 'champagne' }).select('-category -numberInStock -__v').sort('name');
        const gin = await alcoholic.find({ category: 'gin' }).select('-category -numberInStock -__v').sort('name');
        const liqueur = await alcoholic.find({ category: 'liqueur' }).select('-category -numberInStock -__v').sort('name');
        const redWine = await alcoholic.find({ category: 'red wine' }).select('-category -numberInStock -__v').sort('name');
        const rose = await alcoholic.find({ category: 'rose' }).select('-category -numberInStock -__v').sort('name');
        const sparklingWine = await alcoholic.find({ category: 'sparkling wine' }).select('-category -numberInStock -__v').sort('name');
        const vodka = await alcoholic.find({ category: 'vodka' }).select('-category -numberInStock -__v').sort('name');
        const whisky = await alcoholic.find({ category: 'whisky' }).select('-category -numberInStock -__v').sort('name');

        return { beer, cognac, champagne, gin, liqueur, redWine, rose, sparklingWine, vodka, whisky };
    }
    catch(ex) {
        return ex.message
    }
}

module.exports = { validateNewProduct, alcoholic, getItems };