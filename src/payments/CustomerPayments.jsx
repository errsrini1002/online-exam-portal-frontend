import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { config } from '../ConsantsFile/Constants';

const url = config.url.BASE_URL;


const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");


const CustomerPayments = () => {
    const [payments, setPayments] = useState([]);
    const [form, setForm] = useState({
      customerCode: '',
      name: '',
      description: '',
      monthlyPayment: '',
      dateOfPayment: '',
      remarks: '',
    });
    const [editId, setEditId] = useState(null);
  
    //const apiUrl = 'http://localhost:8080/api/payments';
    const apiUrl = url + "/payments";
  
    const fetchPayments = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log('Fetched payments:', data);
        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]);
      }
    };
  
    useEffect(() => {
      fetchPayments();
    }, []);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${apiUrl}/${editId}` : apiUrl;
  
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      setForm({
        customerCode: '',
        name: '',
        description: '',
        monthlyPayment: '',
        dateOfPayment: '',
        remarks: '',
      });
      setEditId(null);
      fetchPayments();
    };
  
    const handleDelete = async (sno) => {
      await fetch(`${apiUrl}/${sno}`, { method: 'DELETE' });
      fetchPayments();
    };
  
    const handleEdit = (payment) => {
      setForm(payment);
      setEditId(payment.sno);
    };
  
    return (
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Customer Payments</h1>
  
        {/* Payment Form */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <Input name="customerCode" placeholder="Customer Code" value={form.customerCode} onChange={handleChange} />
              <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
              <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              <Input type="number" name="monthlyPayment" placeholder="Monthly Payment" value={form.monthlyPayment} onChange={handleChange} />
              <Input type="date" name="dateOfPayment" value={form.dateOfPayment} onChange={handleChange} />
              <Input name="remarks" placeholder="Remarks" value={form.remarks} onChange={handleChange} />
              <Button type="submit" className="col-span-2">{editId ? 'Update Payment' : 'Add Payment'}</Button>
            </form>
          </CardContent>
        </Card>
  
        {/* Payment List */}
        <div className="overflow-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">#</th>
                <th className="p-2">Code</th>
                <th className="p-2">Name</th>
                <th className="p-2">Desc</th>
                <th className="p-2">Monthly</th>
                <th className="p-2">Date</th>
                <th className="p-2">Remarks</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p.sno} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{p.customerCode}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.description}</td>
                  <td className="p-2">${p.monthlyPayment}</td>
                  <td className="p-2">{p.dateOfPayment}</td>
                  <td className="p-2">{p.remarks}</td>
                  <td className="p-2 space-x-2">
                    <Button onClick={() => handleEdit(p)} className="bg-yellow-500 hover:bg-yellow-600">Edit</Button>
                    <Button onClick={() => handleDelete(p.sno)} variant="destructive">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CustomerPayments;



