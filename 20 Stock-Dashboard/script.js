var API_KEY = "";
var watchlist = [];
var feedData = null;
var activeFilter = "top_gainers";

var apiKeySection = document.getElementById("apiKeySection");
var apiKeyInput = document.getElementById("apiKeyInput");
var apiKeyError = document.getElementById("apiKeyError");
var apiKeyBtn = document.getElementById("apiKeyBtn");
var appContent = document.getElementById("appContent");
var symbolInput = document.getElementById("symbolInput");
var searchBtn = document.getElementById("searchBtn");
var loadingEl = document.getElementById("loading");
var errorEl = document.getElementById("error");
var searchResults = document.getElementById("searchResults");
var resultsList = document.getElementById("resultsList");
var stockDisplay = document.getElementById("stockDisplay");
var stockSymbol = document.getElementById("stockSymbol");
var stockPrice = document.getElementById("stockPrice");
var stockChange = document.getElementById("stockChange");
var stockChangePercent = document.getElementById("stockChangePercent");
var lastUpdated = document.getElementById("lastUpdated");
var watchlistSection = document.getElementById("watchlist");
var watchlistItems = document.getElementById("watchlistItems");
var feedGrid = document.getElementById("feedGrid");
var feedLoading = document.getElementById("feedLoading");
var feedError = document.getElementById("feedError");
var feedFilters = document.getElementById("feedFilters");
var homeFeed = document.getElementById("homeFeed");
var backBtn = document.getElementById("backBtn");

apiKeyInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    setApiKey();
  }
});

function setApiKey() {
  var key = apiKeyInput.value.trim();
  if (key === "") {
    apiKeyError.textContent = "Please enter a valid API key.";
    apiKeyError.classList.remove("hidden");
    return;
  }

  API_KEY = key;
  apiKeySection.classList.add("hidden");
  appContent.classList.remove("hidden");
  fetchHomeFeed();
}

var filterBtns = feedFilters.querySelectorAll(".filter-btn");
for (var i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    for (var j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
    }
    this.classList.add("active");
    activeFilter = this.getAttribute("data-filter");
    renderFeed();
  });
}

symbolInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchStock();
  }
});

function showHomeFeed() {
  homeFeed.classList.remove("hidden");
  stockDisplay.classList.add("hidden");
  searchResults.classList.add("hidden");
  errorEl.classList.add("hidden");
  loadingEl.classList.add("hidden");
  symbolInput.value = "";
}

function isLikelySymbol(input) {
  return input.length <= 5 && /^[A-Z]+$/.test(input);
}

function searchStock() {
  if (API_KEY === "") return;

  var query = symbolInput.value.trim();

  if (query === "") {
    showError("Please enter a stock symbol or company name.");
    return;
  }

  query = query.toUpperCase();
  hideError();
  hideStock();
  hideSearchResults();
  homeFeed.classList.add("hidden");
  showLoading();

  if (isLikelySymbol(query)) {
    fetchQuote(query);
  } else {
    fetchSymbolSearch(query);
  }
}

function fetchSymbolSearch(keywords) {
  var url =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
    encodeURIComponent(keywords) +
    "&apikey=" +
    API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      hideLoading();

      if (data["bestMatches"] && data["bestMatches"].length > 0) {
        showSearchResults(data["bestMatches"]);
      } else if (data["Note"]) {
        showError(
          "API rate limit reached. Please wait a minute and try again.",
        );
      } else if (data["Information"]) {
        showError("Invalid API key. Please go back and re-enter your key.");
      } else {
        showError("No matching stocks found. Try a different name.");
      }
    })
    .catch(function () {
      hideLoading();
      showError("Failed to fetch data. Check your internet connection.");
    });
}

