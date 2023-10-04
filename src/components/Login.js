import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (user === 'user' && password === '1234') {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => dispatch(addTodo(data)))
        .catch(error => console.log(error))
      setIsLoggedIn(true)
    } else {
      alert('Incorrect credentials')
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/home" />
  }

  return (
    <div>
      <input
        type="text"
        placeholder="User"
        value={user}
        onChange={(event) => setUser(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;
