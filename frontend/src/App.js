import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [message])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage({ notfiy: `A new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success' })
    } catch (exception) {
      setMessage({ notfiy: exception.response.data.error, type: 'error' })
    }
  }

  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch (exception) {
      setMessage({ notfiy: exception.response.data.error, type: 'error' })
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setMessage({ notfiy: 'Blog deleted successfuly', type: 'success' })
    } catch (exception) {
      setMessage({ notfiy: exception.response.data.error, type: 'error' })
    }
  }

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage({ notfiy: exception.response.data.error, type: 'error' })
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user === null ?
        <div>
          <Togglable buttonLabel='Login'>
            <Notification message={message} />
            <LoginForm login={login} />
          </Togglable>
        </div> :
        <div>
          <Notification message={message} />
          <p>
            <span>{user.name} logged in{' '}</span>
            <button onClick={logout}>Logout</button>
          </p>
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} username={user.username} updateLikes={updateLikes} removeBlog={deleteBlog} />)
          }
        </div>
      }
    </div>

  )
}

export default App
