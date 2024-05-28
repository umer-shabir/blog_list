import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import { addLike, commentBlog, removeBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id))
  const user = useSelector((state) => state.login)
  const { reset: resetComment, ...comment } = useField('text')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  const handleLike = () => {
    dispatch(addLike(id, blog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    resetComment()
  }

  if (!blog) return null

  return (
    <div className="blog-details">
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        Likes {blog.likes}{' '}
        <Button className="like-btn" variant="primary" id="like-btn" onClick={handleLike}>Like</Button>
      </div>
      <div>
        Added by {blog.user.name}
      </div>
      <div>
        {blog.user.username === user.username && (
          <Button className="remove-btn" variant="danger" onClick={handleDelete}>Remove</Button>
        )}
      </div>
      <h3 className="comment-heading">Comments</h3>
      <Form className="comment-form" onSubmit={handleComment}>
        <Form.Control id="comment" name="comment" {...comment} placeholder="Add a comment" />
        <Button className="comment-btn" variant="primary" type="submit">Add comment</Button>
      </Form>
      <ul className="comments">
        {blog.comments.map((comment, index) => (
          <li className="comment" key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
