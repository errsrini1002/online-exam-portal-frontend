import React, { useEffect, useState } from 'react';

const subjects = ['Maths', 'VR', 'NVR', 'English'];

export default function StudyPlanTable({ studentId, role }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [plans, setPlans] = useState({});

  useEffect(() => {
    fetchPlans();
  }, [month, year]);

  const fetchPlans = async () => {
    try {
      const res = await fetch(`/api/daily-plans/${studentId}/${year}/${month}`);
      const data = await res.json();
      const planMap = {};
      data.forEach(plan => {
        const key = `${plan.date}_${plan.subject}`;
        planMap[key] = { ...plan };
      });
      setPlans(planMap);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
    }
  };

  const handleChange = (key, value) => {
    setPlans(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        content: value
      }
    }));
  };

  const handleUpdate = async (key) => {
    const plan = plans[key];
    try {
      const res = await fetch('/api/daily-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan)
      });
      if (!res.ok) throw new Error('Update failed');
      alert('Updated!');
    } catch (err) {
      console.error(err);
      alert('Error updating plan');
    }
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  const rows = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <h2>Daily Study Plan</h2>
      <label>
        Month:
        <input type="number" value={month} onChange={e => setMonth(+e.target.value)} />
      </label>
      <label>
        Year:
        <input type="number" value={year} onChange={e => setYear(+e.target.value)} />
      </label>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            {subjects.map(s => <th key={s}>{s}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(day => {
            const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return (
              <tr key={date}>
                <td>{date}</td>
                {subjects.map(subject => {
                  const key = `${date}_${subject}`;
                  const value = plans[key]?.content || '';
                  return (
                    <td key={key}>
                      {role === 'ADMIN' ? (
                        <>
                          <input
                            value={value}
                            onChange={e => handleChange(key, e.target.value)}
                          />
                          <button onClick={() => handleUpdate(key)}>Update</button>
                        </>
                      ) : (
                        <span>{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
