import { useState, Fragment } from 'react'
import NewTaskForm from './NewTaskForm'
import {PrimaryBtn} from './PrimaryBtn';
import { useAppContext } from '../context/AppContext';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate, useNavigate } from 'react-router-dom'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);
    const { userRole } = useAppContext()
    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    console.log(userRole);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    const signout = () => {
        localStorage.setItem("name", '')
        localStorage.setItem("email", '')
        localStorage.setItem("token", '')
        localStorage.setItem("role", '')
        navigate("/login")
    }
    const gotoProfile=()=>{
        
        navigate('/profile')
    }
    const userNavigation = [
        { name: 'Profile', link: '/profile', func: gotoProfile},
        { name: 'Sign out', link: '/login', func: signout },
    ]
    return (
        <div className='w-full h-20 flex flex-row bg-gray-800 text-center justify-between items-center px-7 sticky top-0 z-10'>
            <p className='text-lg font-semibold leading-6 text-white text-center'>Task Manager</p>
            <div className='flex flex-row justify-center items-center'>

                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">

                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-14">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <div className="text-sm font-medium leading-none text-gray-400">{name}</div>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <Link
                                                                        onClick={() => item.func()}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>

                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">

                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex justify-between">
                                        <div className='flex items-center px-5'>

                                            <div className="ml-3">
                                                <div className="text-base font-medium leading-none text-white">{name}</div>
                                                <div className="text-sm font-medium leading-none text-gray-400">{email}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                onClick={() => item.func()}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
              
            </div>

            
        </div>

    )
}

