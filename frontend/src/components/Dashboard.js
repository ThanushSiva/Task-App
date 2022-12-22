import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import { ModalContext } from './ModalContext'
import { TaskContext } from './TaskContext';

function Dashboard() {
  const { setModalState, setModalType } = useContext(ModalContext);
  const { tasks } = useContext(TaskContext);

  // useEffect(() => {
  //   tasks && taskCounts();
  // }, [tasks])

  // current date

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '-' + mm + '-' + yyyy;

  // current date

  function show() {
    setModalState(true);
    setModalType('form');
  }

  let noOpen, noClosedToday, noOPToday, noOpenToday;

  (function taskCounts() {
    noOpenToday = tasks && tasks.filter((e) => (e.status === 'open' || e.status === 'in-progress') && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
    noClosedToday = tasks && tasks.filter((e) => e.status === 'closed' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
    noOPToday = tasks && tasks.filter((e) => ((new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today))
    noOpen = tasks && tasks.filter((e) => e.status === 'open')
    console.log(noClosedToday);
  })()

  return (
    <div className="dashboard-container">
      <div className="user">
        <h3 className="">Welcome Thanush S</h3>
        <h5 className="">logout</h5>
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
        {[noOpenToday, noClosedToday, noOPToday, noOpen].map((no) => {
          return (
            <div className="task-data-container">
              {no && no.length !== 0 ? no.map((e) => {
                return (
                  <div className="task-data-card">
                    <h3>{e.title}</h3>
                    {e.tasks && e.tasks.map((e) => {
                      return (
                        <p>{e.taskName}</p>
                      )
                    })}
                    <hr />
                    <p>{new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}</p>
                  </div>
                )
              }): <div className="no-list-task">No Item in Task</div>}
            </div>
          )
        })}
      </div>
      <button className="task-add" onClick={show}>+</button>
    </div>
  )
}

export default Dashboard