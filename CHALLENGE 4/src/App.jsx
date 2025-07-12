import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * @returns {JSX.Element} The rendered application interface
 */

// Helper to get from localStorage or fallback
const getPersisted = (key, fallback) => localStorage.getItem(key) || fallback;

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(() => getPersisted("search", ""));
  const [selectedGenre, setSelectedGenre] = useState(() => getPersisted("selectedGenre", "all"));
  const [sortBy, setSortBy] = useState(() => getPersisted("sortBy", "recent"));
  const PODCASTS_PER_PAGE = 8;


  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);
  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);
  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // Filter podcasts by search query (case-insensitive, matches any part of the title)
  let filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(search.toLowerCase())
  );

    // Filter by genre
  if (selectedGenre !== "all") {
    filteredPodcasts = filteredPodcasts.filter(podcast =>
      podcast.genres.includes(Number(selectedGenre))
    );
  }

    const sortFunctions = {
    recent: (a, b) => new Date(b.updated) - new Date(a.updated),
    popular: (a, b) => (b.seasons || 0) - (a.seasons || 0),
    newest: (a, b) => b.id.localeCompare(a.id),
    "title-asc": (a, b) => a.title.localeCompare(b.title),
    "title-desc": (a, b) => b.title.localeCompare(a.title),
  };

    const sortedPodcasts = filteredPodcasts.slice().sort(
    sortFunctions[sortBy] || (() => 0)
  );

    // Pagination logic
  const visiblePodcasts = sortedPodcasts.slice(0, page * PODCASTS_PER_PAGE);
  const hasMore = sortedPodcasts.length > visiblePodcasts.length;


  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <section className="filter-section">
        <label htmlFor="genre-select">Filter by:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.title}</option>
          ))}
        </select>
        <select
          id="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="recent">Recently Updated</option>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </section>
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <PodcastGrid podcasts={visiblePodcasts} genres={genres} />
      
          </>
        )}
      </main>
    </>
  );
}
