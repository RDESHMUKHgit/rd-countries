import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

export const getAllCountries = async () => {
  try {
    const response = await api.get(
      '/all?fields=name,capital,region,population,flags,cca3'
    );
    console.log(response.data);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export default api;
