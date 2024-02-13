import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('Blog title')
  const author = screen.getByPlaceholderText('Blog author')
  const url = screen.getByPlaceholderText('Blog url')
  const createButton = screen.getByText('create')

  await user.type(title, 'Test blog')
  await user.type(author, 'Test author')
  await user.type(url, 'Test url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test url')
})
