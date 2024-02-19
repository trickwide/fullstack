import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: 'Initial message' },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const { setMessage } = notificationSlice.actions

export default notificationSlice.reducer
