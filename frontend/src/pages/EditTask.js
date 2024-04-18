import React, { useEffect, useState } from "react";
import {PrimaryBtn} from "../components/PrimaryBtn";
import { useAppContext } from "../context/AppContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiCaller from "../utilities/ApiCaller";
import { useForm } from "react-hook-form";
import { CustomToast, Toast1, UpdateToast } from "../components/CustomToast";

const EditTask = () => {
    const { statusOptions, serverUrl } = useAppContext();
    const { state } = useLocation()
    const [task, setTask] = useState(state != null ? state : {});
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate();
    const formattedId = id.replace(":", "");
    const [updateToast, setUpdateToast] = useState(false);

    const showUpdateToast = () => {
        setUpdateToast(true);
        setTimeout(() => {
            setUpdateToast(false);
        }, 3000);
    };

    const hideUpdateToast = () => setUpdateToast(false);


    const updateTask = async () => {
        console.log('---------11111111---------');
        const result = await ApiCaller(`${serverUrl}/task/${formattedId}/update`, task, token).then((res) => {
            if (res.data.status===true) {
                console.log('-------22222222222-----------');
                showUpdateToast()
                setTask(res.data.data);
                navigate("/")
            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            alert(err)
        })

        if (result) {
            console.log('hiiii');
        }
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update Task
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" noValidate>
                        <div>
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
                                value={task.title}
                                onChange={(e) => setTask({ ...task, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <div className="mt-2">
                                <label
                                    htmlFor="status"
                                    className="text-left block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Status
                                </label>
                                <select
                                    value={task.status} // Use task.status as the value
                                    onChange={(e) => setTask({ ...task, status: e.target.value })} // Update task.status on change
                                    id="status"
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Status"
                                    required
                                >
                                    {statusOptions.map((opt, index) => (
                                        <option key={index + 1} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write task description here"
                                    value={task.description} // Use task.description as the value
                                    onChange={(e) =>
                                        setTask({ ...task, description: e.target.value })
                                    } // Update task.description on change
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={updateTask}
                            >
                                Update
                            </button>
                        </div>
                        {updateToast && (
                            <CustomToast message={"Task updated successfully"} />
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTask;
