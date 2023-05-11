import React, { useState, useEffect, useContext } from "react";
import Nav from './Nav'
import { useNavigate } from "react-router";
import { UserContext } from "../user_context";
import PersonBar from "./PersonBar";

function People() {

    const nav = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [friends, setFriends] = useState([])

    if (!user) {
        useEffect(() => {
            return nav('/');
        }, [])
    }
    else{
        useEffect(() => {
            fetch(`/api/users`)
                .then(r => r.json())
                .then(data => {
                    let filtered = data.filter(u=>u.id!=user.id)
                    setAllUsers(filtered)
                })
    
            getFriends()
            setIsLoaded(true)
        }, [])
    
    }

    function getFriends(){
        fetch(`/api/friends`)
        .then(r =>r.json())
        .then(data =>setFriends(data))
    }



    function evalIfFriend(u){

        let test=friends.map(fr=>{
            //console.log("Checking id "+u.id +" against "+fr.friend_one_id+' and ' +fr.friend_two_id)
            if (Object.values(fr).includes(u.id) && fr.accepted==true){
                return "Friends"
            }
            else if (Object.values(fr).includes(u.id) && fr.friend_two_id==u.id){
                return "Sent Request"
            }
            else if (Object.values(fr).includes(u.id) && fr.friend_one_id==u.id){
                return "Incoming Request"
            }
            else{
                return "Not Friends"
            }
        })
        if (test.includes("Sent Request")) return "Sent Request"
        if (test.includes("Friends")) return "Friends"
        if (test.includes("Incoming Request")) return "Incoming Request"
        if (test.includes("Not Friends")) return "Not Friends"
    }

    return (
        <>
            <Nav />
            {isLoaded
                ? <div style={{ width: '80%', maxWidth: '80rem', margin: 'auto', padding: '28px' }}>
                    {allUsers.map(u => 
                      <PersonBar key={u.id} getFriends={getFriends} person={u} isFriend={evalIfFriend(u)} setFriends={setFriends}/>
                    )}
                </div>
                : <>Loading...</>
            }
        </>
    )
}

export default People;