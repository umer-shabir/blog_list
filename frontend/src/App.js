import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import Navbar from './components/Navbar'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLogin } from './reducers/loginReducer'

const App = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    dispatch(initializeLogin())
  }, [])

  return (
    <div className="container">
      <Navbar />
      <h1>Blog App</h1>
      <Notification />
      {user === null ? (
        <div>
          <Togglable buttonLabel="Login">
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
