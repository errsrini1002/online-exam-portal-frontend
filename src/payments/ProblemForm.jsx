import React, { useState } from 'react';
import axios from 'axios';

function ProblemForm({ onRefresh }) {
  const [form, setForm] = useState({ problem: '', solution: '', assignedTo: '', actionBy: '', category: '', comments: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/problems', form);
    setForm({ problem: '', solution: '', assignedTo: '', actionBy: '', category: '', comments: '' });
    onRefresh();
  };

  return (
    <form className="problem-form" onSubmit={handleSubmit}>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      <button type="submit">Add Problem</button>
    </form>
  );
}

export default ProblemForm;
