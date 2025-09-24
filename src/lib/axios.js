import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL

export const client = axios.create({
    BASEURL
})