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
            if (Object.values(fr).includes(u.id) && fr.accepted==true){
                return "Friends"
            }
            else if (Object.values(fr).includes(u.id) && fr.accepted==false){
                return "Pending"
            }
            else{
                return "Not Friends"
            }
        })
        return test[0]
    }

    return (
        <>
            <Nav />
            {isLoaded
                ? <div style={{ width: '80%', maxWidth: '80rem', margin: 'auto', padding: '28px' }}>
                    {allUsers.map(u => 
                      <PersonBar key={u.id} getFriends={getFriends} person={u} isFriend={evalIfFriend(u)}/>
                    )}
                </div>
                : <>Loading...</>
            }
        </>
    )
}

export default People;