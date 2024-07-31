// gallery.js
const gallery = document.getElementById('gallery');
let page = 1;
const apiKey = '1ae488689dd020d3e2f10d0ec5e09eae'; // Replace with your actual TMDb API key
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=`;

async function fetchMovies(page) {
    try {
        const response = await fetch(apiUrl + page);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

function createGalleryItem(movie) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder.jpg'; // Use a placeholder if no poster is available
    img.alt = movie.title;

    galleryItem.appendChild(img);
    return galleryItem;
}

async function loadMovies() {
    const movies = await fetchMovies(page);
    if (movies.length === 0) {
        console.log('No more movies to load');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.innerText = 'No more movies to load';
        }
        return;
    }
    movies.forEach(movie => {
        const galleryItem = createGalleryItem(movie);
        gallery.appendChild(galleryItem);
    });
    page++;
}

function createLoadMoreButton() {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'loadMoreBtn';
    loadMoreBtn.className = 'load-more';
    loadMoreBtn.innerText = 'Load More';
    loadMoreBtn.addEventListener('click', () => {
        loadMovies();
    });
    gallery.parentElement.appendChild(loadMoreBtn);
}

// Initial load
loadMovies().then(() => {
    createLoadMoreButton();
});
