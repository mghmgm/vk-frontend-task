import type { AxiosResponse } from 'axios';
import { api } from './config';
import type { IMovie, IMovieResponse } from '../types/types';

export class MovieAPI {
  static async getMovies(limit: number, page: number): Promise<AxiosResponse<IMovieResponse>> {
    const response = await api.get('/movie', {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data;
  }

  static async getMovieById(id: string): Promise<AxiosResponse<IMovie>> {
    return await api.get(`/movie/${id}`);
  }
}
