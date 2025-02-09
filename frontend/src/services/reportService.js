import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchReportData = async () => {
  const response = await axios.get(`${API_URL}/data`);
  return response.data;
};
