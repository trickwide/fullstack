import { createSlice } from '@reduxjs/toolkit'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor: (state, action) => {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    createAnecdote: (state, action) => {
      return [...state, { content: action.payload, id: getId(), votes: 0 }]
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const {
  voteFor,
  createAnecdote,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions

export default anecdoteSlice.reducer
