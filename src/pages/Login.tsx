import React, { useState } from 'react'
import Header from '../components/Header'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div>
        <Header />
        <label>
            Email:
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            Password:
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='button'>entrar</button>
    </div>
  )
}