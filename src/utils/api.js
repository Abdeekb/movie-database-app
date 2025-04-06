// src/utils/api.js
const API_KEY = 'your_api_key'; // غادي تبدلو بمفتاحك

export const fetchMovies = async (query) => {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
};
