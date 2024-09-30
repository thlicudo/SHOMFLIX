import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies";
import MoviePage from "./pages/MoviePage";
import SeriesPage from "./pages/SeriesPage";
import ScrollToTop from "./utilities/ScrollToTop";
import SearchResults from "./pages/SearchResults";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header setQuery={setQuery} query={query} />
      <SearchResults query={query} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home query={query} />} />
        <Route path="/movies" element={<Movies query={query} />} />
        <Route path="/tv" element={<TvShows query={query} />} />
        <Route path="/movies/:id" element={<MoviePage query={query} />} />
        <Route path="/tv/:id" element={<SeriesPage query={query} />} />
      </Routes>
    </>
  );
}

export default App;
