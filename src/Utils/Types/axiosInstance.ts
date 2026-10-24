import axios from "axios";

export const axiosI = axios.create({
  baseURL: "https://wordpress.kaj.be/wp-json/",
});
