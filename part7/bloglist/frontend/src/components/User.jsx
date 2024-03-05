import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <li key={blog.id}>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default User
