import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const updateLikes = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const returnedBlog = await blogService.update(id, updatedBlog)
    if (returnedBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: returnedBlog.likes } : blog,
        ),
      )
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      setBlogs(blogs.filter((blog) => blog.id !== id))

      try {
        await blogService.remove(id)
        dispatch(
          setNotification(
            {
              message: `Blog '${blog.title}' removed successfully.`,
              isError: false,
            },
            5,
          ),
        )
      } catch (error) {
        setBlogs(blogs)
        dispatch(
          setNotification(
            {
              message: `Failed to remove blog '${blog.title}'. Error: ${error.message}`,
              isError: true,
            },
            5,
          ),
        )
      }
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat({ ...returnedBlog, username }))
      // We should also dispatch the seconds parameter to the setNotification action creator
      dispatch(
        setNotification(
          {
            message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
            isError: false,
          },
          5,
        ),
      )
    })
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <h3>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </h3>
      {blogForm()}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={() => updateLikes(blog.id)}
          removeBlog={() => removeBlog(blog.id)}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
