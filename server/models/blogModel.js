const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
}, 
    {
    timestamps: true,
    }
);

module.exports = mongoose.model('Blog', blogSchema);