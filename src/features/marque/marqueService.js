import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/marques'

const getMarques = async () => {
  try {
    const response = await axios.get(`${API_URL}`)
    return response.data
  } catch (error) {
    console.error('Error getting marques', error)
    throw error
  }
}
const getMarque = async (marqueId) => {
  const response = await axios.get(`${API_URL}/${marqueId}`)
  return response.data
}
const createMarque = async (marqueData) => {
  const response = await axios.post(API_URL, marqueData)
  return response.data
}
const updateMarque = async (marqueId, updatedData) => {
  const response = await axios.put(`${API_URL}/${marqueId}`, updatedData)
  return response.data
}
const addMarquePhoto = async (marqueId, photoData) => {
  const response = await axios.put(`${API_URL}/${marqueId}/photo`, photoData)
  return response.data
}

const deleteMarque = async (marqueId) => {
  const response = await axios.delete(`${API_URL}/${marqueId}`)
  return response.data
}

const marqueService = {
  getMarques,
  getMarque,
  createMarque,
  updateMarque,
  addMarquePhoto,
  deleteMarque, // Ajoutez la nouvelle fonction ici
}

export default marqueService
