import React, { useState, useEffect, useContext } from "react";
import Nav from './Nav'
import { useNavigate } from "react-router";
import { UserContext } from "../user_context";

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

    useEffect(() => {
        fetch(`/api/users`)
            .then(r => r.json())
            .then(data => setAllUsers(data))

        fetch(`/api/friends`)
            .then(r => r.json())
            .then(data => setFriends(data))

        setIsLoaded(true)
    }, [])

    console.log('allUsers', allUsers)

    return (
        <>
            <Nav />
            {isLoaded
                ? <div style={{ width: '80%', maxWidth: '80rem', margin: 'auto', padding: '28px' }}>
                    {allUsers.map(u => 
                        <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'start'}}>
                            <p>{u.username}</p>
                            <p>{u.email}</p>
                            <p>{u.id}</p>
                        </div>
                    )}
                </div>
                : <>Loading...</>
            }
        </>
    )
}

export default People;