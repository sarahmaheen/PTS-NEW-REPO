// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(email,password)
//       const response = await axios.post('http://localhost:3001/api/patient-login', { email, password });
//       console.log('Login Success:', response.data);
//       // You can handle the token or redirect the user here
//       localStorage.setItem('token', response.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//       console.error('Login Error:', err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-4">Yippy! You’re Back!</h2>
//         <p className="text-gray-500 text-center mb-6">We are happy to see you back</p>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input 
//               type="email" 
//               placeholder="Email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded-md outline-none focus:border-purple-500" 
//               required
//             />
//           </div>
//           <div>
//             <input 
//               type="password" 
//               placeholder="Your Password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} 
//               className="w-full p-3 border rounded-md outline-none focus:border-purple-500" 
//               required
//             />
//           </div>
//           <div className="flex justify-between">
//             <a href="#" className="text-sm text-purple-600">Forgot Password?</a>
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition"
//           >
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;












import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post('http://localhost:3001/api/patient-login', { email, password });
      console.log('Login Success:', response.data);
      // Store the token and navigate to the dashboard
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true); // Set login state to true
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-4">Yippy! You’re Back!</h2>
        <p className="text-gray-500 text-center mb-6">We are happy to see you back</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition" 
              required
              aria-label="Email"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Your Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition" 
              required
              aria-label="Password"
            />
          </div>
          <div className="flex justify-between">
            <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
