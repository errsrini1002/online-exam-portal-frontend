import React, { useState } from 'react';
export default function InventoryForm({ fetchItems }) {
    const [form, setForm] = useState({
      id: null,
      itemCode: '',
      description: '',
      categoryId: 1,
      quantityPresent: 0,
      quantityRequired: 0
    });
  
    const handleChange = e => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async e => {
      e.preventDefault();
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id
        ? `http://localhost:8080/api/inventory-items/${form.id}`
        : 'http://localhost:8080/api/inventory-items';
  
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ id: null, itemCode: '', description: '', categoryId: 1, quantityPresent: 0, quantityRequired: 0 });
      fetchItems();
    };
  
    return (
      <form className="bg-white p-4 shadow-md rounded-xl mb-8 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
        <input name="itemCode" value={form.itemCode} onChange={handleChange} placeholder="Item Code" className="border p-2 rounded" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <select name="categoryId" value={form.categoryId} onChange={handleChange} className="border p-2 rounded">
          <option value={1}>Fruits</option>
          <option value={2}>Vegetables</option>
        </select>
        <input type="number" name="quantityPresent" value={form.quantityPresent} onChange={handleChange} placeholder="Present Qty" className="border p-2 rounded" />
        <input type="number" name="quantityRequired" value={form.quantityRequired} onChange={handleChange} placeholder="Required Qty" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{form.id ? 'Update' : 'Add'} Item</button>
      </form>
    );
  }