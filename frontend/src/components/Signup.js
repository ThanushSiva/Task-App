import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    setErrMsg('');
    const userData = { email, password }
    try {
      const res = await axios.post("https://task-app-theta.vercel.app/signup", userData);
      console.log(res);
    } catch (error) {
      setErrMsg(error.response.data.error);
    }
    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={submitHandler} className="signup-container">
      <div className="signup-wrapper">
        <h2>Signup</h2>
        <div className="input-wrapper">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' /><br />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        </div>
        {errMsg && <div className="error" >{errMsg}</div>}
        <button type='submit'>Signup</button>
        <p>Already a member? <Link to='/login'>login</Link> </p>
      </div>
    </form>
  )
}

export default Signup