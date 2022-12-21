import React, { createContext, useEffect, useState } from 'react'

export const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        // 
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider