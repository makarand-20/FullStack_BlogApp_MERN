const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);