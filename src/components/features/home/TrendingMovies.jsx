import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {
  Box,
  Grid,
  Typography
} from "@mui/material";

function TrendingMovies() {
  const [trending, setTrending] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setTrending(res.data.results);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Trending Movies
        </Typography>
        <Grid container spacing={3}>
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default TrendingMovies;
