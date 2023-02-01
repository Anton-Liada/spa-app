import axios from "axios";

export const BASE_URL = 'http://localhost:5000/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
