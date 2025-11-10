import axios from 'axios';
import { API_BASE_URL } from '../Config';

export const loadData = async () => {
  return axios.post(`${API_BASE_URL}/user/loadData`, {});
};

export const searchUsers = async (keyword) => {
  return axios.get(`${API_BASE_URL}/user/keyword`, {
    params: { keyword },
    validateStatus: (status) => status < 400
  });
};
