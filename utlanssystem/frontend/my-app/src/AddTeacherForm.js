//AddTeacherForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddTeacherForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
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
    fetch('http://localhost:3001/addteacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Teacher added successfully!');
      } else {
        throw new Error('Failed to add teacher');
      }
    })
    .catch(error => {
      console.error('Error adding teacher:', error);
    });
  };

  return (
    <div>
      <h2>Add New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <button type="submit">Add Teacher</button>
        <Link to="/">Back to Equipment</Link> {/* Adding a link to navigate back to EquipmentList */}
      </form>
    </div>
  );
}

export default AddTeacherForm;
