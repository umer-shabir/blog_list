import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar as AppBar, Nav, Button } from 'react-bootstrap'

import { logoutUser } from '../reducers/loginReducer'

const Navbar = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }


  if (!user) return null

  return (
    <AppBar className="appbar" collapseOnSelect expand="lg" bg="primary" variant="dark">
      <AppBar.Toggle aria-controls="responsive-navbar-nav" />
      <AppBar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link className="link" to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link className="link" to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>{user.name} logged in</em>
            <Button variant="primary" onClick={handleLogout}>Logout</Button>
          </Nav.Link>
        </Nav>
      </AppBar.Collapse>
    </AppBar>
  )
}

export default Navbar