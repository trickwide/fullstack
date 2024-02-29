import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlogs(blog))
    dispatch(
      setNotification(
        {
          message: `a new blog ${blog.title} by ${blog.author} added`,
          isError: false,
        },
        5,
      ),
    )
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              id="title"
              type="text"
              name="Title"
              placeholder="Blog title"
            />
          </div>
          <div>
            author:
            <input
              id="author"
              type="text"
              name="Author"
              placeholder="Blog author"
            />
          </div>
          <div>
            url:
            <input id="url" type="text" name="Url" placeholder="Blog url" />
          </div>
          <button id="create-button" type="submit">
            create
          </button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
