const searchBtn = document.getElementById('searchBtn');
const searchBtnMain = document.getElementById('searchBtnMain');
const movieInput = document.getElementById('movieInput');
const movieInputMain = document.getElementById('movieInputMain');
const movieResults = document.getElementById('movieResults');
const randomMoviesGrid = document.getElementById('randomMovies');
const trendingMoviesGrid = document.getElementById('trendingMovies');
const carMoviesGrid = document.getElementById('carMovies');
const cartoonMoviesGrid = document.getElementById('cartoonMovies');
const actionMoviesGrid = document.getElementById('actionMovies');
const scifiMoviesGrid = document.getElementById('scifiMovies');

const popularMovies = [
    'Avengers: Endgame', 'Spider-Man: No Way Home', 'The Batman',
    'Top Gun: Maverick', 'Black Panther', 'John Wick',
    'The Dark Knight', 'Inception', 'Interstellar', 'The Matrix',
    'Joker', 'Dune', 'The Shawshank Redemption', 'Pulp Fiction', 'Fight Club'
];

const trendingMovies = [
    'Oppenheimer', 'Barbie', 'The Flash', 'Guardians of the Galaxy Vol 3',
    'Ant-Man and the Wasp: Quantumania', 'Avatar: The Way of Water',
    'Black Adam', 'Everything Everywhere All at Once', 'The Whale', 'Elvis',
    'Top Gun: Maverick', 'Spider-Man: Across the Spider-Verse', 'The Batman',
    'Doctor Strange in the Multiverse of Madness', 'Thor: Love and Thunder'
];

const carMovies = [
    'Fast & Furious', 'Ford v Ferrari', 'Baby Driver', 'Drive', 
    'Mad Max: Fury Road', 'The Transporter', 'Gone in 60 Seconds', 
    'Bullitt', 'Rush', 'Need for Speed', 'Death Race', 'The Italian Job',
    'Speed', 'The Fast and the Furious: Tokyo Drift', 'Cars'
];

const cartoonMovies = [
    'Spider-Man: Into the Spider-Verse', 'The Lion King', 'Frozen',
    'Toy Story', 'Finding Nemo', 'Shrek', 'Zootopia', 'The Incredibles',
    'Moana', 'Coco', 'Despicable Me', 'How to Train Your Dragon',
    'The Super Mario Bros Movie', 'Puss in Boots: The Last Wish', 'Encanto'
];

const actionMovies = [
    'John Wick: Chapter 4', 'Mission: Impossible', 'The Bourne Identity',
    'Die Hard', 'Taken', 'The Raid', 'Kill Bill', 'Gladiator', '300',
    'The Expendables', 'Atomic Blonde', 'Nobody', 'The Equalizer',
    'Extraction', 'Mad Max: Fury Road'
];

const scifiMovies = [
    'Dune: Part Two', 'The Matrix', 'Blade Runner 2049', 'Arrival',
    'Interstellar', 'The Martian', 'Star Wars: The Force Awakens',
    'Avatar', 'Guardians of the Galaxy', 'The Fifth Element',
    'Edge of Tomorrow', 'Tenet', 'Inception', 'The Terminator', 'Back to the Future'
];

searchBtn.addEventListener('click', handleSearch);
searchBtnMain.addEventListener('click', handleSearch);
movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
movieInputMain.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    await loadRandomMovies();
    await loadTrendingMovies();
    await loadCarMovies();
    await loadCartoonMovies();
    await loadActionMovies();
    await loadScifiMovies();
    initializeScrollButtons();
}

function initializeScrollButtons() {
    document.querySelectorAll('.movies-scroll-wrapper').forEach(wrapper => {
        const scrollElement = wrapper.querySelector('.movies-scroll');
        const leftBtn = wrapper.querySelector('.left-btn');
        const rightBtn = wrapper.querySelector('.right-btn');
        
        const updateButtonStates = () => {
            const scrollLeft = scrollElement.scrollLeft;
            const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
            
            leftBtn.disabled = scrollLeft <= 10;
            rightBtn.disabled = scrollLeft >= maxScroll - 10;
            
            leftBtn.style.opacity = scrollLeft <= 10 ? '0.3' : '1';
            rightBtn.style.opacity = scrollLeft >= maxScroll - 10 ? '0.3' : '1';
        };
        
        leftBtn.addEventListener('click', () => {
            scrollElement.scrollBy({ left: -400, behavior: 'smooth' });
            setTimeout(updateButtonStates, 300);
        });
        
        rightBtn.addEventListener('click', () => {
            scrollElement.scrollBy({ left: 400, behavior: 'smooth' });
            setTimeout(updateButtonStates, 300);
        });
        
        scrollElement.addEventListener('scroll', updateButtonStates);
        updateButtonStates();
    });
}

