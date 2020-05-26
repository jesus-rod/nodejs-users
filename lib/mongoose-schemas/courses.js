const mongoose = require('mongoose')

var courseSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    teacher: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
})

module.exports = {
    courseSchema
}