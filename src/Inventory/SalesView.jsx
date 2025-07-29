import { useState } from 'react';
import axios from 'axios';

export default function SalesView() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const response = await axios.get(`http://localhost:8080/api/sales?month=${month}&year=${year}`);
    setRecords(response.data);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    if (isNaN(date)) return rawDate; // fallback for invalid date
    return date.toLocaleDateString('en-GB'); // returns DD/MM/YYYY
  };

  const totalSales = records.reduce((acc, r) => acc + (r.totalAmount || 0), 0);

  return (
    <div className="sales-view">
      <input type="number" placeholder="Month" onChange={e => setMonth(e.target.value)} />
      <input type="number" placeholder="Year" onChange={e => setYear(e.target.value)} />
      <button onClick={fetchRecords}>Fetch Sales</button>

      <table>
        <thead>
          <tr>
            <th>Date</th><th>Till1</th><th>Till2</th><th>Card</th><th>Payments</th><th>Closed By</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
             <td>{formatDate(r.billDate)}</td><td>{r.till1Amount}</td><td>{r.till2Amount}</td>
              <td>{r.cardAmount}</td><td>{r.payments}</td><td>{r.closedBy}</td><td>{r.totalAmount}</td>
            </tr>
          ))}
          {records.length > 0 && (
            <tr className="total-row">
              <td colSpan="6"><b>Total Sales:</b></td>
              <td><b>{totalSales.toFixed(2)}</b></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
