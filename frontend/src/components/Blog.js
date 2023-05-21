import { useState } from 'react'

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
    <div className='blog'>
      {view ? <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>Hide</button>
        <br />
        {blog.url}
        <br />
        Likes {blog.likes} {' '}
        <button onClick={handleLike}>Like</button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === username && (
          <button onClick={deleteBlog}>Remove</button>
        )}
      </div> :
        <div>
          {blog.title} {blog.author} {' '}
          <button onClick={toggleView}>View</button>
        </div>
      }
    </div>
  )
}

export default Blog
