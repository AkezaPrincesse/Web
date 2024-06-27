import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    business: '',
    employees: '',
    street: '',
    additional: '',
    zip: '',
    place: '',
    country: '',
    code: '',
    phone: '',
    email: '',
    termsAccepted: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, formData)
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company</label>
          <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
