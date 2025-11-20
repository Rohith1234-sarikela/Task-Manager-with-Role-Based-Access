import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login') }
  return (
    <header className="header">
      <div className="container">
        <Link to="/">Home</Link>
        {!token && <><Link to="/register">Register</Link><Link to="/login">Login</Link></>}
        {token && <button onClick={logout} style={{float:'right'}}>Logout</button>}
      </div>
    </header>
  )
}
