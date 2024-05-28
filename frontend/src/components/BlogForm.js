import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createBlog } from '../reducers/blogReducer'


const BlogForm = ({ hideBlogForm }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog(newBlog))
    hideBlogForm()
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form className="blog-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
            placeholder="Write blog title"
          />
          <Form.Label>Author: </Form.Label>
          <Form.Control
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
            placeholder="Write blog author"
          />
          <Form.Label>Url: </Form.Label>
          <Form.Control
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
            placeholder="Write blog url"
          />
          <Button className="blog-btn" variant="primary" id="create" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
