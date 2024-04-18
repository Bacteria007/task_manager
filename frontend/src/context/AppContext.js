import React, { createContext, useContext, useState } from 'react'
import ApiCaller from '../utilities/ApiCaller';

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({ children }) => {

    const statusOptions = ['Todo', 'In Progress', 'Completed']
    const token = localStorage.getItem("token")
    const [tasks, setTasks] = useState([])
    const serverUrl = 'https://task-manager-api-ten.vercel.app'
    const getAllTasks = () => {
        ApiCaller(`${serverUrl}/task/get-tasks`, {}, token).then(async (res) => {
            const tasks = await res.data.data
            if (res.data.status) {
                setTasks(tasks)
                console.log(res.data.data);
            } else {
                console.log(res.data.message)
            }
        })
            .catch((error) => {
                console.error("Error fetching task:", error);
            });
    }

    return (
        <AppContext.Provider value={{
            serverUrl, statusOptions, tasks,
            getAllTasks,
        }}>
            {children}
        </AppContext.Provider>
    )
}
