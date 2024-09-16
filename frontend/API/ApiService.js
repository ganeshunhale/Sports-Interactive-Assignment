import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;
console.log({ url });

const createApi = axios.create({
  baseURL: url ? url : "http://localhost:8080" 
});

export const GETCOUNTRIES = async () => {
  try {
    const response = await createApi.get("/countries");
    return response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const GETCOUNTRYBYID = async (id) => {
  try {
    const response = await createApi.get(`/countries/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching country with ID ${id}:`, error);
    throw error;
  }
};

export const ADDCOUNTRY = async (data) => {
  try {
    const response = await createApi.post("/AddCountry", data);
    return response;
  } catch (error) {
    console.error("Error adding country:", error);
    throw error;
  }
};
