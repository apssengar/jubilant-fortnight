import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading teams...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-triangle me-3"></i>
          <div>Error loading teams: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          <i className="fas fa-users me-3 text-success"></i>
          Teams
        </h1>
        <button className="btn btn-success">
          <i className="fas fa-plus-circle me-2"></i>Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="fas fa-users fa-4x text-muted mb-3"></i>
            <h4 className="text-muted mb-3">No Teams Found</h4>
            <p className="text-muted mb-4">Create or join a team to start competing with others!</p>
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-success">
                <i className="fas fa-plus-circle me-2"></i>Create Team
              </button>
              <button className="btn btn-outline-success">
                <i className="fas fa-search me-2"></i>Find Teams
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Teams Grid */}
          <div className="row g-4 mb-5">
            {teams.map((team, index) => (
              <div key={team.id || index} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate me-2">
                      <i className="fas fa-shield-alt me-2 text-success"></i>
                      {team.name || `Team ${index + 1}`}
                    </h5>
                    <span className="badge bg-primary">
                      <i className="fas fa-user me-1"></i>
                      {team.member_count || 0}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-text text-muted mb-3">
                      {team.description || 'No description available'}
                    </p>
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <div className="border-end">
                          <h5 className="text-warning mb-1">{team.total_points || 0}</h5>
                          <small className="text-muted">Points</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <h5 className="text-info mb-1">{team.member_count || 0}</h5>
                        <small className="text-muted">Members</small>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <i className="fas fa-crown me-1"></i>
                          Captain: {team.captain || 'N/A'}
                        </small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          Created: {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                        </small>
                      </div>
                      <div className="btn-group w-100" role="group">
                        <button className="btn btn-outline-success">
                          <i className="fas fa-eye me-1"></i>View
                        </button>
                        <button className="btn btn-success">
                          <i className="fas fa-user-plus me-1"></i>Join
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Teams Table */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-table me-2"></i>
                Team Statistics ({teams.length})
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">
                      <i className="fas fa-shield-alt me-2"></i>Team Name
                    </th>
                    <th scope="col">
                      <i className="fas fa-users me-2"></i>Members
                    </th>
                    <th scope="col">
                      <i className="fas fa-star me-2"></i>Points
                    </th>
                    <th scope="col">
                      <i className="fas fa-crown me-2"></i>Captain
                    </th>
                    <th scope="col">
                      <i className="fas fa-calendar me-2"></i>Created
                    </th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id || index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-shield-alt text-success me-2"></i>
                          <div className="fw-semibold">
                            {team.name || `Team ${index + 1}`}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-primary fs-6">
                          <i className="fas fa-user me-1"></i>
                          {team.member_count || 0}
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold text-warning fs-5">
                          {team.total_points || 0}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <i className="fas fa-crown me-1"></i>
                          {team.captain || 'N/A'}
                        </span>
                      </td>
                      <td className="text-muted">
                        {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button className="btn btn-outline-primary" title="View Team">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-success" title="Join Team">
                            <i className="fas fa-user-plus"></i>
                          </button>
                          <button className="btn btn-outline-info" title="Team Stats">
                            <i className="fas fa-chart-bar"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Teams;