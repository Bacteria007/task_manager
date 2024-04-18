import React from "react";
import TaskItem from "./TaskItem";
import { useAppContext } from "../context/AppContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskList = () => {
  const { tasks } = useAppContext();

  const renderTaskList = (taskList, title, bgColor) => {
    return (
      <div className="max-h-screen overflow-y-auto">
        <div
          className={`bg-${bgColor}-300 flex flex-row text-center justify-center items-center px-4 py-3`}
        >
          <h2 className="text-2xl font-semibold text-center">{title}</h2>
          <span className="text-gray-700 text-sm font-semibold ml-2">
            ({taskList.length > 0 ? taskList.length : 0})
          </span>
        </div>
        {tasks.length === 0 ? (
          <Skeleton height={30} count={3} highlightColor={`${bgColor}`}/>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              {taskList.length > 0 ? (
                taskList.map((task, index) => (
                  <TaskItem key={task._id} task={task} />
                ))
              ) : (
                <NoItems />
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="grid lg:grid-cols-3 sm:col-span-1 gap-4 w-4/5 self-center">
        <>
          {renderTaskList(
            tasks.filter((task) => task.status === "Todo"),
            "Todo",
            "gray"
          )}
          {renderTaskList(
            tasks.filter((task) => task.status === "In Progress"),
            "In Progress",
            "sky"
          )}
          {renderTaskList(
            tasks.filter((task) => task.status === "Completed"),
            "Completed",
            "green"
          )}
        </>
      </div>
    </div>
  );
};

export default TaskList;

const NoItems = () => {
  return (
    <div className="flex items-center justify-center self-center">
      <span className="text-gray-700 text-sm font-semibold ml-2 text-center">
        No task in this category
      </span>
    </div>
  );
};
