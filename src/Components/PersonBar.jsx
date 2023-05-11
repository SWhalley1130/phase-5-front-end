import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../user_context";

function PersonBar({person, isFriend, getFriends}){

    const { user, setUser } = useContext(UserContext);

    function handleFriend(person){
        if (isFriend=='Not Friends'){
            fetch(`/api/friends`,{
                method: 'POST',
                headers: {
                    'Content-Type':"application/json",
                },
                body: JSON.stringify({friend_one_id:user.id, friend_two_id:person.id})
            })
            .then (r=>r.json())
            .then(data=>{
                getFriends()
            })
        }
        else if (isFriend=="Incoming Request"){
            fetch(`/api/friends/1`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user1:user.id, user2:person.id, accepted:true})
            })
            .then(r=>{
                if (r.ok){
                    return r.json();
                }
                throw r; 
            })
            .then(data=>getFriends())
        }
        else if (isFriend=="Sent Request"){
            console.log("Clicked Sent Request!")
        }
        else if (isFriend=="Friends") {
            fetch(`/api/friends/1`, {
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({user1:user.id, user2:person.id})
            })
            .then(r=>{
                if (r.ok){
                    return r.json();
                }
                throw r; 
            })
            .then(data=>getFriends())
        }
    }

    function buttonText(){
        if (isFriend=='Not Friends'){
            return 'Add as friend'
        }
        else if (isFriend=="Sent Request"){
            return 'Sent request'
        }
        else if (isFriend=="Incoming Request"){
            return "Accept request"
        }
        else if (isFriend=="Friends") {
            return 'Remove friend'
        }
    }


    return (
        <div className="">   
            <div className="border-solid border-yellow-600 grid grid-cols-5">
                <p style={{margin:'auto'}} className="col-span-1 block mb-2 text-lg font-medium text-gray-900">
                    <img style={{maxWidth:'50px', borderRadius:'100%', margin:'auto'}} src='./public/blank_profile.webp'/>
                    {person.username}
                </p>
                <div></div>
                <div></div>
                <div></div>
                <button onClick={e=>handleFriend(person)}>{buttonText()}</button>
            </div>
        </div>
    )
}

export default PersonBar;