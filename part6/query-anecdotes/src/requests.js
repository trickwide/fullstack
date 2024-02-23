import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length >= 5) {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
  }
}

export const updateAnecdote = async (updatedAnecdote) => {
  const id = updatedAnecdote.id
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}
