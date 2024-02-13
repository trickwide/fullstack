import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
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
    const timer = setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [errorMessage])

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
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
          blog.id === id ? { ...blog, likes: returnedBlog.likes } : blog
        )
      )
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      setBlogs(blogs.filter((blog) => blog.id !== id))

      try {
        await blogService.remove(id)
        setErrorMessage(`Blog '${blog.title}' removed successfully.`)
        setIsError(false)
      } catch (exception) {
        setBlogs(blogs)
        setErrorMessage(
          `Failed to remove blog '${blogToRemove.title}'. Error: ${error.message}`
        )
        setIsError(true)
      }
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat({ ...returnedBlog, username }))
      setErrorMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setIsError(false)
    })
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={errorMessage}
          type={isError ? 'error' : 'success'}
        />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={errorMessage}
        type={isError ? 'error' : 'success'}
      />
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
