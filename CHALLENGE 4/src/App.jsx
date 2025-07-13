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
  // --- STATE MANAGEMENT ---
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(() => getPersisted("search", ""));
  const [selectedGenre, setSelectedGenre] = useState(() => getPersisted("selectedGenre", "all"));
  const [sortBy, setSortBy] = useState(() => getPersisted("sortBy", "recent"));
  const [page, setPage] = useState(1);
  const PODCASTS_PER_PAGE = 8;

  // --- PERSIST STATE TO LOCALSTORAGE ---
  // Save search, genre, and sortBy to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);
  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);
  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  // --- RESET PAGE ON FILTER/SORT/SEARCH CHANGE ---
  useEffect(() => {
    setPage(1);
  }, [search, selectedGenre, sortBy]);

  // --- FETCH PODCAST DATA ON MOUNT ---
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // --- FILTERING LOGIC ---
  // Filter podcasts by search query (case-insensitive, matches any part of the title)
  let filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(search.toLowerCase())
  );

  // Further filter by selected genre (if not 'all')
  if (selectedGenre !== "all") {
    filteredPodcasts = filteredPodcasts.filter(podcast =>
      podcast.genres.includes(Number(selectedGenre))
    );
  }

  // --- SORTING LOGIC ---
  // Define sort functions for each sort option
  const sortFunctions = {
    recent: (a, b) => new Date(b.updated) - new Date(a.updated), // Most recently updated first
    popular: (a, b) => (b.seasons || 0) - (a.seasons || 0),     // Most seasons first
    newest: (a, b) => b.id.localeCompare(a.id),                 // Newest by ID
    "title-asc": (a, b) => a.title.localeCompare(b.title),     // Title A-Z
    "title-desc": (a, b) => b.title.localeCompare(a.title),    // Title Z-A
  };

  // Sort the filtered podcasts
  const sortedPodcasts = filteredPodcasts.slice().sort(
    sortFunctions[sortBy] || (() => 0)
  );

  // --- PAGINATION LOGIC ---
  // Only show podcasts for the current page
  const visiblePodcasts = sortedPodcasts.slice(0, page * PODCASTS_PER_PAGE);
  const hasMore = sortedPodcasts.length > visiblePodcasts.length;

  // --- RENDER ---
  return (
    <>
      {/* Header with search bar */}
      <Header search={search} setSearch={setSearch} />
      {/* Filter and sort controls */}
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
        {/* Loading spinner */}
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

        {/* Main podcast grid and Load More button */}
        {!loading && !error && (
          <>
            <PodcastGrid podcasts={visiblePodcasts} genres={genres} />
            {hasMore && (
              <div className="load-more-container">
                {/* Load More button increments the page to show more podcasts */}
                <button className="load-more-btn" onClick={() => setPage(page + 1)}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
