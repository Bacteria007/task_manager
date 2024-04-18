import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { FloatingBtn } from '../components/PrimaryBtn';
import NewTaskForm from '../components/NewTaskForm';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
    const role = localStorage.getItem("role");
    const { getAllTasks } = useAppContext()

    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        getAllTasks()
      }, [])
    const handleShowModal = () => {
        setShowModal(true);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <TaskList />
            {role == 'admin' && <FloatingBtn handleClick={handleShowModal} title={"New Task"} showplus={true} />}
            {showModal && (
                <>
                    <NewTaskForm onClose={hideModal} />
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40"
                        onClick={hideModal}
                    >
                    </div>
                </>
            )}
        </>
    );
};

export default Dashboard;
