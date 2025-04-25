import React, { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm';
export default function InventoryList() {
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null);
  
    const fetchItems = async () => {
      const res = await fetch('http://localhost:8080/api/inventory-items');
      const data = await res.json();
      setItems(data);
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const getLevel = (present, required) => {
      if (present < required) return 'low';
      if (present - required < 5) return 'normal';
      return 'high';
    };
  
    const getColorClass = (level) => {
      if (level === 'low') return 'bg-red-400';
      if (level === 'normal') return 'bg-yellow-400';
      return 'bg-green-400';
    };
  
    const handleEdit = (item) => {
      setEditItem(item);
    };
  
    return (
      <div className="overflow-x-auto">
        <InventoryForm fetchItems={fetchItems} formData={editItem} />
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Item Code</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Qty Present</th>
              <th className="p-2 border">Qty Required</th>
              <th className="p-2 border">Level</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const level = getLevel(item.quantityPresent, item.quantityRequired);
              const color = getColorClass(level);
              return (
                <tr key={item.id}>
                  <td className="p-2 border">{item.itemCode}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border">{item.quantityPresent}</td>
                  <td className="p-2 border">{item.quantityRequired}</td>
                  <td className="p-2 border font-semibold uppercase">{level}</td>
                  <td className="p-2 border">
                    <div className={`w-4 h-4 rounded-full ${color}`}></div>
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-indigo-500 text-white rounded">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  