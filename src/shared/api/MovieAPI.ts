import type { AxiosResponse } from 'axios';
import { api } from './config';
import type { IMovie, IMovieResponse } from '../types/types';

export class MovieAPI {
  static async getMovies(
    limit: number,
    page: number,
    filters?: {
      genres?: string[];
      minRating?: number;
      maxRating?: number;
      minYear?: number;
      maxYear?: number;
    }
  ): Promise<AxiosResponse<IMovieResponse>> {
    const params: Record<string, any> = {
      limit,
      page,
    };
    
    if (filters) {
      if (filters.genres?.length) {
        filters.genres.forEach(genre => {
          params['genres.name'] = `%2B${encodeURIComponent(genre)}`;
        });
      }

      if (filters.minRating || filters.maxRating) {
        const min = filters.minRating ?? 0;
        const max = filters.maxRating ?? 10;
        params['rating.imdb'] = `${min}-${max}`;
      }

      if (filters.minYear || filters.maxYear) {
        const min = filters.minYear ?? 1990;
        const max = filters.maxYear ?? new Date().getFullYear();
        params['year'] = `${min}-${max}`;
      }
    }

    return await api.get('/movie', { params });
  }

  static async getMovieById(id: string): Promise<AxiosResponse<IMovie>> {
    return await api.get(`/movie/${id}`);
  }

  static async getAvailableGenres(): Promise<AxiosResponse<string[]>> {
    return await api.get('/movie/possible-values-by-field?field=genres.name');
  }
}
