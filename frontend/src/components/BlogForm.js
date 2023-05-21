import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:{' '}</label>
          <input type="text" value={newBlog.title} name="title" onChange={handleChange}></input>
        </div>
        <div>
          <label>Author:{' '}</label>
          <input type="text" value={newBlog.author} name="author" onChange={handleChange}></input>
        </div>
        <div>
          <label>Url:{' '}</label>
          <input type="text" value={newBlog.url} name="url" onChange={handleChange}></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm