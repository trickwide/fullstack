import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'
import Togglable from './Togglable'
import { Box, Button, TextField, Typography } from '@mui/material'

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
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <Box>
        <Typography variant="h3">create new</Typography>
        <form onSubmit={addBlog}>
          <Box sx={{ mb: 2 }}>
            <TextField id="title" type="text" name="Title" label="Blog title" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              id="author"
              type="text"
              name="Author"
              label="Blog author"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField id="url" type="text" name="Url" label="Blog url" />
          </Box>
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            id="create-button"
            type="submit"
          >
            create
          </Button>
        </form>
      </Box>
    </Togglable>
  )
}

export default BlogForm
