import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlogs, deleteBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, removeBlog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(likeBlogs(updatedBlog))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogs(blog))
      dispatch(
        setNotification(
          {
            message: `Blog '${blog.title}' removed successfully.`,
            isError: false,
          },
          5,
        ),
      )
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          {blog.url}
          <div>
            likes {blog.likes}{' '}
            <button onClick={handleLike} data-testid="like-button">
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {user && user.username === blog.user.username && (
            <div>
              <button onClick={handleDelete}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
