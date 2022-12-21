import React, { useContext } from 'react'
import './Dashboard.css'
import { ModalContext } from './ModalContext'

function Dashboard() {
  const { setModalState } = useContext(ModalContext);

  function show() {
    setModalState(true);
  }

  return (
    <div className="dashboard-container">
      <div className="user">
        <h3 className="">Welcome Thanush S</h3>
        <h5 className="">logout</h5>
      </div>
      <div className="stats">
        <div className="task-cards open">
          <h2>2</h2>
          <p>Today Open Tasks</p>
        </div>
        <div className="task-cards close">
          <h2>2</h2>
          <p>Today Closed Tasks</p>
        </div>
        <div className="task-cards total">
          <h2>4</h2>
          <p>Today Tasks</p>
        </div>
        <div className="task-cards open">
          <h2>10</h2>
          <p>Open Tasks</p>
        </div>
      </div>
      <div className="stats-data">
        <div className="task-data-container">
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
          <div className="task-data-card">
            <h3>title </h3>
            <p>check list one details to be done</p>
            <p>vr usvriur nduhd aufhe ifd ubu s fb</p>
            <hr />
            <p>12/12/2012</p>
          </div>
        </div>
        <div className="task-data-container"></div>
        <div className="task-data-container"></div>
        <div className="task-data-container"></div>
      </div>
      <button className="task-add" onClick={show}>+</button>
    </div>
  )
}

export default Dashboard