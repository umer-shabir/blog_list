import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(({ blogs }) => {
    return blogs.slice()
  })

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm hideBlogForm={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </td>
                <td>{blog.user.name}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList