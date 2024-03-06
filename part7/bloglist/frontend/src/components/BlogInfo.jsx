import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlogs } from '../reducers/blogReducer'
import Comment from './Comment'
import { useEffect } from 'react'
import { initializeComments } from '../reducers/commentReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  useEffect(() => {
    if (id) {
      dispatch(initializeComments(id))
    }
  }, [dispatch, id])

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(likeBlogs(updatedBlog))
  }
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <Comment id={blog.id} />
    </div>
  )
}

export default BlogInfo
