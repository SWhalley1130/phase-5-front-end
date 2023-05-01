import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import '../Stylesheets/App.css'
import Login from './Login';
import HomePage from './HomePage';

function App() {
  const [user, setUser]=useState(undefined)
  const [type, setType]=useState(undefined)

  function handleLogin(u, t){
    setType(t);
    setUser(u); 
  }

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login handleLogin={handleLogin}/>}/>
        <Route exact path="/" element={<HomePage/>}/>

      </Routes>
    </>
  )
}

export default App
