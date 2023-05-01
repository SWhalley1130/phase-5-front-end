import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import '../Stylesheets/App.css'
import Login from './Login';

function App() {
  const [user, setUser]=useState(undefined)
  const [type, setType]=useState(undefined)

  return (

    

    <>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
