import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getId = () => (100000 * Math.random()).toFixed(0)

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const getComment = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const createComment = async (id, comment) => {
  const commentObject = {
    content: comment,
    id: getId(),
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
  remove,
  getComment,
  createComment,
}
