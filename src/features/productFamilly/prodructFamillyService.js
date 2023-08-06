import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/productFamilies'

const getProductFamilies = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}

const getProductFamily = async (productFamilyId) => {
  const response = await axios.get(`${API_URL}/${productFamilyId}`)
  return response.data
}

const createProductFamily = async (productFamilyData) => {
  const response = await axios.post(API_URL, productFamilyData)
  return response.data
}

const updateProductFamily = async (productFamilyId, updatedData) => {
  const response = await axios.put(`${API_URL}/${productFamilyId}`, updatedData)
  return response.data
}

const deleteProductFamily = async (productFamilyId) => {
  const response = await axios.delete(`${API_URL}/${productFamilyId}`)
  return response.data
}

const productFamilyService = {
  getProductFamilies,
  getProductFamily,
  createProductFamily,
  updateProductFamily,
  deleteProductFamily,
}

export default productFamilyService
