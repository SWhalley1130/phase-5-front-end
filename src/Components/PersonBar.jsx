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
                console.log(data)
                getFriends()
            })
        }
        else if (isFriend=="Pending"){
            console.log("Clicked Pending!")
        }
        else if (isFriend=="Friends") {
            console.log("Clicked Friends!")
        }
    }

    function buttonText(){
        if (isFriend=='Not Friends'){
            return 'Add as friend'
        }
        else if (isFriend=="Pending"){
            return 'Accept request'
        }
        else if (isFriend=="Friends") {
            return 'Remove Friend'
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