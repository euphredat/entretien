import axios from 'axios';

export const fetchCountries = async (search = '') => {
  const url = search
    ? `https://restcountries.com/v3.1/name/${search}`
    : 'https://restcountries.com/v3.1/all';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return []; // Retourne un tableau vide en cas d’erreur
  }
};