import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    loginUser(state, action) {
      return action.payload
    },
    logoutUser() {
      return null
    },
  },
})

export const { setUser, loginUser, logoutUser } = authSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      dispatch(
        setNotification(
          { message: `${user.username} succesfully logged in`, isError: false },
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: 'Wrong username or password',
            isError: true,
          },
          5,
        ),
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }
}

export default authSlice.reducer
