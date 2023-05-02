import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router";
import Nav from "./Nav";
import { UserContext} from "../user_context";

function Profile(){

    const nav=useNavigate();
    const {user, setUser}=useContext(UserContext);
    const [friends, setFriends]=useState([]); 
    const[isLoaded, setIsLoaded]=useState(false)
    const[allUserInfo, setAllUserInfo]=useState(false)


    if(!user){
        useEffect(()=>{
            return nav('/');
        },[])
    }

    console.log(user)

    useEffect(()=>{
        fetch(`/api/friends`)
        .then(r=>r.json())
        .then(data=>setFriends(data))

        fetch(`/api/users/${user.id}`)
        .then(r=>r.json())
        .then(data=>setAllUserInfo(data))

        setIsLoaded(true)
    },[])


    return (
        <div>
            <Nav/>
            {isLoaded?
                <div style={{width:'80%', maxWidth:'80rem',margin:'auto', padding:'28px'}}>
                    <div className="grid grid-rows-3 grid-flow-col gap-10">
                        <img style={{maxWidth:'450px'}} className="w-full row-span-3" alt="user profile picture" src='./blank_profile.webp'/>
                        <div className='col-span-2'>
                            <label className="underline block text-lg font-bold text-gray-900">Username</label>
                            <p className="block mb-2 text-lg font-medium text-gray-900">{allUserInfo.username}</p>
                            <br/>
                            <label className="underline block text-lg font-bold text-gray-900">Email</label>
                            <p className="block mb-2 text-lg font-medium text-gray-900">{allUserInfo.email}</p>
                            <br/>
                            <label className="underline block text-lg font-bold text-gray-900">Type</label>
                            <p className="block mb-2 text-lg font-medium text-gray-900">{allUserInfo.type}</p>
                        </div>
                        <div className="row-span-2 col-span-2">
                            <label className="underline block text-lg font-bold text-gray-900">Friends</label>
                            {friends.length>0 ?
                            <p className="block mb-2 text-lg font-medium text-gray-900">Yay friends!</p>
                                // {friends.map(friend=>{
                                //     <p>{friend.username</p>
                                // })}
                            
                            :   
                                <p className="block mb-2 text-lg font-medium text-gray-900">No friends to show</p>
                            }
                        </div>
                    </div>
                </div>
            :
                <div>Loading</div>
            }
        </div>
    )
}

export default Profile;