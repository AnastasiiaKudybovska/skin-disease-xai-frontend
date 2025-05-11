import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const diagnosticService = {
  classifyImage: async (imageFile, token = null) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(`${API_URL}/api/classify/`, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};