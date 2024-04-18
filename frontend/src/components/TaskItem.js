import { useState,useEffect } from 'react'
import { PencilSquareIcon, TrashIcon, } from '@heroicons/react/20/solid'
import { DeleteToast } from './CustomToast'
import { Link, useNavigate } from 'react-router-dom'
import ApiCaller from '../utilities/ApiCaller'
import { useAppContext } from '../context/AppContext'
import UpdateTaskForm from './UpdateTaskForm'


const TaskItem = ({ task, key }) => {
    const { serverUrl,  userRole,getAllTasks } = useAppContext()
    const navigate = useNavigate()
    const token=localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const [deleteToast, setDeleteToast] = useState(false)
    
    const showDeleteToast = (e) => {
        e.stopPropagation();
        setDeleteToast(true);
        setTimeout(() => {
            setDeleteToast(false);
        }, 3000);
    };
    const hideDeleteToast = () => setDeleteToast(false);
    const handleDelete = (e) => {
        ApiCaller(`${serverUrl}/task/${task._id}/delete`, {}, token).then((res) => {
            if (res.data.status) {
                getAllTasks()
                showDeleteToast(e)
            } else {
                alert(res.data.message)
            }
        })
    }
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const hideUpdateModal = () => {
        setShowUpdateModal(false);
    };
// useEffect(()=>{
//     getAllTasks()
//   },[handleDelete])
    return (
        <li key={key} className="flex gap-x-6 py-5 px-5  hover:bg-gray-100">
            <Link to={`${task._id}/task_detail`} className="min-w-0 flex-auto ">

                <div className="flex min-w-0 gap-x-4 flex-col" >
                    <p className="text-lg font-semibold leading-6 text-gray-900">{task.title}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{task.description}</p>

                </div>
            </Link>
            <div className='flex flex-row '>
                <div>

                    {role !== "user" && <div className='cursor-pointer mr-1'
                        //  onClick={(e) => { e.stopPropagation(); navigate(`/edit-task/${task._id}`, { state: task }) }}
                        onClick={handleShowUpdateModal}
                    >
                        <div className="p-1 bg-slate-300 rounded-md cursor-pointer transition-colors duration-300 ease-in-out">
                            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </div>
                    }
                </div>
                <div>

                    {role == "admin" && <div className='cursor-pointer ml-1' onClick={handleDelete}>
                        <div className="p-1 bg-red-300 rounded-md transition-colors duration-300 ease-in-out">
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </div>}
                </div>
                {deleteToast && <DeleteToast message={"task deleted"} closeToast={hideDeleteToast} />}
                {showUpdateModal && (
                    <>
                        <UpdateTaskForm onClose={hideUpdateModal} task={task} />
                        <div
                            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40"
                            onClick={hideUpdateModal}
                        ></div>
                    </>
                )}
            </div>
        </li>

    )
}

export default TaskItem;