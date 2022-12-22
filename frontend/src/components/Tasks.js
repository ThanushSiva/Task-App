import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from './TaskContext'
import './Tasks.css'

function Tasks() {
  const { tasks } = useContext(TaskContext)

  const [secArray, setSecArray] = useState([])

  useEffect(() => {
    setSecArray(tasks)
  }, [tasks])

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

  function filterHandler(e) {
    let tempArray;
    const option = e.target.value;
    switch (option) {
      case "ALL": tempArray = tasks
        break;
      case "OPEN": tempArray = tasks.filter((e) => e.status === 'open')
        break;
      case "OPENTODAY": tempArray = tasks.filter((e) => e.status === 'open' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
        break;
      case "CLOSED": tempArray = tasks.filter((e) => e.status === 'closed')
        break;
      case "CLOSEDTODAY": tempArray = tasks.filter((e) => e.status === 'closed' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
        break;
      case "INPROGRESS": tempArray = tasks.filter((e) => e.status === 'in-progress')
        break;
      case "INPROGRESSTODAY": tempArray = tasks.filter((e) => e.status === 'in-progress' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
        break;
    }
    setSecArray(tempArray);
  }

  function searchHandler(e) {
    const searchString = e.target.value.trim();
    let tempArray;
    tempArray = secArray.filter((e) => e.title.includes(searchString) || e.tasks.find((e) => e.taskName.includes(searchString)))
    setSecArray(tempArray);
    console.log(secArray);
  }

  return (
    <div className='task-container'>
      <div className="task-options">
        <div className="drop-down">
          <div className="filter-drop">
            <select name="filter" onChange={filterHandler}>
              <option value="ALL">All</option>
              <option value="OPEN">Open</option>
              <option value="OPENTODAY">Open Today</option>
              <option value="CLOSED">Closed</option>
              <option value="CLOSEDTODAY">Closed Today</option>
              <option value="INPROGRESS">In Progress</option>
              <option value="INPROGRESSTODAY">In Progress Today</option>
            </select>
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder='search' onChange={searchHandler} />
        </div>
      </div>
      <div className="heading">
        <div className="heading-title">Title</div>
        <div className="heading-title">Date</div>
        <div className="heading-title">Priority</div>
        <div className="heading-title">Status</div>
        <div className="heading-title">Action</div>
      </div>
      <div className="tasks">
        {secArray && secArray.length ? secArray.map((e1) => {
          return (
            <div className="task" key={e1._id}>
              <div className="task-header">
                <div className="task-title">{e1.title}</div>
                <div className="task-date">{new Date(e1.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}</div>
                <div className="task-priority"><div className={`circle ${e1.priority + '-circle'}`}></div>{e1.priority}</div>
                <div className={`task-status badge ${e1.status + '-badge'}`}>{e1.status}</div>
                <div className="task-action">
                  <button>Edit</button><button>Delete</button>
                </div>
              </div>
              <div className="task-lists">
                {e1.tasks.map((e2) => {
                  return (
                    <div className="task-list" key={e2._id}>
                      <input type="checkbox" defaultChecked={e2.isDone} />
                      <div className="task-name">{e2.taskName}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }) : <div className='empty-list'>No List available</div>}
      </div>
    </div>
  )
}

export default Tasks