import { type FC } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import type { IMovie } from '../../shared/types/types'

interface MoviesListProps {
  movies: IMovie[],
}

const MoviesList: FC<MoviesListProps> = ({movies}) => {
  return (
    <section>
      {movies.map(movie=>
        <MovieCard movie={movie} />
      )}
    </section>
  )
}

export default MoviesList
