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
      setIsLoggedIn(true)
    } else {
      alert('El nombre de usuario y/o la contraseña son incorrectas')
    }
  }

  if (isLoggedIn) {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => dispatch(addTodo(data)))
      .catch((error) => console.log(error))

    return <Navigate to="/home" />
  }

  return (
    <div className="container mt-auto">
      <div className="row justify-content-center">
        <div>
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center">Welcome!</h2>
              <form>
                <div className="form-floating m-2">
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    placeholder="User"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                  />
                  <label htmlFor="user">User</label>
                </div>
                <div className="form-floating m-2">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
