const path = require("path");
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve("./"),"config/");
const Joi =  require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


function validateClientInput(input) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        username: Joi.string().min(3).max(10).required(),
        password: Joi.string().min(8).max(12).required()
    });

    return schema.validate({
        email: input.email,
        username: input.username,
        password: input.password
    });
}

function validateUpdateInput(input) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(10),
        phone: Joi.string().length(11),
        address: Joi.string().min(10).max(100)
    });

    return schema.validate({
        username: input.username,
        phone: input.phone,
        address: input.address
    });
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    phone: {
        type: String,
        match: /^\d{11}$/
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 100
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateEmailVerificationToken = function() {
    const token = jwt.sign({ email: this.email }, config.get('emailPrivateKey'), { expiresIn: '1h' });
    return token;
}

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.get('authPrivateKey'), { expiresIn: '6h' });
    return token;
}

const User = mongoose.model('user', userSchema);

module.exports = { validateClientInput, validateUpdateInput, User };