import React, {useContext, useState} from "react";
import { useNavigate } from "react-router";
import { UserContext } from '../user_context';


function Nav()
{

    let shown="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    let hidden="hidden"

    const {user, setUser}=useContext(UserContext);
    const nav=useNavigate()
    const [menuShown, setMenuShown]=useState(hidden)

    function profileClick(){
        if (menuShown==hidden){
            setMenuShown(shown)
        }
        else{
            setMenuShown(hidden)
        }
    }

    function handleLogout()
    {
        fetch('/api/logout')
        .then(r=>r.json())
        setUser(null)
    }

    return (
        <div className="bg-yellow-500 m-0  min-h-[10%]" >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="block h-8 w-auto" src="./sushi.png" alt="Logo"/>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <button className="bg-yellow-600 text-white rounded-md hover:bg-yellow-400 px-3 py-2 text-sm font-medium">Home</button>
                                <button className=" text-white bg-yellow-600 hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Restaurants</button>
                                <button className="text-white bg-yellow-600 hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium">People</button>
                                <button className="text-white bg-yellow-600 hover:bg-yellow-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="rounded-full bg-yellow-600 p-1 hover:bg-yellow-400 text-yellow-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                        </button>
                        <div className="relative ml-3">
                            <div className="hover:bg-yellow-408">
                                <button onClick={profileClick} type="button" className="flex hover:bg-yellow-400 rounded-full bg-yellow-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                </button>
                            </div>
                            <div className={menuShown} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <a onClick={e=>nav('/profile')} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                                <a onClick={handleLogout}className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;