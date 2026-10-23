// script.js

// ----- 1. MOVIE DATA (completely customizable) -----
// You can add as many movies as you like. Just copy a block and change the fields.
// Categories are auto-generated from the `genre` field of each movie.

const allMovies = [
  // --- Trending now (first 12 will be picked for trending, but we use a separate array for clarity) ---
  // We'll define two separate arrays for the two grids to make it easier to manage.
];

// We define separate arrays for each section to allow complete freedom.

// Trending now movies (first grid)
const trendingMovies = [
  { title: "The Last Horizon", year: 2025, genre: "Sci-Fi", rating: 8.7, badge: "4K ULTRA", icon: "fa-film" },
  { title: "Silent Verdict", year: 2024, genre: "Thriller", rating: 9.1, badge: "HDR", icon: "fa-mask" },
  { title: "Paris in Spring", year: 2025, genre: "Romance", rating: 7.9, badge: "NEW", icon: "fa-heart" },
  { title: "The Hollow House", year: 2024, genre: "Horror", rating: 8.2, badge: "EXCLUSIVE", icon: "fa-ghost" },
  { title: "Kingdom of Ash", year: 2025, genre: "Fantasy", rating: 8.9, badge: "FANTASY", icon: "fa-dragon" },
  { title: "Office Chaos", year: 2024, genre: "Comedy", rating: 7.5, badge: "COMEDY", icon: "fa-laugh" },
  { title: "Dirty Money", year: 2025, genre: "Crime", rating: 8.4, badge: "CRIME", icon: "fa-user-secret" },
  { title: "Robo & Friends", year: 2024, genre: "Animation", rating: 8.8, badge: "ANIMATION", icon: "fa-child" },
  { title: "Quantum Break", year: 2025, genre: "Sci-Fi", rating: 9.0, badge: "SCI-FI", icon: "fa-rocket" },
  { title: "The Last Letter", year: 2024, genre: "Drama", rating: 8.3, badge: "DRAMA", icon: "fa-heartbeat" },
  { title: "Blue Planet", year: 2025, genre: "Documentary", rating: 8.6, badge: "DOC", icon: "fa-globe" },
  { title: "Rogue Mission", year: 2024, genre: "Action", rating: 8.1, badge: "ACTION", icon: "fa-skull" },
  // Extra slots for you to add more:
  { title: "Midnight Heist", year: 2025, genre: "Action", rating: 8.3, badge: "HEIST", icon: "fa-user-secret" },
  { title: "Echoes of Mars", year: 2025, genre: "Sci-Fi", rating: 8.9, badge: "MARS", icon: "fa-rocket" },
  { title: "The Crimson Door", year: 2024, genre: "Horror", rating: 8.0, badge: "DOOR", icon: "fa-ghost" },
  { title: "Laughing Out Loud", year: 2025, genre: "Comedy", rating: 7.8, badge: "LOL", icon: "fa-laugh" },
  { title: "Whispers in Rome", year: 2024, genre: "Romance", rating: 8.4, badge: "ROME", icon: "fa-heart" },
  { title: "The Last Samurai", year: 2025, genre: "Action", rating: 9.2, badge: "EPIC", icon: "fa-skull" },
];

// New releases movies (second grid)
const newReleasesMovies = [
  { title: "Dark Waters", year: 2025, genre: "Mystery", rating: 7.8, badge: "NEW", icon: "fa-film" },
  { title: "The Watcher", year: 2025, genre: "Thriller", rating: 8.5, badge: "THRILLER", icon: "fa-mask" },
  { title: "Crown of Thorns", year: 2024, genre: "Fantasy", rating: 8.2, badge: "FANTASY", icon: "fa-dragon" },
  { title: "Vacation Mode", year: 2025, genre: "Comedy", rating: 7.4, badge: "COMEDY", icon: "fa-laugh" },
  { title: "Letters to June", year: 2024, genre: "Romance", rating: 8.0, badge: "ROMANCE", icon: "fa-heart" },
  { title: "The Attic", year: 2025, genre: "Horror", rating: 7.9, badge: "HORROR", icon: "fa-ghost" },
  // Extra slots:
  { title: "Neon Shadows", year: 2025, genre: "Sci-Fi", rating: 8.7, badge: "NEON", icon: "fa-rocket" },
  { title: "Puppy Love", year: 2024, genre: "Comedy", rating: 7.2, badge: "LOVE", icon: "fa-laugh" },
  { title: "The Devil's Advocate", year: 2025, genre: "Drama", rating: 8.6, badge: "DRAMA", icon: "fa-heartbeat" },
  { title: "Galaxy Quest", year: 2024, genre: "Sci-Fi", rating: 8.1, badge: "GALAXY", icon: "fa-rocket" },
  { title: "The Silence", year: 2025, genre: "Thriller", rating: 8.3, badge: "SILENCE", icon: "fa-mask" },
];

