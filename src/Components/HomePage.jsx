import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router";
import { UserContext} from "../user_context";


function HomePage(){

    const nav=useNavigate()
    const {user, setUser}=useContext(UserContext);

    function handleClick()
    {
        fetch('/api/logout')
        .then(r=>r.json())
        setUser(null)
    }

    if(!user) return (
        <>
            <h1>Please Login to View Profile.</h1> <br/>
            <button onClick={e=>nav('/login')} className="w-full text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800">Login</button>

        </>
    )

    return (
        <div>
            <h1>Welcome, {user.username}.</h1> <br/>
            <button onClick={handleClick} className="w-full text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800">Logout</button>
        </div>
    )
}

export default HomePage