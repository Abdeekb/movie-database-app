// src/services/api.js
const API_KEY = "4fd253ca";
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Search for movies by title
 * @param {string} query - Movie title to search for
 * @param {number} page - Page number for results (default: 1)
 * @returns {Promise} Promise object with search results
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
        query
      )}&page=${page}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movies");
    }
    
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

/**
 * Get detailed information for a specific movie by its IMDB ID
 * @param {string} imdbId - The IMDB ID of the movie
 * @returns {Promise} Promise object with detailed movie information
 */
export const getMovieDetails = async (imdbId) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movie details");
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};