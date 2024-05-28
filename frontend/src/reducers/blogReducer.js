import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const blog = action.payload
      return state.filter((b) => b.id !== blog.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { updateBlog, appendBlog, deleteBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification({ message: `A new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.comment(blog.id, comment)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification({ message: `New comment on ${blog.title} by ${blog.author}: ${comment}`, type: 'success' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const addLike = (id, blog) => {
  return async dispatch => {
    try {
      const blogToLike = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const updatedBlog = await blogService.update(id, blogToLike)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification({ message: `Blog ${blog.title} by ${blog.author} was liked`, type: 'success' }, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog))
      dispatch(setNotification({ message: 'Blog deleted successfuly', type: 'success' }, 5))
    } catch (exception) {
      if (exception.response.status === 404) {
        dispatch(deleteBlog(blog))
      }
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export default blogSlice.reducer