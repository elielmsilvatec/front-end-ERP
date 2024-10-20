

import axios, { Axios } from "axios";


const api = axios.create({
  baseURL: 'http://localhost:5000'
})

// const userToken = Cookies.get("userToken");

// api.interceptors.request.use(async config => {

//   const userToken = await Cookies.get("userToken");
//   const token = JSON.parse(userToken)

//   config.headers.authorization =  `Bearer ${token}`

//   return config

// })

export default api