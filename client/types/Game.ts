export interface Game {
  _id: string;
  id: string;
  background_image: string;
  metacritic: number;
  name: string;
  released: string;
  developers: Developer[];
  genres: Genre[];
  platforms: Platform[];
  description: string;
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
