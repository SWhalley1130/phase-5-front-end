import { useState, useContext, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import '../Stylesheets/App.css'
import Login from './Login';
import HomePage from './HomePage';

import { UserProvider, UserContext } from '../user_context';


function App() {


  const {user, setUser}=useContext(UserContext);


  useEffect(()=>
  {
    fetch(`/api/login`)
    .then(r=>r.json())
    .then(data=>
    {
      try{
        setUser({username:data.username, type:data.type});
      }
      catch{
        return null;
      }
    })
  }, [])

  return (
    <>
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<HomePage/>}/>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