async function loadRandomMovies() {
    randomMoviesGrid.innerHTML = '<div class="loading">Loading your movies...</div>';
    const shuffled = [...popularMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    await renderMovieGrid(selected, randomMoviesGrid);
}

async function loadTrendingMovies() {
    trendingMoviesGrid.innerHTML = '<div class="loading">Loading trending movies...</div>';
    const shuffled = [...trendingMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    await renderMovieGrid(selected, trendingMoviesGrid);
}

async function loadCarMovies() {
    carMoviesGrid.innerHTML = '<div class="loading">Loading speed movies...</div>';
    const shuffled = [...carMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    await renderMovieGrid(selected, carMoviesGrid);
}

async function loadCartoonMovies() {
    cartoonMoviesGrid.innerHTML = '<div class="loading">Loading family movies...</div>';
    const shuffled = [...cartoonMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    await renderMovieGrid(selected, cartoonMoviesGrid);
}

async function loadActionMovies() {
    actionMoviesGrid.innerHTML = '<div class="loading">Loading action movies...</div>';
    const shuffled = [...actionMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    await renderMovieGrid(selected, actionMoviesGrid);
}

async function loadScifiMovies() {
    scifiMoviesGrid.innerHTML = '<div class="loading">Loading sci-fi movies...</div>';
    const shuffled = [...scifiMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    await renderMovieGrid(selected, scifiMoviesGrid);
}

async function renderMovieGrid(movieTitles, container) {
    container.innerHTML = '';
    const moviePromises = movieTitles.map(title => fetchMovieData(title));
    const movies = await Promise.all(moviePromises);
    const validMovies = movies.filter(movie => movie?.Response === "True");
    
    if (validMovies.length === 0) {
        container.innerHTML = '<div class="error-message">Failed to load movies</div>';
        return;
    }
    
    validMovies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    
    card.innerHTML = `
        <img 
            src="${movie.Poster !== 'N/A' ? movie.Poster : getPlaceholderImage(movie.Title)}" 
            alt="${movie.Title} poster"
            loading="lazy"
            onerror="this.src='${getPlaceholderImage(movie.Title)}'"
        >
        <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        const searchInput = movieInputMain || movieInput;
        searchInput.value = movie.Title;
        handleSearch();
    });
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchInput = movieInputMain || movieInput;
            searchInput.value = movie.Title;
            handleSearch();
        }
    });
    
    return card;
}

async function handleSearch() {
    const searchInput = movieInputMain || movieInput;
    const query = searchInput.value.trim();
    if (!query) {
        showError('Please enter a movie title');
        return;
    }
    
    showLoading();
    
    try {
        const movie = await fetchMovieData(query);
        displayMovieResults(movie);
    } catch (error) {
        console.error('Search error:', error);
        showError('Failed to search for movie. Please try again.');
    }
}

async function fetchMovieData(title) {
    const apiKey = 'a833c3fc';
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    return await response.json();
}

function displayMovieResults(data) {
    if (data.Response === "True") {
        movieResults.innerHTML = createMovieDetailsHTML(data);
        movieResults.classList.add('active');
        movieResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        showError('Movie not found. Please try another title.');
    }
}

function createMovieDetailsHTML(movie) {
    return `
        <div class="movie-details">
            <img 
                src="${movie.Poster !== 'N/A' ? movie.Poster : getPlaceholderImage(movie.Title)}" 
                alt="${movie.Title} poster"
                class="movie-poster"
                onerror="this.src='${getPlaceholderImage(movie.Title)}'"
            >
            <div class="movie-info-large">
                <h2>${movie.Title} <span class="year">(${movie.Year})</span></h2>
                
                <div class="movie-meta">
                    ${movie.imdbRating !== 'N/A' ? `<span class="meta-item">⭐ ${movie.imdbRating}/10</span>` : ''}
                    ${movie.Runtime !== 'N/A' ? `<span class="meta-item">⏱️ ${movie.Runtime}</span>` : ''}
                    ${movie.Genre !== 'N/A' ? `<span class="meta-item">🎭 ${movie.Genre.split(',')[0]}</span>` : ''}
                    ${movie.Rated !== 'N/A' ? `<span class="meta-item">${movie.Rated}</span>` : ''}
                </div>
                
                ${movie.Plot !== 'N/A' ? `<p class="movie-plot">${movie.Plot}</p>` : ''}
                
                <div class="details-list">
                    ${movie.Director !== 'N/A' ? `<div class="detail-row"><i class="fas fa-user-tie"></i><div><strong>Director:</strong> ${movie.Director}</div></div>` : ''}
                    ${movie.Actors !== 'N/A' ? `<div class="detail-row"><i class="fas fa-users"></i><div><strong>Cast:</strong> ${movie.Actors}</div></div>` : ''}
                    ${movie.Genre !== 'N/A' ? `<div class="detail-row"><i class="fas fa-film"></i><div><strong>Genre:</strong> ${movie.Genre}</div></div>` : ''}
                    ${movie.Language !== 'N/A' ? `<div class="detail-row"><i class="fas fa-globe"></i><div><strong>Language:</strong> ${movie.Language}</div></div>` : ''}
                    ${movie.Awards !== 'N/A' ? `<div class="detail-row"><i class="fas fa-award"></i><div><strong>Awards:</strong> ${movie.Awards}</div></div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function showLoading() {
    movieResults.innerHTML = '<div class="loading">Searching for movies...</div>';
    movieResults.classList.add('active');
}

function showError(message) {
    movieResults.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
    movieResults.classList.add('active');
}

function getPlaceholderImage(title) {
    const colors = ['1a1a1a', '2d2d2d', '3a3a3a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `https://via.placeholder.com/300x450/${color}/10B981?text=${encodeURIComponent(title)}`;
}

[searchBtn, searchBtnMain].forEach(btn => {
    btn.addEventListener('click', function() {
        const searchInput = movieInputMain || movieInput;
        if (searchInput.value.trim()) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

window.addEventListener('load', () => {
    movieInputMain.focus();
});