function fetchQuote(symbol) {
  var url =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
    symbol +
    "&apikey=" +
    API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      hideLoading();

      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        displayStock(symbol, data["Global Quote"]);
      } else if (data["Note"]) {
        showError(
          "API rate limit reached. Please wait a minute and try again.",
        );
      } else if (data["Information"]) {
        showError("Invalid API key. Please go back and re-enter your key.");
      } else {
        showError(
          "Stock symbol not found. Please check the symbol and try again.",
        );
      }
    })
    .catch(function () {
      hideLoading();
      showError("Failed to fetch data. Check your internet connection.");
    });
}

function showSearchResults(matches) {
  resultsList.innerHTML = "";

  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    var row = document.createElement("div");
    row.className = "result-row";
    row.setAttribute("data-symbol", match["1. symbol"]);

    row.addEventListener("click", function () {
      var sym = this.getAttribute("data-symbol");
      symbolInput.value = sym;
      hideSearchResults();
      hideError();
      hideStock();
      showLoading();
      fetchQuote(sym);
    });

    var symSpan = document.createElement("span");
    symSpan.className = "result-symbol";
    symSpan.textContent = match["1. symbol"];

    var nameSpan = document.createElement("span");
    nameSpan.className = "result-name";
    nameSpan.textContent = match["2. name"];

    var regionSpan = document.createElement("span");
    regionSpan.className = "result-region";
    regionSpan.textContent = match["4. region"];

    row.appendChild(symSpan);
    row.appendChild(nameSpan);
    row.appendChild(regionSpan);
    resultsList.appendChild(row);
  }

  searchResults.classList.remove("hidden");
}

function displayStock(symbol, quote) {
  var price = parseFloat(quote["05. price"]).toFixed(2);
  var change = parseFloat(quote["09. change"]).toFixed(2);
  var changePercent = quote["10. change percent"];
  var isUp = change >= 0;

  stockSymbol.textContent = symbol;
  stockPrice.textContent = "$" + price;
  stockPrice.className = "metric-value price";

  stockChange.textContent = (isUp ? "+" : "") + change;
  stockChange.className = "metric-value " + (isUp ? "up" : "down");

  stockChangePercent.textContent = (isUp ? "+" : "") + changePercent;
  stockChangePercent.className = "metric-value " + (isUp ? "up" : "down");

  var now = new Date();
  lastUpdated.textContent = "Last updated: " + now.toLocaleTimeString();

  stockDisplay.classList.remove("hidden");

  addToWatchlist(symbol, price, change, changePercent, isUp);
}

function addToWatchlist(symbol, price, change, changePercent, isUp) {
  var exists = false;
  for (var i = 0; i < watchlist.length; i++) {
    if (watchlist[i].symbol === symbol) {
      watchlist[i].price = price;
      watchlist[i].change = change;
      watchlist[i].changePercent = changePercent;
      watchlist[i].isUp = isUp;
      exists = true;
      break;
    }
  }

  if (!exists) {
    watchlist.push({
      symbol: symbol,
      price: price,
      change: change,
      changePercent: changePercent,
      isUp: isUp,
    });
  }

  renderWatchlist();
}

function renderWatchlist() {
  if (watchlist.length === 0) {
    watchlistSection.classList.add("hidden");
    return;
  }

  watchlistSection.classList.remove("hidden");
  watchlistItems.innerHTML = "";

  for (var i = 0; i < watchlist.length; i++) {
    var item = watchlist[i];
    var chip = document.createElement("div");
    chip.className = "watchlist-chip";
    chip.setAttribute("data-symbol", item.symbol);
    chip.addEventListener("click", function () {
      var sym = this.getAttribute("data-symbol");
      symbolInput.value = sym;
      searchStock();
    });

    var symSpan = document.createElement("span");
    symSpan.className = "chip-symbol";
    symSpan.textContent = item.symbol;

    var priceSpan = document.createElement("span");
    priceSpan.className = "chip-price";
    priceSpan.textContent = "$" + item.price;

    var changeSpan = document.createElement("span");
    changeSpan.className = "chip-change " + (item.isUp ? "up" : "down");
    changeSpan.textContent = (item.isUp ? "+" : "") + item.changePercent;

    chip.appendChild(symSpan);
    chip.appendChild(priceSpan);
    chip.appendChild(changeSpan);
    watchlistItems.appendChild(chip);
  }
}

