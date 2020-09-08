import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css';


export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (props.authenticatedUser) {
    return <Redirect to="/explore" />
  }

  return (
    <React.Fragment>
      <h1 style={{ paddingLeft: '15px' }}>Login</h1>
      <form onSubmit={
        (event) => {
          handleSubmit(event, email, password, setErrorMessage, props.setAuthenticatedUser);
        }
      }>
        <div className="form-pad">
          <input type="email" placeholder="Email" value={email} onChange={
            event => {
              setErrorMessage('');
              setEmail(event.target.value);
            }
          } />
        </div>
        <div className="form-pad">
          <input type="password" placeholder="Password" value={password} onChange={
            event => {
              setErrorMessage('');
              setPassword(event.target.value);
            }
          } />
        </div>
        <div className="form-pad">
          <input type="submit" value="Log in" />
        </div>
      </form>
      <div className="form-pad">
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Link to='/register'>
          Don't have an account? Sign up here
        </Link>
      </div>
    </React.Fragment>
  )
};

function handleSubmit(event, email, password, setErrorMessage, setAuthenticatedUser) {

  event.preventDefault();

  if (email.length == 0 || password.length == 0) {
    setErrorMessage('Fields cannot be left blank.')
    return
  }

  axios.post('/api/users/login', {
    email: email,
    password: password
  })
    .then(response => {
      setAuthenticatedUser({
        name: response.data.name,
        email: response.data.email
      })
    })
    .catch(error => {
      console.log(error.response)
      if (error.response.status === 401) {
        setErrorMessage('Invalid or mismatched email or password')
      } else if (error.response.status === 400) {
        setErrorMessage('Fields cannot be left blank.')
      } else {
        setErrorMessage('Server or client error.')
      }
    })
}
