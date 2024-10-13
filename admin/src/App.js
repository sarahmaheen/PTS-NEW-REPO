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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Handle patient login state
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





// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Navbar from "./components/Navbar"; // The Navbar component
// // import AddPatient from "./AddPatient"; // Placeholder components
// // import GetAllPatients from "./GetAllPatients";
// // import AddTherapy from "./AddTherapy";
// // import GetAllTherapies from "./GetAllTherapies";
// // import AddTherapist from "./AddTherapist";
// // import GetAllTherapists from "./GetAllTherapists";

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Navbar />
// //         <Routes>
// //           <Route path="/add-patient" element={<AddPatient />} />
// //           <Route path="/get-all-patients" element={<GetAllPatients />} />
// //           <Route path="/add-therapy" element={<AddTherapy />} />
// //           <Route path="/get-all-therapies" element={<GetAllTherapies />} />
// //           <Route path="/add-therapist" element={<AddTherapist />} />
// //           <Route path="/get-all-therapists" element={<GetAllTherapists />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

















// import React from "react";
// import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar"; // The Navbar component
// import AddPatient from "./components/AddPatient"; // Placeholder components
// import GetAllPatients from "./components/GetAllPatients";
// import AdminLogin from "./components/AdminLogin"; // Import the AdminLogin component
// import ProtectedRoute from "./ProtectedRoute.js"; // Import the ProtectedRoute component

// function App() {

//   const token = localStorage.getItem("token"); // Check if the token exists
//   const location = useLocation();


//   return (
//     // <Router>
//       <div className="App">
//         {/* <Navbar /> */}
//         {token && location.pathname !== "/" && <Navbar />}
//         <Routes>
//           {/* Public Route for Admin Login */}
//           <Route path="/" element={<AdminLogin />} />
          
//           {/* Protected Routes */}
//           <Route path="/add-patient" element={<ProtectedRoute element={<AddPatient />} />} />
//           <Route path="/get-all-patients" element={<ProtectedRoute element={<GetAllPatients />} />} />
//           {/* Add additional protected routes here */}
//           {/* <Route path="/add-therapy" element={<ProtectedRoute element={<AddTherapy />} />} /> */}
//           {/* <Route path="/get-all-therapies" element={<ProtectedRoute element={<GetAllTherapies />} />} /> */}
//           {/* <Route path="/add-therapist" element={<ProtectedRoute element={<AddTherapist />} />} /> */}
//           {/* <Route path="/get-all-therapists" element={<ProtectedRoute element={<GetAllTherapists />} />} /> */}
//         </Routes>
//       </div>
//     // </Router>
//   );
// }

// export default App;

































// import React from "react";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar"; // The Navbar component
// import AddPatient from "./components/AddPatient"; // AddPatient component
// import GetAllPatients from "./components/GetAllPatients"; // GetAllPatients component
// import AddTherapist from "./components/AddTherapist";
// import GetAllTherapists from "./components/GetAllTherapists";
// import AddTherapy from "./components/AddTherapy";
// import GetAllTherapies from "./components/GetAllTherapies";
// import AdminLogin from "./components/AdminLogin"; // Import the AdminLogin component
// import UpdateTherapy from "./components/UpdateTherapy";
// import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
// import AdminDashboard from "./components/AdminDashboard"


// const App = () => {
//   const token = localStorage.getItem("token"); // Check if the token exists
//   const location = useLocation(); // Use useLocation to determine the current path

//   return (
//     <div className="flex h-screen">
//       {/* Show Navbar only if there is a token and the user is not on the login page */}
//       {token && location.pathname !== "/" && <Navbar />}
//       <div className="flex-grow p-4 overflow-y-auto"> {/* Content area that grows with available space */}
//         <Routes>
//           {/* Public Route for Admin Login */}
//           <Route path="/" element={<AdminLogin />} />
          
//           {/* Protected Routes */}
//           <Route path="/add-patient" element={<ProtectedRoute element={<AddPatient />} />} />
//           <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
//           <Route path="/get-all-patients" element={<ProtectedRoute element={<GetAllPatients />} />} />
//           <Route path="/add-therapy" element={<ProtectedRoute element={<AddTherapy />} />} />
//           <Route path="/get-all-therapies" element={<ProtectedRoute element={<GetAllTherapies />} />} />
//           <Route path="/add-therapist" element={<ProtectedRoute element={<AddTherapist />} />} />
//           <Route path="/get-all-therapists" element={<ProtectedRoute element={<GetAllTherapists />} />} />
//           <Route path="/update-therapy/:therapyId" element={<UpdateTherapy />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// // Wrap App component with Router
// const WrappedApp = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default WrappedApp;










