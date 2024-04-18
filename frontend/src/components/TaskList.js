import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import '../App.css'
import ApiCaller from "../utilities/ApiCaller";
import { useAppContext } from "../context/AppContext";

const TaskList = () => {
  const { serverUrl,tasks } = useAppContext()
  // const [tasks, setTasks] = useState([])
  const token=localStorage.getItem("token")

  const todoTasks = tasks.length > 0 ? tasks.filter((task) => task.status === "Todo") : [];
  const inProgressTasks = tasks.length > 0 ? tasks.filter((task) => task.status === "In Progress") : [];
  const completedTasks = tasks.length > 0 ? tasks.filter((task) => task.status === "Completed") : [];
  // console.log(todoTasks, inProgressTasks, completedTasks);

  // const getAllTasks = () => {
  //   ApiCaller(`${serverUrl}/task/get-tasks`, {}, token).then(async (res) => {
  //     const tasks = await res.data.data
  //     if (res.data.status) {
  //       setTasks(tasks)
  //       console.log(res.data.data);
  //     } else {
  //       console.log(res.data.message)
  //     }
  //   })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }
  // useEffect(() => {
  //   getAllTasks()
  // }, [])
  return (
    <div className="flex justify-center mt-10">
      <div className="grid lg:grid-cols-3 sm:col-span-1 gap-4 w-4/5 self-center">
        <div className="max-h-screen overflow-y-auto">
          <div className="bg-gray-300 flex flex-row text-center justify-center items-center px-4 py-3">
            <h2 className="text-2xl font-semibold text-center">Todo</h2>
            <span className="text-gray-700  text-sm font-semibold ml-2">
              ({todoTasks.length > 0 ? todoTasks.length : 0})
            </span>
          </div>
          <div className="max-h-96  overflow-y-scroll">
            <ul className="divide-y divide-gray-100">
              {todoTasks.length > 0 ? todoTasks.map((task, index) => (
                <TaskItem key={index} task={task} />
              ))
                : <NoItems />
              }
            </ul>
          </div>
        </div>
        <div className="max-h-screen overflow-y-auto">
          <div className="bg-sky-300 flex flex-row text-center justify-center items-center px-4 py-3">
            <h2 className="text-2xl font-semibold text-center">In Progress </h2>
            <span className="text-gray-700  text-sm font-semibold ml-2">
              ({inProgressTasks.length > 0 ? inProgressTasks.length : 0})
            </span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              {inProgressTasks.length > 0 ? inProgressTasks.map((task, index) => (
                <TaskItem key={index} task={task} />
              ))
                : <NoItems />
              }
            </ul>
          </div>
        </div>
        <div className="max-h-screen overflow-y-auto">
          <div className="bg-green-300 flex flex-row text-center justify-center items-center px-4 py-3">
            <h2 className="text-2xl font-semibold text-center">Completed </h2>
            <span className="text-gray-700  text-sm font-semibold ml-2">
              ({completedTasks.length > 0 ? completedTasks.length : 0})
            </span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              {completedTasks.length > 0 ? completedTasks.map((task, index) => (
                <TaskItem key={index} task={task} />
              ))
                : <NoItems />
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

const NoItems = () => {
  return <div className="flex items-center justify-center self-center">
    <span className="text-gray-700  text-sm font-semibold ml-2 text-center">
      No task in this category
    </span>
  </div>
}
