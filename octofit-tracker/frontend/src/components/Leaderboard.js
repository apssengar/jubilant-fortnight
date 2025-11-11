import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-triangle me-3"></i>
          <div>Error loading leaderboard: {error}</div>
        </div>
      </div>
    );
  }

  const getRankBadge = (index) => {
    if (index === 0) return 'bg-warning text-dark'; // Gold
    if (index === 1) return 'bg-secondary'; // Silver
    if (index === 2) return 'bg-danger'; // Bronze
    return 'bg-primary';
  };

  const getRankIcon = (index) => {
    if (index === 0) return 'fas fa-crown';
    if (index === 1) return 'fas fa-medal';
    if (index === 2) return 'fas fa-award';
    return 'fas fa-user';
  };

  return (
    <div className="container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          <i className="fas fa-trophy me-3 text-warning"></i>
          Leaderboard
        </h1>
        <div className="btn-group">
          <button className="btn btn-outline-primary active">All Time</button>
          <button className="btn btn-outline-primary">This Month</button>
          <button className="btn btn-outline-primary">This Week</button>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="fas fa-trophy fa-4x text-muted mb-3"></i>
            <h4 className="text-muted mb-3">No Leaderboard Data</h4>
            <p className="text-muted mb-4">Complete some activities to see your ranking!</p>
            <button className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Start Your Journey
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* Top 3 Podium */}
          {leaderboard.slice(0, 3).length > 0 && (
            <div className="col-12 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="fas fa-podium me-2"></i>Top Performers
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    {leaderboard.slice(0, 3).map((entry, index) => (
                      <div key={entry.id || index} className="col-md-4 mb-3">
                        <div className={`card h-100 ${index === 0 ? 'border-warning' : index === 1 ? 'border-secondary' : 'border-danger'}`}>
                          <div className="card-body">
                            <i className={`${getRankIcon(index)} fa-3x mb-3 ${index === 0 ? 'text-warning' : index === 1 ? 'text-secondary' : 'text-danger'}`}></i>
                            <h5 className="card-title">{entry.user_name || entry.name || 'Unknown'}</h5>
                            <p className="card-text">
                              <span className="badge bg-light text-dark mb-2">{entry.team_name || entry.team || 'No Team'}</span><br />
                              <span className="h4 text-primary">{entry.total_points || entry.points || 0}</span> points<br />
                              <small className="text-muted">{entry.total_activities || entry.activities || 0} activities</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Leaderboard Table */}
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-list-ol me-2"></i>
                  Complete Rankings ({leaderboard.length})
                </h5>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">
                        <i className="fas fa-hashtag me-2"></i>Rank
                      </th>
                      <th scope="col">
                        <i className="fas fa-user me-2"></i>User
                      </th>
                      <th scope="col">
                        <i className="fas fa-users me-2"></i>Team
                      </th>
                      <th scope="col">
                        <i className="fas fa-star me-2"></i>Points
                      </th>
                      <th scope="col">
                        <i className="fas fa-chart-line me-2"></i>Activities
                      </th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id || index} className={index < 3 ? 'table-light' : ''}>
                        <td>
                          <span className={`badge ${getRankBadge(index)} fs-6`}>
                            <i className={`${getRankIcon(index)} me-1`}></i>
                            #{index + 1}
                          </span>
                        </td>
                        <td>
                          <div className="fw-semibold">
                            {entry.user_name || entry.name || 'Unknown'}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {entry.team_name || entry.team || 'No Team'}
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold text-primary fs-5">
                            {entry.total_points || entry.points || 0}
                          </span>
                        </td>
                        <td>
                          <span className="text-success fw-semibold">
                            {entry.total_activities || entry.activities || 0}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <button className="btn btn-outline-primary" title="View Profile">
                              <i className="fas fa-user"></i>
                            </button>
                            <button className="btn btn-outline-success" title="View Activities">
                              <i className="fas fa-list"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;