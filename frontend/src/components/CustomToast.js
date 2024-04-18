import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const CustomToast = ({ message }) => {
    return (
        <div id="toast-bottom-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-700 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-lg right-5 bottom-5space-x" role="alert">
            <CheckCircleIcon className='w-5 h-5' color='green' />
            <div className="text-sm font-normal">{message}</div>

        </div>
    )
}
export const UpdateToast = ({ message,closeToast }) => {
    return (
        <div className="fixed bottom-5 right-5 flex items-center w-auto max-w-xs p-4 space-x-4 text-gray-700 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-lg">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <div className="text-sm font-normal">{message}
            </div>
           
        </div>
    );
};


export const DeleteToast = ({ message,closeToast }) => {
    return (
        <div id="toast-bottom-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-700 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-lg right-5 bottom-5 space-x" role="alert">
            <XCircleIcon className='w-5 h-5' color='red' />
            <div className="text-sm font-normal">{message}</div>
           
        </div>
    )
}
