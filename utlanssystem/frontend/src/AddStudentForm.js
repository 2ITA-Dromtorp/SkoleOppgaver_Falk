// AddStudentForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddStudentForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone_number: '',
    class: ''
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
    fetch('http://localhost:3001/addstudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Student added successfully!');
      } else {
        throw new Error('Failed to add student');
      }
    })
    .catch(error => {
      console.error('Error adding student:', error);
    });
  };

  return (
    <div className ="addstudentform">
      <h2>Add New Student</h2>
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
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div>
          <label>Class:</label>
          <input type="text" name="class" value={formData.class} onChange={handleChange} />
        </div>
        <button type="submit">Add Student</button>
        <Link to="/">Back to Equipment</Link> {/* Adding a link to navigate back to EquipmentList */}
      </form>
    </div>
  );
}

export default AddStudentForm;
