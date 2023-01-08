import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault();
    setErrMsg('');
    const userData = { email, password }
    try {
      const res = await axios.post("https://task-app-theta.vercel.app/login", userData, { withCredentials: true });
      navigate("/");
    } catch (error) {
      setErrMsg(error.response.data.error);
    }
    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={submitHandler} className="login-container">
      <div className="login-wrapper">
        <h2>Login</h2>
        <div className="input-wrapper">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' required /><br />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength="4" maxLength="8" placeholder='Password' required />
        </div>
        {errMsg && <div className="error" >{errMsg}</div>}
        <button type='submit'>Login</button>
        <p>Not a member? <Link to="/signup">signup</Link> </p>
      </div>
    </form>
  )
}

export default Login