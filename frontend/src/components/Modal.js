import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom';
import './Modal.css'
import { ModalContext } from './ModalContext';
import { TaskContext } from './TaskContext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Modal({ children }) {
    const [noTask, setNoTask] = useState(1);
    const [errMsg, setErrMsg] = useState('');
    const [disable, setDisable] = useState(false)
    const { modalState, setModalState, modalType } = useContext(ModalContext);
    const { tasks, setTasks } = useContext(TaskContext);

    function temp(i) {
        try {
            const tempTitle = modalType.tasks[i].taskName;
            return tempTitle;
        } catch (error) {
            return ''
        }
    }

    const EDIT_MODAL = (
        <div className="modal-container" onClick={(e) => e.target.classList.contains('modal-container') ? setModalState(false) : ''}>
            <div className="modal safe">
                <form className="create-form safe">
                    <input type="text" placeholder='Title' name="title" defaultValue={modalType.title} /><br />
                    <input type="date" placeholder='Date' name="date" defaultValue={new Date(modalType.date).toLocaleDateString('sv-SE')} /><br />
                    <label>Priority</label>
                    <div className="radio safe">
                        High<input type="radio" name='priority' value='high' defaultChecked={modalType.priority === 'high'} />
                        Medium<input type="radio" name='priority' value='medium' defaultChecked={modalType.priority === 'medium'} />
                        Low<input type="radio" name='priority' value='low' defaultChecked={modalType.priority === 'low'} /><br />
                    </div>
                    {Array.from(Array(noTask)).map((e, i) => {
                        return (<div key={i}><input className="tasklist" type="text" defaultValue={modalType && temp(i)} placeholder='Task' name="tasklist" /><br /></div>)
                    })}
                    {errMsg && <div className="error" >{errMsg}</div>}
                    <button onClick={noTaskHandler}>Add Task</button>
                    <button type="submit" onClick={(e) => updateHandler(e, modalType._id)} disabled={disable}>{disable ? 'Loading...' : 'Update'}</button>
                    <button type="reset" onClick={resetHandler}>Reset</button>
                </form>
            </div>
            <ToastContainer />
        </div >
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
                    {Array.from(Array(noTask)).map((e, i) => {
                        return (<div className="safe" key={i}><input className="tasklist" type="text" placeholder='Task' name="tasklist" /><br /></div>)
                    })}
                    {errMsg && <div className="error" >{errMsg}</div>}
                    <button onClick={noTaskHandler}>Add Task</button>
                    <button type="submit" onClick={submitHandler} disabled={disable}>{disable ? 'Loading...' : 'Submit'}</button>
                    <button type="reset" onClick={resetHandler}>Reset</button>
                </form>
            </div>
            <ToastContainer />
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

    function resetHandler() {
        setNoTask(1)
        setErrMsg('')
    }

    async function submitHandler(e) {
        e.preventDefault();
        setDisable(true);
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
            status: "open",
            tasks: taskList
        }

        if (validator(formData)) {
            setDisable(false);
            return false
        }

        try {
            const res = await axios.post("http://localhost:4000/create", formData);
            if (res.status === 200) {
                toast.success('Task Updated', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const newTask = res.data.task;
                setTasks((prev) => {
                    return [
                        ...prev,
                        newTask
                    ]
                })
                e.target.form.title.value = ''
                e.target.form.date.value = ''
                e.target.form.priority.value = null
                resetHandler()
                e.target.form.tasklist.value = ''
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setDisable(false);

    }

    async function updateHandler(e, _id) {
        e.preventDefault();
        setDisable(true);
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
            status: "open",
            tasks: taskList
        }

        if (validator(formData)) {
            setDisable(false);
            return false
        }

        try {
            const res = await axios.post("http://localhost:4000/replace", { _id, formData });
            if (res.status === 200) {
                toast.success('Task Updated', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const newTask = res.data.updateTask;
                setTasks((prev) => {
                    return (prev.map((e) => e._id !== newTask._id ? e : newTask))
                })
                e.target.form.title.value = ''
                e.target.form.date.value = ''
                e.target.form.priority.value = null
                resetHandler()
                e.target.form.tasklist.value = ''
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setDisable(false);

    }

    return modalState ? ReactDOM.createPortal(modalType === 'form' ? FORM_MODAL : EDIT_MODAL, document.querySelector('#modal')) : '';
}

export default Modal