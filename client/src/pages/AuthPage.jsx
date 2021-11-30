import React, {useCallback, useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = useCallback((event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }, [form])

  const registerHandler = useCallback(async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }, [form, request, message])

  const loginHandler = useCallback(async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }, [form, request, message])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short link</h1>
        <div className="card indigo darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Input your email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Input your email"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn lime lighten-2 black-text"
              style={{marginRight: '15px'}}
              onClick={loginHandler}
              disabled={loading}
            >Login</button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >Registration</button>
          </div>
        </div>
      </div>
    </div>
  )
}