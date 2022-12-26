import React, { useContext, useState } from 'react'
import './Calendar.css'
import { TaskContext } from './TaskContext'

function Calendar() {
  const { tasks, today } = useContext(TaskContext)
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(12);

  const days = new Array(new Date(year, month, 0).getDate() + (new Date(year + "-" + month + "-01").getDay() - 1)).fill(0);
  const years = new Array(50).fill(0);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [tDate, tMonth, tYear] = today.split('-')

  return (
    <div className='calendar-container'>
      <div className="cal-form">
        <select name="year" onChange={e => setYear(e.target.value)}>
          {
            years.map((e, i) => {
              return <option key={i} value={i + 1 + 2000} selected={i + 1 + 2000 === year ? true : false}>{i + 1 + 2000}</option>
            })
          }
        </select>
        <select name="month" onChange={e => setMonth(e.target.value)}>
          {
            months.map((e, i) => {
              return <option key={i} value={i + 1} selected={i + 1 === month ? true : false}>{e}</option>
            })
          }
        </select>
      </div>
      <div className="week">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div className="cal-days">
        {
          days.map((e, i) => {
            if (i + 1 >= new Date(year + "-" + month + "-01").getDay()) {
              return (
                <div key={i} className={`cal-day ${month == tMonth ? year == tYear ? (i - (new Date(year + "-" + month + "-01").getDay() - 2)) == tDate ? 'curr-date' : '' : '' : ''}`}>
                  <div className={`cal-date`}>{i - (new Date(year + "-" + month + "-01").getDay() - 2)}</div>
                  <div className="cal-tasks">
                    {tasks && tasks.map((todo, j) => {
                      if (new Date(todo.date).toISOString().replace(/T.*/, '').split('-').reverse().join('-') === (i - (new Date(year + "-" + month + "-01").getDay() - 2))+ '-' + month + '-' + year) {
                        return <div key={j} className={`cal-task ${'cal-' + todo.priority}`}>{todo.title}</div>
                      }
                    })}
                  </div>
                </div>
              );
            }
            else {
              return <div key={i} className=""></div>
            }
          })
        }
      </div>
    </div>
  )
}

export default Calendar