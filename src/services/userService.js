import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const userService = {
  getProfile: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateProfile: async (token, userData) => {
    try {
      const formattedData = {
        ...userData,
        date_of_birth: userData.date_of_birth 
          ? new Date(userData.date_of_birth).toISOString()
          : null
      };

      const response = await axios.put(`${API_URL}/api/users/`, formattedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteAccount: async (token) => {
    try {
      const response = await axios.delete(`${API_URL}/api/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};