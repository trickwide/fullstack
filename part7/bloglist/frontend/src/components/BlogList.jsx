import { List, ListItem, ListItemText } from '@mui/material'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <List>
      {blogs.map((blog) => (
        <ListItem key={blog.id}>
          <ListItemText primary={<Blog blog={blog} user={user} />} />
        </ListItem>
      ))}
    </List>
  )
}

export default BlogList
