import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading activities...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-triangle me-3"></i>
          <div>Error loading activities: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          <i className="fas fa-running me-3 text-primary"></i>
          Activities
        </h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Add Activity
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="fas fa-running fa-4x text-muted mb-3"></i>
            <h4 className="text-muted mb-3">No Activities Found</h4>
            <p className="text-muted mb-4">Start tracking your fitness journey by adding your first activity.</p>
            <button className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Add Your First Activity
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-list me-2"></i>
              Recent Activities ({activities.length})
            </h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">
                    <i className="fas fa-tag me-2"></i>Activity
                  </th>
                  <th scope="col">
                    <i className="fas fa-category me-2"></i>Type
                  </th>
                  <th scope="col">
                    <i className="fas fa-clock me-2"></i>Duration
                  </th>
                  <th scope="col">
                    <i className="fas fa-fire me-2"></i>Calories
                  </th>
                  <th scope="col">
                    <i className="fas fa-calendar me-2"></i>Date
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <td>
                      <div className="fw-semibold">
                        {activity.name || `Activity ${index + 1}`}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {activity.activity_type || 'General'}
                      </span>
                    </td>
                    <td>
                      <span className="text-success fw-semibold">
                        {activity.duration || 0} min
                      </span>
                    </td>
                    <td>
                      <span className="text-danger fw-semibold">
                        {activity.calories_burned || 0} cal
                      </span>
                    </td>
                    <td className="text-muted">
                      {activity.created_at 
                        ? new Date(activity.created_at).toLocaleDateString() 
                        : 'N/A'
                      }
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button className="btn btn-outline-primary" title="View Details">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn btn-outline-secondary" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;