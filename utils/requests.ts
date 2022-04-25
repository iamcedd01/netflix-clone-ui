import config from 'config'

const { apiKey, apiBaseUrl } = config

const requests = {
  fetchTrending: `${apiBaseUrl}/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchNetflixOriginals: `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_networks=213`,
  fetchTopRated: `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
  fetchActionMovies: `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=99`,
}

export default requests
