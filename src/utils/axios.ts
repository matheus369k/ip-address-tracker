import axios from 'axios'

export const fetchGeoApi = axios.create({
  baseURL: process.env.GEO_API_URL,
  params: {
    api_key: process.env.GEO_API_KEY,
  },
})
