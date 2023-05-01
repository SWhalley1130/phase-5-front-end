import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.jsx'
import './Stylesheets/index.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
)
