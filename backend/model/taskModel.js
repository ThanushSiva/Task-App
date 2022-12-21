const mongoose = require("mongoose")

const tasks = new mongoose.Schema({
    taskName: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    }
})

const taskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        require: true
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'in-progress'],
        require: true
    },
    tasks: {
        type: [tasks],
        require: true
    }
})

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;