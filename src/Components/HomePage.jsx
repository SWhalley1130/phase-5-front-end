import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router";
import { UserContext} from "../user_context";
import Nav from "./Nav";


function HomePage(){

    const nav=useNavigate()
    const {user, setUser}=useContext(UserContext);


    // if (!user){
    //   useEffect(()=>
    //   {
    //     fetch(`/api/login`)
    //     .then(r=>{
    //       if (r.status!=200){
    //         return null
    //       }
    //       return r.json();
    //     })
    //     .then(data=>
    //     {
    //       try{
    //         setUser({username:data.username, id:data.id, type:data.type});
    //       }
    //       catch{
    //         return null;
    //       }
    //     })
    //   }, [])  
    // }
    useEffect(()=>
    {
      fetch(`/api/login`)
      .then(r=>{
        if (r.status!=200){
          return null
        }
        return r.json();
      })
      .then(data=>
      {
        try{
          setUser({username:data.username, id:data.id, type:data.type});
        }
        catch{
          return null;
        }
      })
    }, [])  



    return (
        <>
            {!user? 
                <>
                    <Nav/>
                    <div style={{width:'80%', maxWidth:'80rem',margin:'auto', padding:'28px'}}>
                        <h1>Please Login to View Profile.</h1> <br/>
                        <button onClick={e=>nav('/login')} className="w-full text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800">Login</button>
                    </div>
                </>
                :
                <>
                    <Nav/>
                    <div  style={{width:'80%', maxWidth:'80rem',margin:'auto', padding:'28px'}}>
                        <h1>Welcome, {user.username}.</h1> <br/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </>
                }
        </>
    )
}

export default HomePage