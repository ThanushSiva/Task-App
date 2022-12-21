import React, { useEffect, useState } from 'react'
import './Tasks.css'

function Tasks() {
  const [taskArray, setTaskArray] = useState([
    {
      user: "thanu",
      title: "watch movie",
      date: "2022-12-21T14:10:30Z",
      priority: "high",
      status: "open", //dynamic 
      tasks: [{
        taskTitle: "task1",
        isDone: false
      }, {
        taskTitle: "task1",
        isDone: false
      }, {
        taskTitle: "task1",
        isDone: true
      }]
    }, {
      user: "thanu",
      title: "play",
      date: "2022-12-20T14:10:30Z",
      priority: "low",
      status: "closed", //dynamic 
      tasks: [{
        taskTitle: "task1",
        isDone: false
      }, {
        taskTitle: "task1",
        isDone: true
      }]
    }
  ])

  const [secArray, setSecArray] = useState([])

  useEffect(() => {
    setSecArray(taskArray)
  }, [taskArray])

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
      case "ALL": tempArray = taskArray
        break;
      case "OPEN": tempArray = taskArray.filter((e) => e.status === 'open')
        break;
      case "OPENTODAY": tempArray = taskArray.filter((e) => e.status === 'open' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
        break;
      case "CLOSED": tempArray = taskArray.filter((e) => e.status === 'closed')
        break;
      case "CLOSEDTODAY": tempArray = taskArray.filter((e) => e.status === 'closed' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
        break;
      case "INPROGRESS": tempArray = taskArray.filter((e) => e.status === 'in progress')
        break;
      case "INPROGRESSTODAY": tempArray = taskArray.filter((e) => e.status === 'in progress' && (new Date(e.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')) === today)
        break;
    }
    setSecArray(tempArray);
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
          <input type="text" placeholder='search' />
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
            <div className="task">
              <div className="task-header">
                <div className="task-title">{e1.title}</div>
                <div className="task-date">{new Date(e1.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}</div>
                <div className="task-priority">{e1.priority}</div>
                <div className="task-status">{e1.status}</div>
                <div className="task-action">
                  <button>Edit</button><button>Delete</button>
                </div>
              </div>
              <div className="task-lists">
                {e1.tasks.map((e2) => {
                  return (
                    <div className="task-list">
                      <input type="checkbox" defaultChecked={e2.isDone} />
                      <div className="task-name">{e2.taskTitle}</div>
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