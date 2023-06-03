import React, { useState } from 'react';

function BookingForm({ showName }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user details to local storage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    // Clear form fields
    setName('');
    setEmail('');
    alert(`Ticket booked for ${showName}!`);
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
}

export default BookingForm;