// Continue watching items
const continueWatchingList = [
  { title: "Neon Shadows", progress: 75, timeLeft: "1h left", icon: "fa-play" },
  { title: "Echoes of Mars", progress: 32, timeLeft: "1h 48m left", icon: "fa-play" },
  { title: "Midnight Heist", progress: 90, timeLeft: "12m left", icon: "fa-play" },
  { title: "Puppy Love", progress: 45, timeLeft: "52m left", icon: "fa-play" },
  { title: "The Last Horizon", progress: 60, timeLeft: "1h 10m left", icon: "fa-play" },
  { title: "Silent Verdict", progress: 15, timeLeft: "2h 5m left", icon: "fa-play" },
];

// ----- 2. CATEGORIES (auto-generated from all movies) -----
function getAllUniqueGenres() {
  const genres = new Set();
  [...trendingMovies, ...newReleasesMovies].forEach(movie => {
    if (movie.genre) genres.add(movie.genre);
  });
  return Array.from(genres).sort();
}

// Icons mapping for genres (for the chip icons)
const genreIcons = {
  "Action": "fa-skull",
  "Comedy": "fa-laugh",
  "Romance": "fa-heart",
  "Sci-Fi": "fa-rocket",
  "Horror": "fa-ghost",
  "Thriller": "fa-mask",
  "Animation": "fa-child",
  "Fantasy": "fa-dragon",
  "Crime": "fa-user-secret",
  "Documentary": "fa-globe",
  "Drama": "fa-heartbeat",
  "Mystery": "fa-search",
};

// ----- 3. RENDER FUNCTIONS -----

function renderCategories() {
  const categoryBar = document.getElementById('categoryBar');
  if (!categoryBar) return;

  const genres = getAllUniqueGenres();
  // Start with "All" chip
  let html = `<div class="category-chip active" data-genre="all"><i class="fas fa-layer-group"></i> All</div>`;
  genres.forEach(genre => {
    const iconClass = genreIcons[genre] || 'fa-tag';
    html += `<div class="category-chip" data-genre="${genre}"><i class="fas ${iconClass}"></i> ${genre}</div>`;
  });
  categoryBar.innerHTML = html;

  // Add click listeners to chips
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      // Remove active class from all chips
      document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const genre = this.dataset.genre;
      filterMoviesByGenre(genre);
    });
  });
}

function filterMoviesByGenre(genre) {
  // If "all", show all movies in both grids
  if (genre === 'all') {
    renderTrendingGrid(trendingMovies);
    renderNewReleasesGrid(newReleasesMovies);
    return;
  }

  // Filter both arrays by genre
  const filteredTrending = trendingMovies.filter(m => m.genre === genre);
  const filteredNew = newReleasesMovies.filter(m => m.genre === genre);

  renderTrendingGrid(filteredTrending);
  renderNewReleasesGrid(filteredNew);
}

function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <div class="poster">
        <i class="fas ${movie.icon || 'fa-film'}"></i>
        <div class="badge">${movie.badge || 'HD'}</div>
        <div class="rating"><i class="fas fa-star"></i> ${movie.rating}</div>
      </div>
      <div class="movie-info">
        <div class="movie-title" title="${movie.title}">${movie.title}</div>
        <div class="movie-meta">
          <span>${movie.year}</span>
          <span class="genre-tag">${movie.genre}</span>
        </div>
      </div>
    </div>
  `;
}

function renderTrendingGrid(movies) {
  const grid = document.getElementById('trendingGrid');
  if (!grid) return;
  if (movies.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#8f9bb3;">No movies in this category yet.</div>`;
    return;
  }
  grid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}

function renderNewReleasesGrid(movies) {
  const grid = document.getElementById('newReleasesGrid');
  if (!grid) return;
  if (movies.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#8f9bb3;">No movies in this category yet.</div>`;
    return;
  }
  grid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}

function renderContinueWatching() {
  const container = document.getElementById('continueScroll');
  if (!container) return;

  container.innerHTML = continueWatchingList.map(item => `
    <div class="continue-card">
      <div class="continue-poster"><i class="fas ${item.icon || 'fa-play'}"></i></div>
      <div class="continue-info">
        <h4>${item.title}</h4>
        <div class="progress-bar"><div class="progress-fill" style="width: ${item.progress}%"></div></div>
        <span style="font-size:0.7rem; color:#8f9bb3;">${item.progress}% · ${item.timeLeft}</span>
      </div>
    </div>
  `).join('');
}

// ----- 4. INITIALIZATION -----
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderTrendingGrid(trendingMovies);
  renderNewReleasesGrid(newReleasesMovies);
  renderContinueWatching();
});