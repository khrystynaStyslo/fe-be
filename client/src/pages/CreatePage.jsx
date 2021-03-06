import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = useCallback(async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        console.log('data link', data)
        navigate(`/detail/${data.link._id}`)
      } catch (e) {
      }
    }
  }, [auth.token, link, request])

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '20px'}}>
        <div className="input-field">
          <input
            placeholder="Input your link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="email">Link</label>
        </div>
      </div>
    </div>
  )
}