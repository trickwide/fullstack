import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    createBlog: (state, action) => {
      return state.concat(action.payload)
    },
    likeBlog: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { setBlogs, createBlog, likeBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogs = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(createBlog(newBlog))
  }
}

export const likeBlogs = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(likeBlog(updatedBlog))
  }
}

export const deleteBlogs = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
  }
}

export default blogSlice.reducer
