import axios from "axios"
export const url = process.env.url
console.log(url)
export const Axios = axios.create({
      baseURL:url,
      //baseURL: "https://mern-instagram-cloned.herokuapp.com/",
      withCredentials: true,
      credentials: "include"

})

