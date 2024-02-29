import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, isError: false },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message
      state.isError = action.payload.isError
    },
    removeMessage: (state) => {
      state.message = null
      state.isError = false
    },
  },
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
