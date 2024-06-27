import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const Navigate = useNavigate();

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
      .then(() => Navigate.push('/'))
      .catch(error => console.error('Error updating task:', error));
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields similar to RegisterForm with value={formData[fieldName]} */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTask;
