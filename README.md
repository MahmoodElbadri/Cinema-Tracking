# 🎬 CineTrack

**CineTrack** is a high-performance, full-stack movie management and analytics platform. It allows users to explore trending movies, manage a personalized watchlist, track their cinematic journey through a professional analytics dashboard, and purchase movies via secure payment integration.

---

## ✨ Features

### 🔐 Authentication & Security

* **Identity System:** Powered by .NET 8 Identity API Endpoints.
* **JWT Authentication:** Secure token-based authentication with auto-refresh logic.
* **Functional Interceptors:** Modern Angular interceptors for seamless token management.

### 🎥 Movie Exploration

* **TMDB Integration:** Real-time data fetching from The Movie Database API.
* **Trending & Details:** Explore weekly trending movies and deep-dive into movie details (cast, budget, revenue, etc.).
* **Smart Live Search:** Optimized search with RxJS Operators (`debounceTime`, `distinctUntilChanged`, `switchMap`) to minimize API overhead.

### 📊 Advanced Analytics Dashboard

* **Data Visualization:** Interactive charts using Chart.js.
* **User Insights:** Analysis of total watch time, favorite genres (LINQ-powered), and monthly activity trends.
* **Performance:** High-speed data aggregation using `Task.WhenAll` for parallel API requests.

### 💳 Payments (In Progress/Integrated)

* **Stripe Integration:** Secure checkout process for movie purchases.
* **Webhooks:** Real-time payment status updates.

### 🎨 UI/UX

* **Modern Design:** Glassmorphism UI with a cinematic dark theme.
* **Responsive:** Fully responsive layout using Bootstrap 5.
* **State Management:** Powered by Angular Signals for fine-grained reactivity.

---

## 🛠️ Tech Stack

### Backend (.NET 8)

* **Framework:** ASP.NET Core Web API.
* **Database:** SQL Server with Entity Framework Core.
* **Architecture:** Clean Architecture principles.
* **Security:** ASP.NET Core Identity & JWT.

### Frontend (Angular 17+)

* **Architecture:** Feature-based / Modular architecture.
* **Reactivity:** Angular Signals & Computed properties.
* **Asynchronous Logic:** RxJS Observables.
* **Charts:** Chart.js.
* **Styling:** SCSS & Bootstrap 5.

---

## 🏗️ Architecture Overview

The project follows a clean, decoupled architecture:

* **Core / Domain:** Contains models and business logic.
* **Services / Infrastructure:** Handles external API calls (TMDB) and database operations.
* **API / Controllers:** Exposes secure endpoints for the frontend.
* **Frontend Layouts & Features:** Separates global components (Navbar / Interceptors) from specific features (Movies / Analytics).

---

## 🚀 Getting Started

### Prerequisites

* .NET 8 SDK
* Node.js & Angular CLI
* SQL Server
* TMDB API Key

### Backend Setup

```bash
git clone https://github.com/MahmoodElbadri/Cinema-Tracking/
cd CineTrack.api
```

Update `appsettings.json` with your connection string and TMDB API key.

```bash
dotnet ef database update
dotnet run
```

### Frontend Setup

```bash
cd CineTrack.front
npm install
```

Update `src/environments/environment.ts` with your API URL.

```bash
ng serve
```

---

## 👨‍💻 Author

**Mahmoud Salah Elbadri**
Full Stack .NET Developer

---

## 📜 License

This project is licensed under the MIT License.
