import React, { useState, useEffect } from 'react';
import { useAuthCheck } from '../hooks/useAuthCheck';
import { userApi } from '../integrations/userApi';

export const Profile: React.FC = () => {
  const { user, isAuthenticated, redirectToLogin } = useAuthCheck();
  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    darkMode: false,
    defaultPriority: 'Medium'
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    
    // Fetch user preferences
    userApi.getUserPreferences().then(prefs => {
      setPreferences(prefs);
    });
  }, [isAuthenticated, redirectToLogin]);
  
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setPreferences(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Save to backend
    userApi.updateUserPreferences({
      ...preferences,
      [name]: newValue
    });
  };
  
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {user && (
        <>
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div className="preferences">
            <h3>Preferences</h3>
            <div className="preference-item">
              <label>
                <input 
                  type="checkbox"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                />
                Email Notifications
              </label>
            </div>
            <div className="preference-item">
              <label>
                <input 
                  type="checkbox"
                  name="darkMode"
                  checked={preferences.darkMode}
                  onChange={handlePreferenceChange}
                />
                Dark Mode
              </label>
            </div>
            <div className="preference-item">
              <label>
                Default Priority:
                <select
                  name="defaultPriority"
                  value={preferences.defaultPriority}
                  onChange={handlePreferenceChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};