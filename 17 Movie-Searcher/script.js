var API_KEY = 'API_Key';
var currentPage = 1;
var currentQuery = '';
var PLACEHOLDER_IMG = 'https://via.placeholder.com/300x420/1f2933/9ca3af?text=No+Poster';

var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');
var resultsEl = document.getElementById('results');
var messageEl = document.getElementById('message');
var loadMoreBtn = document.getElementById('loadMoreBtn');
var loadMoreWrap = document.getElementById('loadMoreWrap');

searchBtn.addEventListener('click', function() {
  searchMovies(1);
});

searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    searchMovies(1);
  }
});

loadMoreBtn.addEventListener('click', function() {
  searchMovies(currentPage + 1);
});

function searchMovies(page) {
  var query = searchInput.value.trim();
  if (query === '') {
    messageEl.textContent = 'Please enter a movie name.';
    resultsEl.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    return;
  }

  if (page === 1) {
    currentQuery = query;
    resultsEl.innerHTML = '';
  }

  if (query !== currentQuery) {
    currentQuery = query;
    page = 1;
    resultsEl.innerHTML = '';
  }

  currentPage = page;
  messageEl.textContent = 'Loading...';
  loadMoreBtn.style.display = 'none';

  var url = 'http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + encodeURIComponent(currentQuery) + '&page=' + page;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.Response === 'True') {
        var movies = data.Search;
        var totalResults = parseInt(data.totalResults);

        messageEl.textContent = '';

        for (var i = 0; i < movies.length; i++) {
          var card = createMovieCard(movies[i]);
          resultsEl.appendChild(card);
        }

        if (resultsEl.children.length < totalResults) {
          loadMoreBtn.style.display = 'inline-block';
        } else {
          loadMoreBtn.style.display = 'none';
        }
      } else {
        if (page === 1) {
          messageEl.textContent = 'No movies found. Try a different search.';
          resultsEl.innerHTML = '';
        }
        loadMoreBtn.style.display = 'none';
      }
    })
    .catch(function(error) {
      messageEl.textContent = 'Something went wrong. Please try again.';
      loadMoreBtn.style.display = 'none';
    });
}

function createMovieCard(movie) {
  var card = document.createElement('div');
  card.className = 'movie-card';
  card.setAttribute('data-imdb-id', movie.imdbID);

  var img = document.createElement('img');
  img.src = movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMG;
  img.alt = movie.Title;

  var info = document.createElement('div');
  info.className = 'movie-info';

  var title = document.createElement('h3');
  title.textContent = movie.Title;

  var year = document.createElement('p');
  year.textContent = movie.Year;

  info.appendChild(title);
  info.appendChild(year);
  card.appendChild(img);
  card.appendChild(info);

  card.addEventListener('click', function() {
    showMovieDetails(movie.imdbID);
  });

  return card;
}

function showMovieDetails(imdbID) {
  var url = 'http://www.omdbapi.com/?apikey=' + API_KEY + '&i=' + imdbID;

  messageEl.textContent = 'Loading details...';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      messageEl.textContent = '';
      if (data.Response === 'True') {
        displayModal(data);
      } else {
        messageEl.textContent = 'Could not load movie details.';
      }
    })
    .catch(function() {
      messageEl.textContent = 'Something went wrong. Please try again.';
    });
}

function displayModal(movie) {
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  var content = document.createElement('div');
  content.className = 'modal-content';

  var closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.textContent = '\u00D7';
  closeBtn.addEventListener('click', function() {
    document.body.removeChild(overlay);
  });

  var body = document.createElement('div');
  body.className = 'modal-body';

  var img = document.createElement('img');
  img.src = movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMG;
  img.alt = movie.Title;

  var details = document.createElement('div');
  details.className = 'modal-details';

  var title = document.createElement('h2');
  title.textContent = movie.Title;

  var fields = [
    { label: 'Year', value: movie.Year },
    { label: 'Rated', value: movie.Rated },
    { label: 'Released', value: movie.Released },
    { label: 'Genre', value: movie.Genre },
    { label: 'Director', value: movie.Director },
    { label: 'Actors', value: movie.Actors },
    { label: 'IMDb Rating', value: movie.imdbRating },
    { label: 'Plot', value: movie.Plot }
  ];

  details.appendChild(title);

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value && fields[i].value !== 'N/A') {
      var p = document.createElement('p');
      var span = document.createElement('span');
      span.textContent = fields[i].label + ': ';
      p.appendChild(span);
      p.appendChild(document.createTextNode(fields[i].value));
      details.appendChild(p);
    }
  }

  body.appendChild(img);
  body.appendChild(details);
  content.appendChild(closeBtn);
  content.appendChild(body);
  overlay.appendChild(content);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  document.body.appendChild(overlay);
}