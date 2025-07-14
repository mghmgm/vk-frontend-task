export interface IMovieResponse {
  docs: IMovie[],
  limit: number,
  page: number,
  pages: number,
  total: number,
}

interface IPoster {
  url: string,
  previewUrl: string,
}

interface IGenre {
  name: string,
}

interface IRating {
  kp: number;
  imdb: number;      
  tmdb?: number; 
  filmCritics?: number;
  russianFilmCritics?: number;
  await?: number;
}

export interface IMovie {
  id: number,
  name: string,
  alternativeName: string,
  poster?: IPoster,
  description: string,
  genres: IGenre[],
  rating: IRating,
  year: number,
}