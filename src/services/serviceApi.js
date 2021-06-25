const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '9eb68654328fd919bdc653b630f178ca';

const fetchRequest = async (path, config = '') => {
  const response = await fetch(`${BASE_URL}${path}?api_key=${KEY}${config}`);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
};

const getPopular = page => {
  return fetchRequest('/trending/all/day', `&page=${page}`);
};

const searchMovies = (request, page) => {
  return fetchRequest(
    '/search/movie',
    `&language=en-US&query=${request}&page=${page}&include_adult=false`,
  );
};

const getMovieDetails = movieId => {
  return fetchRequest(`/movie/${movieId}`, `&language=en-US`);
};

const getCastList = movieId => {
  return fetchRequest(`/movie/${movieId}/credits`, `&language=en-US`);
};

const getReviews = (movieId, page) => {
  return fetchRequest(
    `/movie/${movieId}/reviews`,
    `&language=en-US&page=${page}`,
  );
};

export { getPopular, searchMovies, getMovieDetails, getCastList, getReviews };
    
    
