import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import homeIcon from '../assets/home.svg'
import taskIcon from '../assets/task.svg'
import calendarIcon from '../assets/calendar.svg'

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <NavLink to='/'>
                    <img src={homeIcon} alt="home" />
                    <p>Home</p>
                </NavLink>
                <NavLink to='/tasks'>
                    <img src={taskIcon} alt="task" />
                    <p>Tasks</p>
                </NavLink>
                <NavLink to='/calendar'>
                    <img src={calendarIcon} alt="calendar" />
                    <p>Calendar</p>
                </NavLink>
            </nav>
        </>
    )
}

export default Navbar