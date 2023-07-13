import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import JobListPage from './JobListPage';
import JobDetailPage from './JobDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/job-list" element={<JobListPage />} />
        <Route path="/job-detail/:id"  element={<JobDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;