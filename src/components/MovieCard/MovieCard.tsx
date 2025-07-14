import { type FC, useState, useEffect } from 'react';
import type { IMovie } from '../../src/shared/types/types';
import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material';
import FavoritesModal from '../FavoritesModal/FavoritesModal';

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(movie.id));
  }, [movie.id]);

  const handleToggleFavorite = (confirmed: boolean) => {
    if (!confirmed) {
      setModalOpen(false);
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie.id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    setModalOpen(false);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  };

  return (
    <>
      <Link href={`/movies/${movie.id}`} underline="none">
        <Card sx={{ width: 945 }}>
          <CardMedia
            component="img"
            height="140"
            image={movie.poster?.previewUrl}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography>
              {movie.name || movie.alternativeName} ({movie.year})
            </Typography>
            <Typography>Рейтинг: {movie.rating.imdb}</Typography>
          </CardContent>
          <CardActions>
            <Button 
              onClick={handleButtonClick} 
              color={isFavorite ? 'error' : 'primary'}
            >
              {isFavorite ? 'В избранном' : 'В избранное'}
            </Button>
          </CardActions>
        </Card>
      </Link>

      <FavoritesModal
        open={modalOpen}
        isFavorite={isFavorite}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleToggleFavorite(true)}
      />
    </>
  );
};

export default MovieCard;