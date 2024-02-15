import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
    return blog
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            placeholder='Blog title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            placeholder='Blog author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            placeholder='Blog url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
