import React, { createContext, useContext } from 'react'

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({ children }) => {

    const statusOptions = ['Todo', 'In Progress', 'Completed']
    const serverUrl = 'http://localhost:8881'
    return (
        <AppContext.Provider value={{
            serverUrl, statusOptions
        }}>
            {children}
        </AppContext.Provider>
    )
}
