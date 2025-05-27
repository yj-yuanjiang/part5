/* jshint esversion: 6 */
// Define a Movie class with ID, title, year, and rating
class Movie {
  constructor(id, title, year, rating) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

// Initialize movie list with mock data
let movies = [
  new Movie(204, "Echoes of Tomorrow", 2022, 7.8),
  new Movie(109, "Midnight Code", 2019, 6.9),
  new Movie(317, "Whispers in the Dark", 2021, 7.2),
  new Movie(143, "Digital Eden", 2020, 8.1),
  new Movie(276, "The Forgotten Protocol", 2023, 6.7),
  new Movie(190, "Chrono Trap", 2018, 7.0),
  new Movie(221, "Neon Horizon", 2017, 7.4),
  new Movie(162, "Binary Lies", 2019, 6.8),
  new Movie(388, "Shadow Firewall", 2020, 7.5),
  new Movie(135, "Signal Lost", 2016, 7.3),
];

// Add a new movie from form inputs
function addMovie() {
  const id = parseInt(document.getElementById("movieId").value);
  const title = document.getElementById("movieTitle").value;
  const year = parseInt(document.getElementById("movieYear").value);
  const rating = parseFloat(document.getElementById("movieRating").value);

  // Check for duplicate movie ID
  if (movies.find(m => m.id === id)) {
    alert("Movie ID already exists!");
    return;
  }

  // Validate inputs
  if (!title || isNaN(id) || isNaN(year) || isNaN(rating)) {
    alert("Please enter valid movie data.");
    return;
  }

  const movie = new Movie(id, title, year, rating);
  movies.push(movie);
  alert("Movie added successfully!");
}

// Render movie list to HTML
function refreshMovieList() {
  const list = document.getElementById("movieList");
  list.innerHTML = "";
  movies.forEach(movie => {
    const item = document.createElement("li");
    item.textContent = `${movie.id} - ${movie.title} (${movie.year}) Rating: ${movie.rating}`;
    list.appendChild(item);
  });
}

// Sort movies alphabetically (A-Z)
function sortAZ() {
  movies.sort((a, b) => a.title.localeCompare(b.title));
  refreshMovieList();
}

// Sort movies in reverse alphabetical order (Z-A)
function sortZA() {
  movies.sort((a, b) => b.title.localeCompare(a.title));
  refreshMovieList();
}

// Sort movies by rating in descending order
function sortByRating() {
  movies.sort((a, b) => b.rating - a.rating);
  refreshMovieList();
}

// Perform binary search by ID on a sorted array
function binarySearchMovieById(arr, targetId) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid].id === targetId) {
      return arr[mid];
    } else if (arr[mid].id < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null;
}

// Search movie by ID and display result
function searchMovieById() {
  const id = parseInt(document.getElementById("searchId").value);
  const resultList = document.getElementById("searchResult");
  resultList.innerHTML = "";

  const sortedMovies = [...movies].sort((a, b) => a.id - b.id);
  const result = binarySearchMovieById(sortedMovies, id);

  const item = document.createElement("li");
  item.textContent = result ?
    `${result.id} - ${result.title} (${result.year}) Rating: ${result.rating}`
    : "0 result";
  resultList.appendChild(item);
}

// Search movies by title keyword (case-insensitive)
function searchMovieByTitle() {
  const keyword = document.getElementById("searchTitle").value.toLowerCase();
  const results = movies
    .filter(movie => movie.title.toLowerCase().includes(keyword))
    .sort((a, b) => a.title.localeCompare(b.title));

  const resultList = document.getElementById("searchResult");
  resultList.innerHTML = "";

  if (results.length === 0) {
    const item = document.createElement("li");
    item.textContent = "0 result";
    resultList.appendChild(item);
    return;
  }

  results.forEach(movie => {
    const item = document.createElement("li");
    item.textContent = `${movie.id} - ${movie.title} (${movie.year}) Rating: ${movie.rating}`;
    resultList.appendChild(item);
  });
}

// Set current year dynamically in footer
document.getElementById('date').textContent = new Date().getFullYear();
