import './App.css'; // Make sure Tailwind CSS is included
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Importing components for patient
import PatientNavbar from './components/patient/PatientNavbar'; // Patient Navbar component
import AdminNavbar from './components/AdminNavbar'; // Admin Navbar component
import Login from './components/patient/Login';
import Dashboard from './components/patient/Dashboard';
import Therapydashboard from './components/patient/Therapydashboard';

// Importing components for admin
import AddPatient from './components/AddPatient';
import GetAllPatients from './components/GetAllPatients';
import AddTherapist from './components/AddTherapist';
import GetAllTherapists from './components/GetAllTherapists';
import AddTherapy from './components/AddTherapy';
import GetAllTherapies from './components/GetAllTherapies';
import AdminLogin from './components/AdminLogin';
import UpdateTherapy from './components/UpdateTherapy';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const token = localStorage.getItem('token'); // Check if the token exists for admin
  const location = useLocation(); // Use useLocation to determine the current path
  const userType = localStorage.getItem('userType'); // Check the user type (admin or patient)

  // Conditionally render the appropriate Navbar based on user type
  const renderNavbar = () => {
    if(userType===null)return;
    if (userType === 'admin' && token && location.pathname !== '/admin-login') {
      return <AdminNavbar />; // Render Admin Navbar
    } else if (isLoggedIn || (userType === 'patient' && location.pathname !== '/')) {
      return <PatientNavbar />; // Render Patient Navbar
    }
    return null; // No Navbar for login routes
  };

  return (
    <div className="flex h-screen">
      {renderNavbar()} {/* Conditionally render the appropriate Navbar */}

      <div className="flex-grow">
        <Routes>
          {/* Patient Routes */}
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/therapydashboard" element={<Therapydashboard />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/add-patient" element={<ProtectedRoute element={<AddPatient />} />} />
          <Route path="/get-all-patients" element={<ProtectedRoute element={<GetAllPatients />} />} />
          <Route path="/add-therapy" element={<ProtectedRoute element={<AddTherapy />} />} />
          <Route path="/get-all-therapies" element={<ProtectedRoute element={<GetAllTherapies />} />} />
          <Route path="/add-therapist" element={<ProtectedRoute element={<AddTherapist />} />} />
          <Route path="/get-all-therapists" element={<ProtectedRoute element={<GetAllTherapists />} />} />
          <Route path="/update-therapy/:therapyId" element={<ProtectedRoute element={<UpdateTherapy />} />} />
        </Routes>
      </div>
    </div>
  );
}

// Wrap the App component with Router once at the top level
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;


