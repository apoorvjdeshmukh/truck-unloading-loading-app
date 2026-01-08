import React from 'react';
import './StatusBar.css';

const StatusBar = ({ statuses, currentStatus, type = 'unload' }) => {
  const statusArray = Object.values(statuses);
  const currentIndex = statusArray.indexOf(currentStatus);
  
  const getStatusIcon = (status, index) => {
    const icons = type === 'unload' 
      ? ['🚚', '📦', '📷', '🔍', '📍', '🔢', '✅']
      : ['🚚', '📦', '⏳', '📷', '✅'];
    return icons[index] || '●';
  };

  const getStatusColor = (index, currentIdx) => {
    if (index <= currentIdx) return '#27ae60'; // Green for completed
    return '#bdc3c7'; // Grey for pending
  };

  // Calculate progress percentage - connect to the current milestone
  const progressPercentage = currentIndex >= 0 && statusArray.length > 1
    ? (currentIndex / (statusArray.length - 1)) * 100 
    : 0;

  return (
    <div className={`status-bar-container ${type}`}>
      <div className="status-bar">
        <div className="status-progress-line">
          <div 
            className="status-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="status-milestones">
          {statusArray.map((status, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;
            const nextIsCompleted = index < currentIndex - 1;
            
            return (
              <React.Fragment key={status}>
                <div 
                  className={`milestone ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''}`}
                >
                  <div className="milestone-icon" style={{ color: getStatusColor(index, currentIndex) }}>
                    {getStatusIcon(status, index)}
                  </div>
                  <div className="milestone-label">{status}</div>
                  {index < statusArray.length - 1 && (
                    <div 
                      className={`milestone-connector ${isCompleted ? 'completed' : ''}`}
                    ></div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;

