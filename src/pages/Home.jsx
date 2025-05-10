import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
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

      <MovieList movies={movies} />

      <TrendingMovies />
    </Container>
  );
}

export default Home;
