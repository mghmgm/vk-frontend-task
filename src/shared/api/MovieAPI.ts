import type { AxiosResponse } from "axios"
import { api } from "./config"
import type { IMovieResponse } from "../types/types"

export class MovieAPI  {
  static async getMovies (limit: number, page:number): Promise<AxiosResponse<IMovieResponse>> {
    const response = await api.get('/movie', {
      params: {
        limit: limit,
        page: page,
      }
    })
    return response.data
  }
}