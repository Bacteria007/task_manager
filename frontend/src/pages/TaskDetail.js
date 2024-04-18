import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ApiCaller from "../utilities/ApiCaller";
import { formatDate } from "../utilities/formatDate";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TaskDetail = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [assignedBy, setAssignedBy] = useState(null);
  const { serverUrl } = useAppContext();
  const { id } = useParams();
  const formattedId = id.replace(":", "");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await ApiCaller(`${serverUrl}/task/${formattedId}/task-details`, {}, token);
        if (res.data.status) {
          setTask(res.data.data);
          setAssignedBy(res.data.data.createdBy);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [formattedId, serverUrl, token]);

  if (loading) {
    return (
      <div className="flex min-h-full flex-col w-full px-6 py-12 lg:px-8">
        <Skeleton count={6} height={20}/>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col w-full px-6 py-12 lg:px-8">
      {task && (
        <>
          <div className="w-full">
            <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Task ID : {task._id} 
            </h2>
          </div>
          <div className="w-full">
            <div className="flex flex-row mt-4">
              <h1 className="text-left text-xl font-medium text-slate-900">Title :</h1>
              <p className="text-left text-md font-medium text-gray-900 ml-2">{task.title}</p>
            </div>
            <div className="flex flex-row mt-4">
              <h1 className="text-left text-xl font-medium text-slate-900">Status :</h1>
              <p className="text-left text-md font-medium text-gray-900 ml-2">{task.status}</p>
            </div>
            <div className="flex flex-row mt-4">
              <h1 className="text-left text-xl font-medium text-slate-900">Description :</h1>
              <p className="text-left text-md font-medium text-gray-900 ml-2">{task.description}</p>
            </div>
            <div className="flex flex-row mt-4">
              <h1 className="text-left text-xl font-medium text-slate-900">Created By :</h1>
              <p className="text-left text-md font-medium text-gray-900 ml-2">{assignedBy?.name}</p>
            </div>
            <div className="flex flex-row mt-4">
              <h1 className="text-left text-xl font-medium text-slate-900">Created At :</h1>
              <p className="text-left text-md font-medium text-gray-900 ml-2">{formatDate(task.createdAt)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskDetail;
