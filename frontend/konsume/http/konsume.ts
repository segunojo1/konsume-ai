import axios from 'axios';

const API_URL = 'https://konsumee.azurewebsites.net/';
export const axiosKonsumeInstance = axios.create({
  baseURL: API_URL,
  headers: {},
});
