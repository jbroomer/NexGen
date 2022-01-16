import axios from 'axios';
import { TVShowListTypes, TVShowDetails, GetTVShowsResponse } from '../@types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6e8556079c0e1a842e60fdb88680228f';
const LANGUAGE = 'en-us';

export const getPreconfiguredShowList = async (
  listType: TVShowListTypes
): Promise<GetTVShowsResponse> =>
  (
    await axios.get(`${BASE_URL}/tv/${listType}`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
      },
    })
  ).data;

export const getCustomSearchResults = async (searchQuery: string): Promise<GetTVShowsResponse> =>
  (
    await axios.get('https://api.themoviedb.org/3/search/tv', {
      params: {
        query: searchQuery,
        language: LANGUAGE,
        api_key: API_KEY,
      },
    })
  ).data;

export const getTVShowDetails = async (tvShowId: number): Promise<TVShowDetails> =>
  (
    await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}`, {
      params: {
        api_key: API_KEY,
      },
    })
  ).data;

export const getEpisodeDetails = async (
  tvShowId: number,
  season: number,
  episode: number
): Promise<any> =>
  axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${season}/episode/${episode}`, {
    params: {
      api_key: API_KEY,
    },
  });
