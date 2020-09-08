import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css';


export default function Login(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (props.authenticatedUser) {
    return <Redirect to="/explore" />
  }

  return (
    <React.Fragment>
      <h1 style={{ paddingLeft: '15px' }}>Sign up</h1>
      <form onSubmit={
        (event) => {
          handleSubmit(event, name, email, password, setErrorMessage, props.setAuthenticatedUser);
        }
      }>
        <div className="form-pad">
          <input type="text" placeholder="Name" value={name} onChange={
            event => {
              setErrorMessage('');
              setName(event.target.value);
            }
          } />
        </div>
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
          <input type="submit" value="Sign up" />
        </div>
      </form>
      <div className="form-pad">
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Link to='/login'>
          Already have an account? Log in here
        </Link>
      </div>
    </React.Fragment>
  )
};

function handleSubmit(event, name, email, password, setErrorMessage, setAuthenticatedUser) {

  event.preventDefault();

  if (email.length == 0 || password.length == 0 || name.length == 0) {
    setErrorMessage('Fields cannot be left blank.')
    return
  }

  if (password.length < 8) {
    setErrorMessage('Password must be >= 8 characters.')
    return
  }

  axios.post('/api/users', {
    name: name,
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
      if (error.response.status === 409) {
        setErrorMessage('Account already exists with given email.')
      } else if (error.response.status === 400) {
        setErrorMessage('Invalid or empty/missing fields.')
      } else {
        setErrorMessage('Server or client error.')
      }
    })
}
