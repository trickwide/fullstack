import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
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

  const handleLike = async () => {
    updateLikes()
  }

  const handleDelete = async () => {
    removeBlog()
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          {blog.url}
          <div>
            likes {blog.likes}{' '}
            <button onClick={handleLike} data-testid='like-button'>
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
