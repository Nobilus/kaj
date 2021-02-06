import axios from "axios";

export const axiosI = axios.create({
  baseURL: "https://jonasdemeyer.be/wp-json/",
  headers: {
    authorization:
      "Basic V2Vic2l0ZXVzZXI6YVRkbiBPd1p4IEhYVksgTUFRViB4MjFvIGVmaUE=",
  },
});
