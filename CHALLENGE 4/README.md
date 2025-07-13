# 🎙️ Podcast Explorer

A modern, responsive React application for discovering, searching, and filtering podcasts by genre, popularity, and more. Podcasts are fetched live from a public API, and the interface is designed for ease of use and a great user experience.

---

## 🚀 Features

- **Live Podcast Data:** Fetches and displays up-to-date podcasts from a remote API.
- **Search:** Instantly search podcasts by title.
- **Genre Filtering:** Filter podcasts by a wide range of genres.
- **Sorting:** Sort podcasts by most recent, most popular, newest, or alphabetically.
- **Pagination:** Load more podcasts as you scroll.
- **Responsive UI:** Clean, modern design that works on all devices.
- **Persistent Filters:** Your search, genre, and sort preferences are saved between sessions.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository** (if you haven't already):
   ```sh
   git clone <your-repo-url>
   cd ASAMKH25103_FTO2502_GroupA_Asanda-Mkhize_DJS04/CHALLENGE 4
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install FontAwesome packages** (required for icons):
   ```sh
   npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
   ```

---

## 🏃 Running the App

Start the development server:
```sh
npm run dev
```
- The terminal will display a local address (e.g., `http://localhost:5173`).  
- Open this URL in your browser to use the app.

---

## 🖱️ How to Use

- **Search:** Click the magnifying glass icon in the header to reveal the search bar. Type to filter podcasts by title.
- **Filter by Genre:** Use the "Filter by" dropdown to select a genre.
- **Sort:** Use the sort dropdown to order podcasts by recent updates, popularity, newest, or title.
- **Load More:** Click "Load More" at the bottom to see additional podcasts.
- **Persistent Preferences:** Your search, genre, and sort choices are saved automatically and restored on your next visit.

---

## 🧩 Project Structure

```
src/
  api/            # API calls (fetchPodcasts.js)
  assets/         # Static assets (e.g., images)
  components/     # React components (Header, PodcastCard, PodcastGrid)
  utils/          # Utility functions (formatDate.js)
  data.js         # Genre data
  App.jsx         # Main app logic
  index.css       # Styles
  main.jsx        # Entry point
```

---

## 🌐 Data Source

Podcasts are fetched from:  
[https://podcast-api.netlify.app/shows](https://podcast-api.netlify.app/shows)

Genres are defined locally in `src/data.js`.

---

## 📝 Customization

- **Add new genres:** Edit `src/data.js`.
- **Change styles:** Edit `src/index.css`.
- **API logic:** See `src/api/fetchPodcasts.js`.

---

## ❓ Troubleshooting

- **FontAwesome Import Error:**  
  If you see an error about `@fortawesome/react-fontawesome`, make sure you ran:
  ```sh
  npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
  ```

- **Port Already in Use:**  
  If `npm run dev` fails due to a port conflict, either close the other app or change the port in `vite.config.js`.

---

## 📄 License

This project is for educational purposes.

---
