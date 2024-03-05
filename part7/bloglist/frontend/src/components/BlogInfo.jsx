import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlogs } from '../reducers/blogReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(likeBlogs(updatedBlog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogInfo
