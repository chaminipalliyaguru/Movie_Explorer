import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
} from "@mui/material";
import TrendingMovies from "../components/features/home/TrendingMovies";

const API_KEY = import.meta.env.VITE_API_KEY;

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
 

  const fetchMovies = async (query) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
        },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error fetching searched movies:", err);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Search Bar */}
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Search for movies..."
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.length > 2) {
              fetchMovies(e.target.value);
            } else {
              setMovies([]);
            }
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
            {movies.map(renderMovieCard)}
          </Grid>
        </Box>
      )}

      {/* Trending Movies */}
      <TrendingMovies/>
    </Container>
  );
}

export default Home;
