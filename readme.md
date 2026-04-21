# 🌐 Web Development Projects Collection (HTML, CSS, JavaScript)

This repository serves as a comprehensive collection of my foundational and intermediate projects built using **HTML, CSS, and JavaScript**. It showcases my skills in front-end development, DOM manipulation, API integration, and interactive web design. Each project is designed to demonstrate specific concepts and techniques, ranging from simple UI components to more complex applications.

---

## 🚀 Quick Navigation

*   [Featured Projects](#-featured-projects)
*   [Project List](#-project-list)
*   [Technologies Used](#-technologies-used)
*   [How to Run Projects Locally](#-how-to-run-projects-locally)
*   [License](#-license)

---

## ✨ Featured Projects

Here are a few standout projects from this collection that best represent my capabilities in web development:

### 1. **Stock Dashboard**

A stock lookup and market feed dashboard using Alpha Vantage endpoints. It combines symbol/company search, quote display, filtered top-movers feed, and an in-memory watchlist for quick re-checking.

*   **Key Features:** API-key gate, symbol search + company match list, quote metrics, top gainers/losers/active filters, watchlist chips.
*   **Technologies:** HTML, CSS, JavaScript, Fetch API, Finance API (e.g., Alpha Vantage).
*   **[View Project](https://github.com/aryan2064/web-wonders/tree/main/20%20Stock-Dashboard)**

### 2. **Weather App**

An interactive weather lookup app that fetches current conditions by city name using the OpenWeatherMap API. The project emphasizes request-state handling (loading, error, success), safe query encoding, and dynamic UI updates.

*   **Key Features:** Search by city, loading/error feedback, condition icon rendering, temperature and humidity display.
*   **Technologies:** HTML, CSS, JavaScript, Fetch API, OpenWeatherMap API.
*   **[View Project](https://github.com/aryan2064/web-wonders/tree/main/16%20Wheather%20-App)**

### 3. **Movie Searcher**

An OMDb-powered movie discovery app with paginated search and on-demand detail modals. It demonstrates multi-step API usage (search + details), pagination state management, and dynamic DOM card/modal creation.

*   **Key Features:** Search by title, load more results by page, click-to-open details modal, poster fallbacks.
*   **Technologies:** HTML, CSS, JavaScript, Fetch API, OMDb API.
*   **[View Project](https://github.com/aryan2064/web-wonders/tree/main/17%20Movie-Searcher)**


### 4. **GitHub Finder**

A GitHub profile explorer that fetches user metadata and recent repositories from the GitHub REST API. It highlights chained API calls, conditional rendering for missing profile fields, and reusable card-based repo UI.

*   **Key Features:** Username search, profile stats and metadata, formatted join dates, recent repo cards with stars/forks/language.
*   **Technologies:** HTML, CSS, JavaScript, Fetch API, GitHub REST API.
*   **[View Project](https://github.com/aryan2064/web-wonders/tree/main/19%20GitHub-Finder)**

---

## 📂 Project List

Below is a comprehensive list of all projects included in this repository, categorized for easy navigation. Each project resides in its own subdirectory and includes a dedicated `README.md` with more details, screenshots, and usage instructions.

| # | Project Name | Description | Key Concepts Demonstrated | Link to Project |
|---|---|---|---|---|
| 1 | Click Counter | Simple state-based counter app | DOM event handling, shared state updates, micro-animation with class toggling | [View Project](https://github.com/aryan2064/web-wonders/tree/main/01%20Click-Counter) |
| 2 | Character Counter | Counts characters dynamically in input field | `input` event listeners, real-time text metrics, reset workflow | [View Project](https://github.com/aryan2064/web-wonders/tree/main/02%20Character-Counter) |
| 3 | Color Generator | Generates random colors and CSS gradients with live preview | Random HEX generation, event delegation, Clipboard API integration | [View Project](https://github.com/aryan2064/web-wonders/tree/main/03%20Color-Generator) |
| 4 | Password Generator | Creates secure passwords with user-defined constraints | Constraint-based generation, validation/error states, Clipboard API feedback | [View Project](https://github.com/aryan2064/web-wonders/tree/main/04%20Password-Generator) |
| 5 | Countdown Timer | User-defined timer with real-time countdown | Time normalization/formatting, `setInterval` lifecycle control, start/reset state management | [View Project](https://github.com/aryan2064/web-wonders/tree/main/05%20Countdown-Timer) |
| 6 | Todo App | Task manager with local storage support | Dynamic DOM creation, task state toggling, keyboard shortcuts (Enter to add) | [View Project](https://github.com/aryan2064/web-wonders/tree/main/06%20Todo-App) |
| 7 | Quiz Game | Interactive quiz with scoring and dynamic questions | Multi-screen UI state, data-driven question rendering, scoring + progress tracking | [View Project](https://github.com/aryan2064/web-wonders/tree/main/07%20quiz-game) |
| 8 | Tic Tac Toe | 2-player or AI-based browser game | Turn-based state machine, win/draw detection, combination highlighting | [View Project](https://github.com/aryan2064/web-wonders/tree/main/08%20Tic-Tac-Toe) |
| 9 | Pomodoro Timer | Productivity timer with session tracking | Work/break mode switching, configurable durations, Web Audio API alert tone | [View Project](https://github.com/aryan2064/web-wonders/tree/main/09%20Pomodoro-Timer) |
| 10 | Typing Speed Game | Measures WPM and accuracy | Real-time game loop (`setInterval` + `setTimeout`), difficulty scaling, typed-word collision matching | [View Project](https://github.com/aryan2064/web-wonders/tree/main/10%20Typing-Game) |
| 11 | QR Code Generator | Converts text into QR codes (using QR API/library) | URL-safe encoding, third-party image API usage, downloadable asset links | [View Project](https://github.com/aryan2064/web-wonders/tree/main/11%20QR-Code-Generator) |
| 12 | Daily Quotes App | Fetches quotes using a public quotes API | Fetch with offline/local fallback, loading states, Clipboard API copy interaction | [View Project](https://github.com/aryan2064/web-wonders/tree/main/12%20Daily-Quote) |
| 13 | Gender Predictor | Uses Genderize API (`https://api.genderize.io`) | `async/await` API flow, confidence/result interpretation, conditional UI rendering | [View Project](https://github.com/aryan2064/web-wonders/tree/main/13%20Gender-Predicter) |
| 14 | Sudoku Solver | Solves Sudoku puzzles (likely with a UI) | Recursive backtracking solver, puzzle generation by clue removal, difficulty-driven board setup | [View Project](https://github.com/aryan2064/web-wonders/tree/main/14%20Sudoku-Solver) |
| 15 | Currency Converter | Uses ExchangeRate API for real-time conversions | Dynamic dropdown population from API data, form-driven conversion logic, rate lookup by selected base | [View Project](https://github.com/aryan2064/web-wonders/tree/main/15%20Currency-Converter) |
| 16 | Weather App | Fetches weather using OpenWeatherMap API | Request-state UX (loading/error/success), encoded query parameters, weather icon mapping | [View Project](https://github.com/aryan2064/web-wonders/tree/main/16%20Wheather%20-App) |
| 17 | Movie Searcher | Uses OMDb API for movie data | Paginated API search, dynamic card rendering, detail modal fetched by IMDb ID | [View Project](https://github.com/aryan2064/web-wonders/tree/main/17%20Movie-Searcher) |
| 18 | Pokémon Searcher | Uses PokéAPI for Pokémon details | Name/ID lookup + random selection, template-based stat/type rendering, API error handling | [View Project](https://github.com/aryan2064/web-wonders/tree/main/18%20Pokemon-Viewer) |
| 19 | GitHub Finder | Fetch GitHub user profiles using GitHub REST API | Chained API calls (profile + repos), conditional field fallbacks, formatted metadata display | [View Project](https://github.com/aryan2064/web-wonders/tree/main/19%20GitHub-Finder) |
| 20 | Stock Dashboard | Displays stock data using finance API (e.g., Alpha Vantage) | Multi-endpoint financial API integration, feed filtering, watchlist state synchronization | [View Project](https://github.com/aryan2064/web-wonders/tree/main/20%20Stock-Dashboard) |
| 21 | Mandelbrot Set | Visualizes the Mandelbrot Set | Canvas pixel rendering, escape-time fractal iteration, interactive zoom coordinate transforms | [View Project](https://github.com/aryan2064/web-wonders/tree/main/21%20Mandelbrot-Set) |

---

## 🛠️ Technologies Used

*   **HTML5:** Semantic structure and content organization.
*   **CSS3:** Styling, layout (Flexbox, Grid), responsive design, animations.
*   **JavaScript (ES6+):** Core logic, DOM manipulation, event handling, asynchronous programming (Fetch API, `async/await`).
*   **External APIs:** Integration with various third-party services (e.g., OpenWeatherMap, OMDb, PokéAPI, Genderize API, ExchangeRate API, GitHub REST API, QR API).

