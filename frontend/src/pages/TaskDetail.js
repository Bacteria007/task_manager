import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ApiCaller from "../utilities/ApiCaller";
import { formatDate } from "../utilities/formatDate";

const TaskDetail = () => {
  const { serverUrl } = useAppContext();
  const [task, setTask] = useState({});
  const [assignedBy, setAssignedBy] = useState({});
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const formattedId = id.replace(":", "");
  const taskDetails = () => {
    console.log(id);
    ApiCaller(`${serverUrl}/task/${formattedId}/task-details`, {}, token).then(
      (res) => {
        if (res.data.status) {
          console.log(res.data.data);
          setTask(res.data.data);
          setAssignedBy(res.data.data.createdBy)
        } else {
          alert(res.data.message);
        }
      }
    );
  };
  useEffect(() => {
    taskDetails();
  }, []);
  return (
    <div className="flex min-h-full flex-col w-full px-6 py-12 lg:px-8">
      <div className="w-full">
        <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Task ID : {task?._id}
        </h2>
      </div>

      <div className=" w-full">
        <div className="flex flex-row mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Title :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {task?.title}
          </p>
        </div>
        <div className="flex flex-row  mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Status :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {task?.status}
          </p>
        </div>
        <div className="flex flex-row  mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Description :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {task?.description}
          </p>
        </div>
        <div className="flex flex-row  mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Created By :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {assignedBy?.name}
          </p>
        </div>
        <div className="flex flex-row  mt-4">
          <h1 className="text-left  text-xl font-medium text-slate-900">
            Created At :
          </h1>
          <p className="text-left  text-md font-medium text-gray-900 ml-2">
            {formatDate(task?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
