import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);
    const [user, setUser] = useState('')

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;

    // current date

    useEffect(() => {
        (async function () {
            try {
                const tempTasks = await axios.post("http://localhost:4000/read");
                setUser(tempTasks && tempTasks.data.userTasks[0].email);
                setTasks(tempTasks.data.userTasks.sort((a, b) => new Date(a.date) - new Date(b.date)));
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, setTasks, today, user }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider