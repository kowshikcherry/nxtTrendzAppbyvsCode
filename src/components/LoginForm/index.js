import React , { useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'


import './index.css'



const LoginForm = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [showSubmitError,setShowSubmitError]=useState(false)
  const [errorMsg,setErrorMsg]=useState('')
  const navigate = useNavigate();



  const onChangeUsername=(event)=>setUsername(event.target.value)

  const onChangePassword=(event)=>setPassword(event.target.value)

  const onSubmitSuccess=(jwtToken)=>{

    // console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    navigate('/', { replace: true });
  }

  const onSubmitFailure=errorMsg=>{
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }

  }
  


  const renderPasswordField=()=>{
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  const renderUsernameField=()=>{
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined){
    return <Navigate to='/' replace={true} />;
  }
  
  
  return (
    <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
  )
}

export default LoginForm
