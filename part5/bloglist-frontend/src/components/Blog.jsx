import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          {blog.url}
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
