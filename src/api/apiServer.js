import axios from "axios";

export default axios.create({
    baseURL: "http://172.20.10.3:3000",
    timeout: 10000,
  });
