import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Container,
} from '@mui/material';

const API_KEY = 'YOUR_TMDB_API_KEY'; // 🔑 Replace with your TMDB API key

function Home (){
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);

  const fetchMovies = async (query) => {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    setMovies(res.data.results);
  };

  const fetchTrendingMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    setTrending(res.data.results);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Search for movies..."
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.length > 2) fetchMovies(e.target.value);
          }}
        />
      </Box>

      {/* Search Results */}
      {search && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Release Year: {movie.release_date?.slice(0, 4) || 'N/A'}
                    </Typography>
                    <Rating
                      value={(movie.vote_average / 2).toFixed(1)}
                      precision={0.1}
                      readOnly
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Trending Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Trending Movies
        </Typography>
        <Grid container spacing={3}>
          {trending.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Year: {movie.release_date?.slice(0, 4) || 'N/A'}
                  </Typography>
                  <Rating
                    value={(movie.vote_average / 2).toFixed(1)}
                    precision={0.1}
                    readOnly
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
