// AddEquipment.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddEquipment() {
  const [formData, setFormData] = useState({
    equipment_type: '',
    specifications: '',
    imagelink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/addequipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Equipment added successfully!');
      } else {
        throw new Error('Failed to add equipment');
      }
    })
    .catch(error => {
      console.error('Error adding equipment:', error);
    });
  };

  return (
    <div>
      <h2>Add New Equipment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Equipment Type:</label>
          <input type="text" name="equipment_type" value={formData.equipment_type} onChange={handleChange} />
        </div>
        <div>
          <label>Specifications:</label>
          <input type="text" name="specifications" value={formData.specifications} onChange={handleChange} />
        </div>
        <div>
          <label>Image link:</label>
          <input type="text" name="imagelink" value={formData.imagelink} onChange={handleChange} />
        </div>
        <button type="submit">Add Equipment</button>
        <Link to="/">Back to Equipment</Link>
      </form>
    </div>
  );
}

export default AddEquipment;
