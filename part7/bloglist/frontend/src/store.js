import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
})

export default store
