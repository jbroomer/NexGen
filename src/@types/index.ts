export enum TVShowListTypes {
  TOP_RATED = 'top_rated',
  POPULAR = 'popular',
  CUSTOM = 'custom',
}

export interface TVShowResults {
  backdrop_path?: string;
  first_air_date: string;
  genre_ids: string[];
  id: number;
  name: string;
  origin_country: string[];
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_count: number;
  vote_average: number;
}

export type TVSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export interface TVShowDetails extends TVShowResults {
  homepage: string;
  languages: string[];
  last_air_date: string;
  in_production: boolean;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  seasons: TVSeason[];
}

export type GetTVShowsResponse = {
  page: number;
  results: TVShowResults[];
  total_results: number;
  total_pages: number;
};

export type FilteredTVShowResults = {
  id: number;
  name: string;
  imgPath: string;
  year: string;
  popularity: number;
  overview: string;
};
