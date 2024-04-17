import {  useState } from 'react'
import NewTaskForm from './NewTaskForm'
import PrimaryBtn from './PrimaryBtn';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
    const [showModal, setShowModal] = useState(false);
const {userRole}=useAppContext()
const role=localStorage.getItem("role")
console.log(userRole);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const hideModal = () => {
        setShowModal(false);
    };
    return (
        <div className='w-full h-20 flex flex-row bg-gray-800 text-center justify-between items-center px-7 sticky top-0 z-10'>
            <p className='text-lg font-semibold leading-6 text-white text-center'>Task Manager</p>
           
              {role=="admin"&&  <PrimaryBtn handleClick={handleShowModal} title={"New Task"} showplus={true}/>}
               
            {showModal && (
                <>
                    <NewTaskForm onClose={hideModal} />
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40"
                        onClick={hideModal}
                    ></div>
                </>
            )}
        </div>

    )
}

