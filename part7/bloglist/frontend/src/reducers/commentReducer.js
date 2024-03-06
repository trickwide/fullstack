import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {
    setComments(state, action) {
      const { blogId, comments } = action.payload
      state[blogId] = comments
    },
    appendComment(state, action) {
      const { blogId, comment } = action.payload
      if (state[blogId]) {
        state[blogId].push(comment)
      } else {
        state[blogId] = [comment]
      }
    },
  },
})

export const { setComments, appendComment } = commentSlice.actions

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await blogService.getComment(blogId)
    dispatch(setComments({ blogId, comments }))
  }
}

export const createComments = (blogId, commentContent) => {
  return async (dispatch) => {
    const comment = await blogService.createComment(blogId, commentContent)
    dispatch(appendComment({ blogId, comment }))
  }
}

export default commentSlice.reducer
