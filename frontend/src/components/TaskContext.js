import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        (async function (){
            const tempTasks = await axios.post("http://localhost:4000/read");
            setTasks(tempTasks.data.userTasks);
        })();
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider