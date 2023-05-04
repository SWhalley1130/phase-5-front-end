import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";

function PersonBar({person, isFriend}){

    function handleFriend(person){
        if (isFriend=='Not Friends'){
            fetch(`/api/friends`,{
                
            })
        }
        else if (isFriend=="Pending"){
            return 'Accept request'
        }
        else if (isFriend=="Friends") {
            return 'Remove Friend'
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