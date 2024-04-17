import React, { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { useAppContext } from "../context/AppContext";
import ApiCaller from "../utilities/ApiCaller";

const NewTaskForm = ({onClose}) => {
  const { statusOptions,serverUrl,token } = useAppContext()
const[newTask, setNewTask] = useState({
  title:'',
  description:'',
  status:'Todo'
})
const addTask=()=>{
  ApiCaller(`${serverUrl}/task/add`,newTask,token)
}
  return (
    <div className="overflow-y-auto overflow-x-hidden flex justify-center fixed top-0 right-0 left-0 z-50  w-full  md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New Task
            </h3>
            <button
              onClick={() => onClose()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form className="p-4 md:p-5"  onSubmit={(data)=>console.log(data)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="text-left block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Title"
                  required
                  value={newTask.title || ''} // Use task.title as the value
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}

                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="text-left block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={newTask.status || ''} // Use task.status as the value
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} // Update task.status on change                               
                  
                >
                  {statusOptions.map((opt) => (
                    <option value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="text-left block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write task description here"
                  value={newTask.description || ''} // Use task.description as the value
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} // Update task.description on change

                />
              </div>
            </div>
            <PrimaryBtn handleClick={addTask} title={"Add task"} showplus={false} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTaskForm;
