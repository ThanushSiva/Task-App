import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);
    // let noOpen, noClosedToday, noOPToday, noOpenToday;

    // current date

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
            const tempTasks = await axios.post("http://localhost:4000/read");
            setTasks(tempTasks.data.userTasks.sort((a, b) => new Date(a.date) - new Date(b.date)));
        })();
    }, [])

    // noOpenToday = tasks && tasks.filter((e) => (e.status === 'open' || e.status === 'in-progress') && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
    // noClosedToday = tasks && tasks.filter((e) => e.status === 'closed' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
    // noOPToday = tasks && tasks.filter((e) => ((new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today))
    // noOpen = tasks && tasks.filter((e) => e.status === 'open')

    return (
        <TaskContext.Provider value={{ tasks, setTasks, today }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider