import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username&nbsp;</label>
          <input type="text" value={username} id="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>Password{' '}</label>
          <input type="password" value={password} id="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit" id="login-btn">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
