
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Therapydashboard from './components/Therapydashboard';
// function App() {
//   return (
//     <div className="App">
//        <Router>
//         <Routes>
//           {/* Define a route for the Login component */}
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard/>}/>
//           <Route path="/therapydashboard" element={<Therapydashboard/>}/>
//           {/* You can add more routes for other components as needed */}
//         </Routes>
//       </Router>
      
//     </div>
//   );
// }

// export default App;










import './App.css'; // Make sure Tailwind CSS is included
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Therapydashboard from './components/Therapydashboard';
import Navbar from './components/Navbar'; // Import Navbar
import { useState } from 'react'; // For controlling login state

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Handle login state

  return (
    <div className="flex h-screen">
      <Router>
        {isLoggedIn && <Navbar />} {/* Show navbar only when logged in */}
        <div className="flex-grow">
          <Routes>
            {/* Define a route for the Login component */}
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/therapydashboard" element={<Therapydashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
