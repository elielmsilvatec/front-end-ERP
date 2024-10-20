import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://data.colorado.gov/resource";
} else {
  baseURL = "http://localhost:5000/";
}

const api = axios.create({
  baseURL: baseURL,
});

export default api;






// const userToken = Cookies.get("userToken");

// api.interceptors.request.use(async config => {

//   const userToken = await Cookies.get("userToken");
//   const token = JSON.parse(userToken)

//   config.headers.authorization =  `Bearer ${token}`

//   return config

// })