import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks/index'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value, password.value))
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h3>Log in to application</h3>
      <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control id="username" name="username" {...username} />
          <Form.Label>Password</Form.Label>
          <Form.Control id="password" name="password" {...password} />
          <Button className="login-btn" variant="primary" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
