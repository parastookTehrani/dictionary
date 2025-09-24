import axios from "axios";

const baseURL = "https://api.dictionaryapi.dev/api"
export const client = axios.create({
    baseURL
})