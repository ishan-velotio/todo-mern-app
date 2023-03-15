import React, { useEffect, useState } from "react"
import { loginUser } from "./services/authService"
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
const initialState = {
  email: '',
  password: '',
}


const LoginForm = ({ setUser }) => {

  const [loginForm, setLoginForm] = useState(initialState);
  const navigate = useNavigate()

  const onValueChange = (name, value) => {
    setLoginForm({ ...loginForm, [name]: value })
  }

  const submitLoginForm = async () => {
    const res = await loginUser(loginForm)

    const permissions = {
      readAccess: false,
      writeAccess: false,
      deleteAccess: false
    }

    if(res.data.taskACL.includes('READ_ONLY')) {
      permissions.readAccess = true
    }

    if(res.data.taskACL.includes('BASIC')) {
      permissions.readAccess = true
      permissions.writeAccess = true
    }

    if( res.data.taskACL.includes('OVERWRITE') || res.data.isAdmin) {
      permissions.readAccess = true
      permissions.writeAccess = true
      permissions.deleteAccess = true
    }


    setUser({
      user: res.data,
      isLogin: true,
      permissions
    })

    navigate("/")
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              value={loginForm.email}
              onChange={(e) => onValueChange('email', e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={loginForm.password}
              onChange={(e) => onValueChange('password', e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitLoginForm}
            >
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm