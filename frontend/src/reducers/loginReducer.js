import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import storageService from '../services/storage'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    clearLogin() {
      return null
    },
  },
})

export const { setLogin, clearLogin } = loginSlice.actions

export const initializeLogin = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(setLogin(user))
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      storageService.saveUser(user)
      dispatch(setLogin(user))
      dispatch(setNotification({ message: `Logged in as ${user.name}`, type: 'success' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(clearLogin())
  }
}

export default loginSlice.reducer