function showLoading() {
  loadingEl.classList.remove("hidden");
}

function hideLoading() {
  loadingEl.classList.add("hidden");
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

function hideError() {
  errorEl.classList.add("hidden");
}

function hideStock() {
  stockDisplay.classList.add("hidden");
}

function hideSearchResults() {
  searchResults.classList.add("hidden");
}

function fetchHomeFeed() {
  homeFeed.classList.remove("hidden");
  feedLoading.classList.remove("hidden");
  feedError.classList.add("hidden");
  feedGrid.classList.add("hidden");

  var url =
    "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=" +
    API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      feedLoading.classList.add("hidden");
      if (
        data["top_gainers"] ||
        data["top_losers"] ||
        data["most_actively_traded"]
      ) {
        feedData = data;
        renderFeed();
      } else if (data["Note"]) {
        feedError.textContent =
          "API rate limit reached. Please wait a minute and try again.";
        feedError.classList.remove("hidden");
      } else if (data["Information"]) {
        API_KEY = "";
        apiKeySection.classList.remove("hidden");
        appContent.classList.add("hidden");
        apiKeyError.textContent =
          "Invalid API key. Please check your key and try again.";
        apiKeyError.classList.remove("hidden");
      } else if (data["Error Message"]) {
        feedError.textContent = data["Error Message"];
        feedError.classList.remove("hidden");
      } else {
        feedError.textContent =
          "Unable to load market data. Please verify your API key.";
        feedError.classList.remove("hidden");
      }
    })
    .catch(function () {
      feedLoading.classList.add("hidden");
      feedError.textContent =
        "Failed to fetch data. Check your internet connection.";
      feedError.classList.remove("hidden");
    });
}

function renderFeed() {
  if (!feedData) return;
  feedGrid.innerHTML = "";
  feedGrid.classList.remove("hidden");

  var items = feedData[activeFilter] || [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var changeNum = parseFloat(item["change_percentage"]);
    var isUp = changeNum >= 0;

    var card = document.createElement("div");
    card.className = "feed-card " + (isUp ? "up" : "down");
    card.setAttribute("data-symbol", item["ticker"]);

    card.addEventListener("click", function () {
      var sym = this.getAttribute("data-symbol");
      symbolInput.value = sym;
      searchStock();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var cardHeader = document.createElement("div");
    cardHeader.className = "feed-card-header";

    var ticker = document.createElement("span");
    ticker.className = "feed-card-ticker";
    ticker.textContent = item["ticker"];

    var changeBadge = document.createElement("span");
    changeBadge.className = "feed-card-badge " + (isUp ? "up" : "down");
    changeBadge.textContent = item["change_percentage"];

    cardHeader.appendChild(ticker);
    cardHeader.appendChild(changeBadge);

    var priceEl = document.createElement("div");
    priceEl.className = "feed-card-price";
    priceEl.textContent = "$" + parseFloat(item["price"]).toFixed(2);

    var volumeEl = document.createElement("div");
    volumeEl.className = "feed-card-volume";
    volumeEl.textContent = "Vol: " + Number(item["volume"]).toLocaleString();

    var changeAmtEl = document.createElement("div");
    changeAmtEl.className = "feed-card-change " + (isUp ? "up" : "down");
    changeAmtEl.textContent =
      (isUp ? "+" : "") + parseFloat(item["change"]).toFixed(2);

    card.appendChild(cardHeader);
    card.appendChild(priceEl);
    card.appendChild(changeAmtEl);
    card.appendChild(volumeEl);
    feedGrid.appendChild(card);
  }
}
