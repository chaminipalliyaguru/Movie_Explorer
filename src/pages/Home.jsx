import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
} from "@mui/material";
import TrendingMovies from "../components/features/home/TrendingMovies";
import MovieCard from "../components/features/home/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;

const genreOptions = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  // Add more as needed
];

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: API_KEY,
          query: search || undefined,
          with_genres: genre || undefined,
          primary_release_year: year || undefined,
          "vote_average.gte": rating,
        },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem("lastSearch");
    if (savedSearch) {
      setSearch(savedSearch);
    }
  }, []);

  useEffect(() => {
    if (search.length > 2 || genre || year || rating > 0) {
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [search, genre, year, rating]);

  return (
    <Container maxWidth="lg">
      {/* Filters */}
      <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="Search for movies..."
          variant="outlined"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            localStorage.setItem("lastSearch", value);
          }}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            label="Genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {genreOptions.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Year"
          type="number"
          inputProps={{ min: 1900, max: new Date().getFullYear() }}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Min Rating</Typography>
          <Slider
            value={rating}
            onChange={(e, newVal) => setRating(newVal)}
            min={0}
            max={10}
            step={0.5}
            valueLabelDisplay="auto"
          />
        </Box>
      </Box>

      {/* Results */}
      {(search || genre || year || rating > 0) && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>
        </Box>
      )}

      {/* Trending */}
      <TrendingMovies />
    </Container>
  );
}

export default Home;
