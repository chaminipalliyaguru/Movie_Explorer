import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
} from "@mui/material";
import TrendingMovies from "../components/features/home/TrendingMovies";
import MovieList from "../components/features/home/MovieList";
import SearchFilters from "../components/features/home/SearchFilters";

const API_KEY = import.meta.env.VITE_API_KEY;

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);

  const fetchMovies = async () => {
  try {
    let url = "";
    let params = {
      api_key: API_KEY,
    };

    if (search.length > 2) {
      // Use text search
      url = `https://api.themoviedb.org/3/search/movie`;
      params.query = search;
    } else {
      // Use filters
      url = `https://api.themoviedb.org/3/discover/movie`;
      if (genre) params.with_genres = genre;
      if (year) params.primary_release_year = year;
      if (rating > 0) params["vote_average.gte"] = rating;
    }

    const res = await axios.get(url, { params });
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <SearchFilters
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
      />

      <Typography variant="h5" gutterBottom>
        {search ? "Search Results" : "Popular Movies"}
      </Typography>

      <MovieList movies={movies} />   

      <TrendingMovies />

    </Container>
  );
}

export default Home;
