import { useState } from 'react'
import ProtoTypes from 'prop-types'

const Blog = ({ blog, username, updateLikes, removeBlog }) => {
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateLikes(blog.id, blogToUpdate)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} {' '}
        <button onClick={toggleView}>{view ? 'Hide' : 'View'}</button>
      </div>
      {view && <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          Likes {blog.likes} {' '}
          <button id="like-btn" onClick={handleLike}>Like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === username && (
          <button onClick={deleteBlog}>Remove</button>
        )}
      </div>
      }
    </div>
  )
}

Blog.prototypes = {
  updateLikes: ProtoTypes.func.isRequired,
  removeBlog: ProtoTypes.func.isRequired,
  username: ProtoTypes.string.isRequired
}

export default Blog
