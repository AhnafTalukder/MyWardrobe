import { useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)



  return (
   
    <div className="hero-panel">
      <div className="description">
      <p style={{fontSize:"70px", fontWeight:"bold"}}>Customize.</p>
      <p style={{fontSize:"70px",fontWeight:"bold", color:"#FFD600"}}>Share.</p>
      <p>Your Own Custom Wardrobe.</p>
      </div>

      <button className="outline-button">  <Link  to="/clothing-form"> Add Clothing </Link></button>
      <button className="outline-button"> <Link  to="/catalog-view"> View Wardrobe </Link></button>
      <button className="outline-button"> <Link  to="/"> Share </Link></button>
    </div>
 
  )
}

export default App
