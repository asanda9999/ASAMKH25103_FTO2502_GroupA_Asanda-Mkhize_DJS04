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


  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);



  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // Filter podcasts by search query (case-insensitive, matches any part of the title)
  let filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(search.toLowerCase())
  );


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
