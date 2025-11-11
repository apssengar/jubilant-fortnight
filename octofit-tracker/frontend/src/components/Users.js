import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-triangle me-3"></i>
          <div>Error loading users: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          <i className="fas fa-user-friends me-3 text-info"></i>
          Users
        </h1>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search users..."
            />
          </div>
          <button className="btn btn-info">
            <i className="fas fa-user-plus me-2"></i>Invite User
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="fas fa-user-friends fa-4x text-muted mb-3"></i>
            <h4 className="text-muted mb-3">No Users Found</h4>
            <p className="text-muted mb-4">Invite friends to join your fitness community!</p>
            <button className="btn btn-info">
              <i className="fas fa-user-plus me-2"></i>Invite Your First User
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Users Grid */}
          <div className="row g-4 mb-5">
            {users.slice(0, 6).map((user, index) => (
              <div key={user.id || index} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center" 
                           style={{ width: '60px', height: '60px' }}>
                        <i className="fas fa-user fa-2x text-white"></i>
                      </div>
                    </div>
                    <h5 className="card-title mb-2">
                      {user.name || user.username || `User ${index + 1}`}
                    </h5>
                    <p className="text-muted mb-3">{user.email || 'No email'}</p>
                    
                    <div className="row text-center mb-3">
                      <div className="col-4">
                        <div className="border-end">
                          <h6 className="text-primary mb-1">{user.total_points || 0}</h6>
                          <small className="text-muted">Points</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="border-end">
                          <h6 className="text-success mb-1">{user.activity_count || 0}</h6>
                          <small className="text-muted">Activities</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <h6 className="text-info mb-1">
                          {user.team_name || user.team ? '✓' : '✗'}
                        </h6>
                        <small className="text-muted">Team</small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="badge bg-light text-dark">
                        <i className="fas fa-users me-1"></i>
                        {user.team_name || user.team || 'No Team'}
                      </span>
                    </div>

                    <div className="btn-group w-100" role="group">
                      <button className="btn btn-outline-info btn-sm">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-envelope"></i>
                      </button>
                      <button className="btn btn-outline-success btn-sm">
                        <i className="fas fa-user-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-table me-2"></i>
                All Users ({users.length})
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">
                      <i className="fas fa-user me-2"></i>User
                    </th>
                    <th scope="col">
                      <i className="fas fa-envelope me-2"></i>Email
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
                    <th scope="col">
                      <i className="fas fa-calendar me-2"></i>Joined
                    </th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center me-3" 
                               style={{ width: '32px', height: '32px' }}>
                            <i className="fas fa-user text-white"></i>
                          </div>
                          <div className="fw-semibold">
                            {user.name || user.username || `User ${index + 1}`}
                          </div>
                        </div>
                      </td>
                      <td className="text-muted">{user.email || 'N/A'}</td>
                      <td>
                        {user.team_name || user.team ? (
                          <span className="badge bg-success">
                            <i className="fas fa-users me-1"></i>
                            {user.team_name || user.team}
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            <i className="fas fa-user me-1"></i>No Team
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="fw-bold text-primary fs-6">
                          {user.total_points || 0}
                        </span>
                      </td>
                      <td>
                        <span className="text-success fw-semibold">
                          {user.activity_count || 0}
                        </span>
                      </td>
                      <td className="text-muted">
                        {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button className="btn btn-outline-primary" title="View Profile">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-success" title="Send Message">
                            <i className="fas fa-envelope"></i>
                          </button>
                          <button className="btn btn-outline-info" title="View Activities">
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
        </>
      )}
    </div>
  );
};

export default Users;