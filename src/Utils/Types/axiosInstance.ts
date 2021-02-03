import axios from "axios";

export const axiosI = axios.create({
  baseURL: "https://jonasdemeyer.be/wp-json/",
});
