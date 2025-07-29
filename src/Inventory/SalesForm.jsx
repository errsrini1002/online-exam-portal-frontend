import { useState } from 'react';
import axios from 'axios';


export default function SalesForm() {
  const [form, setForm] = useState({
    billDate: '',
    till1Amount: '',
    till2Amount: '',
    cardAmount: '',
    payments: '',
    closedBy: '',
    comments: '',
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const totalAmount =
      parseFloat(form.till1Amount || 0) +
      parseFloat(form.till2Amount || 0) +
      parseFloat(form.cardAmount || 0);

      await axios.post('http://localhost:8080/api/sales', { ...form, totalAmount });
    alert('Sale recorded successfully');
    setForm({});
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="date" name="billDate" onChange={handleChange} required />
      <input name="till1Amount" placeholder="Till 1" onChange={handleChange} />
      <input name="till2Amount" placeholder="Till 2" onChange={handleChange} />
      <input name="cardAmount" placeholder="Card" onChange={handleChange} />
      <input name="payments" placeholder="Payments" onChange={handleChange} />
      <input name="closedBy" placeholder="Closed By" onChange={handleChange} />
      <textarea name="comments" placeholder="Comments" onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
