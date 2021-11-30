import React, {useCallback, useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = useCallback((event) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }, [])

  return (
    <nav>
      <div className="nav-wrapper teal darken-4" style={{ padding: '0 30px' }}>
        <a href="#" className="brand-logo">Short links</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a onClick={logoutHandler} href="/">Exit</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}