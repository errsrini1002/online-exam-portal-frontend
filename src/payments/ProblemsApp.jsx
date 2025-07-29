import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProblemForm from './ProblemForm';
import ProblemList from './ProblemList'; 

import './Problems.css';

function ProblemsApp() {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState({ category: '', assignedTo: '' });

  const fetchProblems = async () => {
    const params = {};
    if (filter.category) params.category = filter.category;
    if (filter.assignedTo) params.assignedTo = filter.assignedTo;

    const res = await axios.get('http://localhost:8080/api/problems', { params });
    setProblems(res.data);
  };

  useEffect(() => {
    fetchProblems();
  }, [filter]);

  return (
    <div className="container">
      <h1>Problem Tracker</h1>
      <div className="filters">
        <input placeholder="Filter by category" onChange={(e) => setFilter(f => ({ ...f, category: e.target.value }))} />
        <input placeholder="Filter by assigned to" onChange={(e) => setFilter(f => ({ ...f, assignedTo: e.target.value }))} />
      </div>
      <ProblemForm onRefresh={fetchProblems} />
      <ProblemList problems={problems} onRefresh={fetchProblems} />
    </div>
  );
}

export default ProblemsApp;
