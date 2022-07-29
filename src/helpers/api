import { api_key } from "../../config.json"
import axios from "axios"


export const bungie = axios.create({
  baseURL: "https://www.bungie.net/Platform",
  headers: {
    Accept: "*/*",
    "X-API-Key": api_key,
  },
})

bungie.defaults.headers.post["Content-Type"] = "application/json"
