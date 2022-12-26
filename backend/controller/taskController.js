const Task = require("../model/taskModel");

exports.createTask = async (req, res) => {
    const email = req.email;
    const { title, date, priority, status, tasks } = req.body;
    try {
        const task = await Task.create({
            email,
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
    const email = req.email;
    try {
        const userTasks = await Task.find({ email })

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

exports.updateTask = async (req, res) => {
    const email = req.email;
    try {
        const replaceData = req.body.formData
        const updateTask = await Task.findOneAndReplace({ _id: req.body._id }, { email, ...replaceData }, { new: true })
        res.status(200).json({ updateTask })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.updateTaskStatus = async (req, res) => {
    try {
        if (!req.body.task_id || !req.body.tasks_id || req.body.isDone === undefined) {
            throw Error("Something went wrong")
        }
        const TaskStatus = await Task.findOneAndUpdate(
            {
                "_id": req.body.task_id,
                "tasks._id": req.body.tasks_id
            },
            {
                "$set": { "tasks.$.isDone": req.body.isDone }
            },
            {
                new: true
            }
        )
        let open = 0, closed = 0, count = 0, status = '';
        TaskStatus.tasks.map((e) => {
            count += 1;
            if (e.isDone === true) {
                closed += 1;
            } else {
                open += 1;
            }
        })
        if (count === open) {
            status = 'open'
        } else if (count === closed) {
            status = 'closed'
        } else {
            status = 'in-progress'
        }

        const task = await Task.findOneAndUpdate(
            {
                "_id": TaskStatus._id
            },
            {
                "$set": { status }
            },
            {
                new: true
            }
        )

        res.status(200).json({ task })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}