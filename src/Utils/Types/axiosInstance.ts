import axios from "axios";

export const axiosI = axios.create({
  baseURL: "http://wordpress.kaj.be/wp-json/",
  headers: {
    authorization:
      "Basic d2Vic2l0ZXVzZXI6dVZNNSBSRjRjIDUyU1kga20xeCBrV2JLIG5pcng=",
  },
});
