const Task = require("../model/taskModel");

exports.createTask = async (req, res) => {
    const { title, date, priority, status, tasks } = req.body;
    try {
        const task = await Task.create({
            email: "thanush@gmail.com",
            title,
            date,
            priority,
            status,
            tasks
        })

        res.status(200).json({ task })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.readTask = async (req, res) => {
    try {
        const userTasks = await Task.find({ email: "thanush@gmail.com" })

        res.status(200).json({ userTasks })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const deleteTasks = await Task.findByIdAndDelete(req.body._id);
        res.status(200).json({ deleteTasks })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}