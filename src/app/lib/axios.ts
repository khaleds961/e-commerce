import axios from "axios";
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

let configClient = {
  baseURL: CLIENT_URL,
  timeout: 5000,
  withCredentials: true,
};

let configServer = {
  baseURL: SERVER_URL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const _axios = axios.create(configClient);
export const _axiosServer = axios.create(configServer);
