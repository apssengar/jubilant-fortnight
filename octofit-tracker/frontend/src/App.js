import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  // Log the environment variables for debugging
  console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
  
  const Home = () => (
    <div className="container mt-4 fade-in">
      <div className="hero-section p-5 rounded mb-5">
        <h1 className="display-4 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-4">
          Track your fitness activities, compete with teams, and achieve your fitness goals!
        </p>
        <hr className="my-4 border-light" />
        <p className="mb-4">
          Use the navigation menu above to explore activities, view the leaderboard, 
          manage teams, browse users, and discover workouts.
        </p>
        <NavLink to="/activities" className="btn btn-light btn-lg me-3">
          <i className="fas fa-running me-2"></i>Get Started
        </NavLink>
        <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg">
          <i className="fas fa-trophy me-2"></i>View Rankings
        </NavLink>
      </div>
      
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column">
              <div className="mb-3">
                <i className="fas fa-dumbbell fa-3x text-primary"></i>
              </div>
              <h5 className="card-title h4">Track Activities</h5>
              <p className="card-text flex-grow-1">
                Log your daily fitness activities and monitor your progress with detailed analytics.
              </p>
              <NavLink to="/activities" className="btn btn-primary mt-auto">
                View Activities
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column">
              <div className="mb-3">
                <i className="fas fa-users fa-3x text-success"></i>
              </div>
              <h5 className="card-title h4">Team Competition</h5>
              <p className="card-text flex-grow-1">
                Join teams and compete with others in exciting fitness challenges and tournaments.
              </p>
              <NavLink to="/teams" className="btn btn-success mt-auto">
                Browse Teams
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column">
              <div className="mb-3">
                <i className="fas fa-trophy fa-3x text-warning"></i>
              </div>
              <h5 className="card-title h4">Leaderboard</h5>
              <p className="card-text flex-grow-1">
                See how you rank against other users and teams in real-time competitive rankings.
              </p>
              <NavLink to="/leaderboard" className="btn btn-warning mt-auto">
                View Rankings
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Quick Stats</h3>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="border-end">
                    <h2 className="text-primary mb-1">1,234</h2>
                    <p className="text-muted mb-0">Total Users</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border-end">
                    <h2 className="text-success mb-1">5,678</h2>
                    <p className="text-muted mb-0">Activities Logged</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="border-end">
                    <h2 className="text-warning mb-1">89</h2>
                    <p className="text-muted mb-0">Active Teams</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <h2 className="text-danger mb-1">456</h2>
                  <p className="text-muted mb-0">Workouts Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img 
                src="/octofitapp-small.svg" 
                alt="OctoFit Logo" 
                className="logo"
              />
              OctoFit Tracker
            </NavLink>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/activities"
                  >
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/leaderboard"
                  >
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/teams"
                  >
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/users"
                  >
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    to="/workouts"
                  >
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light py-4 mt-5">
          <div className="container text-center">
            <p>&copy; 2025 OctoFit Tracker. Track your fitness journey!</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
