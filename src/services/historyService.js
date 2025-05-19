import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const historyService = {

  getUserHistory: async (token = null) => {
    try {
      if (token === null) {
        token = localStorage.getItem('access_token');
      }

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get(`${API_URL}/api/classify/histories`, {
        headers
      });
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDetailedHistory: async (historyId, token = null) => {
    try {
      if (token === null) {
        token = localStorage.getItem('access_token');
      }

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get(`${API_URL}/api/classify/histories/${historyId}/detail`, {
        headers
      });
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
   
  deleteHistory: async (historyId, token = null) => {
    try {
      if (token === null) {
        token = localStorage.getItem('access_token');
      }

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.delete(`${API_URL}/api/classify/histories/${historyId}`, {
        headers
      });
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteAllHistory: async (token = null) => {
    try {
      if (token === null) {
        token = localStorage.getItem('access_token');
      }

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.delete(`${API_URL}/api/classify/histories`, {
        headers
      });
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};