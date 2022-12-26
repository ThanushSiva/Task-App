import React, { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Dashboard.css'
import { ModalContext } from './ModalContext'
import { TaskContext } from './TaskContext';
import axios from 'axios'

function Dashboard() {
  const { setModalState, setModalType } = useContext(ModalContext);
  const { tasks, today, user } = useContext(TaskContext);
  const navigate = useNavigate();

  function show() {
    setModalState(true);
    setModalType('form');
  }

  let noOpen, noClosedToday, noOPToday, noOpenToday;

  function taskCounts() {
    noOpenToday = tasks && tasks.filter((e) => (e.status === 'open' || e.status === 'in-progress') && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
    noClosedToday = tasks && tasks.filter((e) => e.status === 'closed' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
    noOPToday = tasks && tasks.filter((e) => ((new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today))
    noOpen = tasks && tasks.filter((e) => e.status === 'open')
  }

  async function logoutHandler() {
    try {
      const logout = await axios.post("http://localhost:4000/logout");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  }

  taskCounts();

  return (
    <div className="dashboard-container">
      <div className="user">
        <h3 className="">Welcome {user}</h3>
        {user ? <h5 className="" onClick={logoutHandler}>logout</h5> : <Link to='/login'><h5 className="">login</h5></Link>}
      </div>
      <div className="stats">
        <div className="task-cards open">
          <h2>{noOpenToday ? noOpenToday.length : '0'}</h2>
          <p>Today Open Tasks</p>
        </div>
        <div className="task-cards close">
          <h2>{noClosedToday ? noClosedToday.length : '0'}</h2>
          <p>Today Closed Tasks</p>
        </div>
        <div className="task-cards total">
          <h2>{noOPToday ? noOPToday.length : '0'}</h2>
          <p>Today Tasks</p>
        </div>
        <div className="task-cards open">
          <h2>{noOpen ? noOpen.length : '0'}</h2>
          <p>Open Tasks</p>
        </div>
      </div>
      <div className="stats-data">
        {[noOpenToday, noClosedToday, noOPToday, noOpen].map((no, i) => {
          return (
            <div className="task-data-container" key={i}>
              {no && no.length !== 0 ? no.map((e) => {
                return (
                  <div className={`task-data-card ${e.priority + '-card'}`} key={e._id}>
                    <h3>{e.title}</h3>
                    {e.tasks && e.tasks.map((e) => {
                      return (
                        <p key={e._id}>{e.taskName}</p>
                      )
                    })}
                    <hr />
                    <p>{new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}</p>
                  </div>
                )
              }) : <div className="no-list-task">No Item in Task</div>}
            </div>
          )
        })}
      </div>
      <button className="task-add" onClick={show}>+</button>
    </div>
  )
}

export default Dashboard