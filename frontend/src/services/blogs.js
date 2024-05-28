import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/blogs'

const getHeaders = () => {
  const user = storageService.loadUser()
  return { Authorization: user ? `Bearer ${user.token}` : null }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObject) => {
  const config = {
    headers: getHeaders(),
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: getHeaders(),
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, comment, update, remove }
