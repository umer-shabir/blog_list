import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
    notification: notificationReducer,
  },
})

export default store