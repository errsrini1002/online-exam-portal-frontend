import React from 'react';
import axios from 'axios';

function ProblemList({ problems, onRefresh }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/problems/${id}`);
    onRefresh();
  };

  return (
    <div className="problem-list">
      {problems.map(p => (
        <div key={p.id} className="problem-card">
          <h3>{p.problem}</h3>
          <p><strong>Solution:</strong> {p.solution}</p>
          <p><strong>Assigned To:</strong> {p.assignedTo}</p>
          <p><strong>Action By:</strong> {p.actionBy}</p>
          <p><strong>Category:</strong> {p.category}</p>
          <p><strong>Comments:</strong> {p.comments}</p>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProblemList;
