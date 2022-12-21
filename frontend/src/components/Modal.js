import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom';
import './Modal.css'
import { ModalContext } from './ModalContext';

function Modal({ children }) {
    const [noTask, setNoTask] = useState(1);
    const [errMsg, setErrMsg] = useState('');
    const { modalState, setModalState, modalType } = useContext(ModalContext);

    const EDIT_MODAL = (
        <div className="modal-container" onClick={(e) => e.target.className !== 'modal' ? setModalState(false) : ''}>
            <div className="modal">Thanush</div>
        </div>
    )
    const FORM_MODAL = (
        <div className="modal-container safe" onClick={(e) => e.target.parentElement.classList.contains('safe') ? '' : setModalState(false)}>
            <div className="modal safe">
                <form className="create-form safe">
                    <input type="text" placeholder='Title' name="title" /><br />
                    <input type="date" placeholder='Date' name="date" /><br />
                    <label>Priority</label>
                    <div className="radio safe">
                        High<input type="radio" name='priority' value='high' />
                        Medium<input type="radio" name='priority' value='medium' />
                        Low<input type="radio" name='priority' value='low' /><br />
                    </div>
                    {Array.from(Array(noTask)).map((e) => {
                        return (<><input key={e} className="tasklist" type="text" placeholder='Task' name="tasklist" /><br /></>)
                    })}
                    {errMsg && <div className="error" >{errMsg}</div>}
                    <button onClick={noTaskHandler}>Add Task</button>
                    <button type="submit" onClick={submitHandler}>Submit</button>
                    <button type="reset" onClick={() => setNoTask(1)}>Reset</button>
                </form>
            </div>
        </div>
    )

    function noTaskHandler(e) {
        e.preventDefault();
        const task = document.querySelectorAll('.tasklist');
        const isEmpty = task[noTask - 1].value === '' ? true : false;
        if (!isEmpty) {
            setNoTask(noTask + 1)
        }
    }

    function validator(data) {
        if (data.title === '') {
            setErrMsg('Title is mandatory')
            return true
        } else if (data.date === '') {
            setErrMsg('Date is mandatory')
            return true
        } else if (data.priority === '') {
            setErrMsg('Priority is mandatory')
            return true
        } else {
            let flag = true;
            data.tasks.map((e) => {
                if (e.taskName !== '') {
                    flag = false
                }
            })
            if (flag) {
                setErrMsg('One task is mandatory')
                return true
            }
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        setErrMsg('')
        const taskList = [];
        if (noTask > 1) {
            const tempArray = e.target.form.tasklist
            for (let index = 0; index < tempArray.length; index++) {
                if (tempArray[index].value !== '') {
                    taskList.push({
                        taskName: tempArray[index].value,
                        isDone: false
                    });
                }
            }
        } else {
            taskList.push({
                taskName: e.target.form.tasklist.value,
                isDone: false
            })
        }

        const formData = {
            title: e.target.form.title.value,
            date: e.target.form.date.value,
            priority: e.target.form.priority.value,
            tasks: taskList
        }

        if (validator(formData)) {
            return false
        }

        console.log(formData);
    }

    return modalState ? ReactDOM.createPortal(modalType === 'form' ? FORM_MODAL : EDIT_MODAL, document.querySelector('#modal')) : '';
}

export default Modal