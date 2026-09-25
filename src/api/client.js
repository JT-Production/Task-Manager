import axios from "axios";

const connectionInstance = axios.create({
  baseURL: "http://10.0.2.2:4000/api/v1",
  // headers: {
  //     "Content-Type": "application/json",
  // },
});

export default connectionInstance;
