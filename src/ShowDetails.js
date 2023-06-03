import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function stripHtmlTags(text) {
  if (!text) {
    return '';
  }
  return text.replace(/<[^>]+>/g, '');
}

function ShowDetails() {
  const { showId } = useParams();
  const [show, setShow] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [userName, setUserName] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        const showData = response.data;
        setShow(showData);
      } catch (error) {
        console.error('Error fetching show summary:', error);
      }
    };

    fetchSummary();
  }, [showId]);
  const handleFormOpen = () => {
    setFormOpen(true);
  };
  const handleFormSubmit = (e) => {
    const storedUserData = localStorage.getItem('phoneNumber');
    localStorage.setItem('userName', userName);
    localStorage.setItem('phoneNumber', phoneNumber);
    if (phoneNumber.trim() === '' || userName.trim() === '') {
      alert('Please fill in all fields!');
      e.preventDefault();
      return;
    }
    if (phoneNumber.length!=10){
      alert("invalid Number")
      e.preventDefault();
    }
    if (storedUserData && storedUserData == phoneNumber) {
    alert('User data already exists in session storage!');
    e.preventDefault();

  }

    else alert('Form submitted!');
    console.log(phoneNumber)
    console.log(storedUserData)
    setFormOpen(false)

  };
  // useEffect(() => {
  //   // Retrieve user details from storage on component mount
  //   const storedUserName = localStorage.getItem('userName');
  //   const storedPhoneNumber = localStorage.getItem('phoneNumber');
  //   if (storedUserName && storedPhoneNumber) {
  //     setUserName(storedUserName);
  //     setPhoneNumber(storedPhoneNumber);
  //   }
  // }, []);


  return (
    <div class="dark style">
      <center><section class='two'>

      <h1>{show.name}</h1>
      <p>{stripHtmlTags(show.summary)}</p></section>
      <section class="one">
      {formOpen ? (
        <div class="login-box">
    <h2>Book Tickets</h2>
<center>
    <form>
      <div class="user-box">
        <input type="text" value={show.name} disabled />
      </div>
      <div class="user-box">
         <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <label>User Name</label>
      </div>
      <div class="user-box">
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <label>Phone Number</label>
      </div>
      <a onClick={handleFormSubmit}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form></center>
  </div> ): (<button class="form-submit" onClick={handleFormOpen}>Book Ticket</button>)}</section>
</center></div>
  );
}

export default ShowDetails;

// {formOpen ? (
//   <div class="login-box">
//   <form onSubmit={handleFormSubmit}>
//      <div class="user-box">
//     <h3>Book Movie Ticket</h3>
//     <label>
//       Movie Name:
//       <input type="text" value={show.name} disabled />
//     </label></div><div class="user-box">
//     <label>
//       Your Name:
//       <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
//     </label></div>
//   <br /><div class="user-box">
//     <label>
//       Phone Number:
//       <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//     </label></div>
//     <br />
//     <br />
//       <span></span>
//   <span></span>
//   <span></span>
//   <span></span>
//     <button type="submit">Submit</button>
//   </form></div>
// ) : (
//   <button onClick={handleFormOpen}>Book Ticket</button>
// )}
