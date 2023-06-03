import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './ShowList';
import ShowDetails from './ShowDetails';
import BookingForm from './BookingForm';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/details/:showId" element={<ShowDetails />} />
          <Route path="/booking/:showId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
