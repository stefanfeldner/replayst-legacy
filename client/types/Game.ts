export interface Game {
  _id: string;
  id: number;
  background_image: string;
  metacritic: number;
  name: string;
  released: string;
  developers?: Developer[];
  genres?: Genre[];
  platforms?: Platform[];
  description?: string;
}

interface Developer {
  id: number;
  _id: string;
  name: string;
  slug: string;
}

interface Genre {
  id: number;
  _id: string;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Platforms {
  platform: Platform;
  released_at: string;
  requirements_en: string | null;
  requirements_ru: string | null;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: string | null;
  year_start: string | null;
  games_count: number;
  image_background: string;
}

export interface SearchResultType {
  count: number;
  next: string;
  previous: string | null;
  results: Game[];
  user_platforms: boolean;
}

export interface SearchResultsInfiniteScrollRes {
  next: string;
  results: Game[];
}

export interface FetchResult {
  count: number;
  description: string;
  filters: Year[];
  next: string;
  nofollow: boolean;
  nofollow_collections: string[];
  noindex: boolean;
  previous: string | null;
  results: Game[];
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
}

interface Year {
  count: number;
  decade: number;
  filter: string;
  from: number;
  nofollow: boolean;
  to: number;
}
