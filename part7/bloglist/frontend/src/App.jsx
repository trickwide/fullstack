import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Typography } from '@mui/material'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'
import UserHeader from './components/UserHeader'
import Users from './components/Users'
import User from './components/User'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Router>
      <div>
        {user === null ? (
          <>
            <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>
              Log in to application
            </Typography>
            <Notification />
            <LoginForm />
          </>
        ) : (
          <>
            <UserHeader username={user.username} />
            <Typography variant="h2" sx={{ marginTop: 2, marginBottom: 2 }}>
              Blog App
            </Typography>
            <Notification />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <BlogForm />
                    <BlogList blogs={sortedBlogs} user={user} />
                  </>
                }
              />
              <Route
                path="/users"
                element={user ? <Users /> : <Navigate replace to="/login" />}
              />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogInfo />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
