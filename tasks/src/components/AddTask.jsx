import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: 'title',
    firstName: '',
    lastName: '',
    position: 'position',
    company: '',
    business: '',
    employees: 'employees',
    street: '',
    additional: '',
    zip: '',
    place: 'place',
    country: 'country',
    code: '',
    phone: '',
    email: '',
    termsAccepted: false,
  });
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', formData)
      .then(() => Navigate.push('/'))
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields similar to RegisterForm */}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
