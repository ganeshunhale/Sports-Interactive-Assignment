import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL
const creatApi = axios.create({baseURL:url})


export const GETCOUNTRIES = async () => {
    const response = await creatApi.get("/countries")
    return response
}
export const GETCOUNTRYBYID = async (id) => {
    const response = await creatApi.get(`/countries/${id}`)
    return response
}
export const ADDCOUNTRY = async (data) => {
    const response = await creatApi.post("/AddCountry",data)
    return response
}