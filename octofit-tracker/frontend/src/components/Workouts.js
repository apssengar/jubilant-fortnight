import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-triangle me-3"></i>
          <div>Error loading workouts: {error}</div>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning text-dark';
      case 'hard': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'fas fa-leaf';
      case 'medium': return 'fas fa-fire';
      case 'hard': return 'fas fa-bolt';
      default: return 'fas fa-circle';
    }
  };

  return (
    <div className="container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          <i className="fas fa-dumbbell me-3 text-danger"></i>
          Workouts
        </h1>
        <div className="d-flex gap-2">
          <div className="btn-group">
            <button className="btn btn-outline-primary active">All</button>
            <button className="btn btn-outline-success">Easy</button>
            <button className="btn btn-outline-warning">Medium</button>
            <button className="btn btn-outline-danger">Hard</button>
          </div>
          <button className="btn btn-danger">
            <i className="fas fa-plus me-2"></i>Create Workout
          </button>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="fas fa-dumbbell fa-4x text-muted mb-3"></i>
            <h4 className="text-muted mb-3">No Workouts Found</h4>
            <p className="text-muted mb-4">Create custom workouts or browse our recommended routines!</p>
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-danger">
                <i className="fas fa-plus me-2"></i>Create Workout
              </button>
              <button className="btn btn-outline-danger">
                <i className="fas fa-search me-2"></i>Browse Library
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Workouts Grid */}
          <div className="row g-4 mb-5">
            {workouts.map((workout, index) => (
              <div key={workout.id || index} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate me-2">
                      <i className="fas fa-dumbbell me-2 text-danger"></i>
                      {workout.name || workout.title || `Workout ${index + 1}`}
                    </h5>
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                      <i className={`${getDifficultyIcon(workout.difficulty)} me-1`}></i>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <div className="border-end">
                          <h6 className="text-primary mb-1">
                            <i className="fas fa-clock me-1"></i>
                            {workout.duration || 0}
                          </h6>
                          <small className="text-muted">Minutes</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <h6 className="text-info mb-1">
                          <i className="fas fa-tag me-1"></i>
                          {workout.workout_type || workout.type || 'General'}
                        </h6>
                        <small className="text-muted">Type</small>
                      </div>
                    </div>

                    {workout.description && (
                      <p className="card-text text-muted mb-3">
                        {workout.description.length > 100 
                          ? `${workout.description.substring(0, 100)}...` 
                          : workout.description
                        }
                      </p>
                    )}

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          Created: {workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'N/A'}
                        </small>
                      </div>
                      <div className="btn-group w-100" role="group">
                        <button className="btn btn-outline-danger">
                          <i className="fas fa-eye me-1"></i>View
                        </button>
                        <button className="btn btn-danger">
                          <i className="fas fa-play me-1"></i>Start
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workouts Table */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-table me-2"></i>
                All Workouts ({workouts.length})
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">
                      <i className="fas fa-dumbbell me-2"></i>Workout
                    </th>
                    <th scope="col">
                      <i className="fas fa-tag me-2"></i>Type
                    </th>
                    <th scope="col">
                      <i className="fas fa-clock me-2"></i>Duration
                    </th>
                    <th scope="col">
                      <i className="fas fa-signal me-2"></i>Difficulty
                    </th>
                    <th scope="col">
                      <i className="fas fa-calendar me-2"></i>Created
                    </th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id || index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-dumbbell text-danger me-3"></i>
                          <div>
                            <div className="fw-semibold">
                              {workout.name || workout.title || `Workout ${index + 1}`}
                            </div>
                            {workout.description && (
                              <small className="text-muted">
                                {workout.description.length > 50 
                                  ? `${workout.description.substring(0, 50)}...` 
                                  : workout.description
                                }
                              </small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          <i className="fas fa-tag me-1"></i>
                          {workout.workout_type || workout.type || 'General'}
                        </span>
                      </td>
                      <td>
                        <span className="text-info fw-semibold">
                          <i className="fas fa-clock me-1"></i>
                          {workout.duration || 0} min
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getDifficultyBadge(workout.difficulty)} fs-6`}>
                          <i className={`${getDifficultyIcon(workout.difficulty)} me-1`}></i>
                          {workout.difficulty || 'N/A'}
                        </span>
                      </td>
                      <td className="text-muted">
                        {workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button className="btn btn-outline-primary" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline-success" title="Start Workout">
                            <i className="fas fa-play"></i>
                          </button>
                          <button className="btn btn-outline-secondary" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-outline-warning" title="Favorite">
                            <i className="fas fa-heart"></i>
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

export default Workouts;