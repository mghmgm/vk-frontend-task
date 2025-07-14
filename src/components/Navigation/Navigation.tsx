import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const pages = [
  {title: 'Фильмы', url: '/movies'},
  {title: 'Избранное', url: '/favorites'}
]

function Navigation() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Link
              key={page.title}
              sx={{
                my: 2,
                mx: 2,
                color: 'white',
                display: 'block',
                '&:hover': {
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              href={page.url}
            >
              <Typography variant="h6" color="white">
                {page.title}
              </Typography>
            </Link>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
}
export default Navigation;
