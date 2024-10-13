// import React from 'react';
// import therapygoalsIMG from "../assets/therapygoals.png"
// import dailyActivitiesIMG from "../assets/dailyActivities.png"
// import devMilestoneIMG from "../assets/developmentMilestones.png"

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center sm:items-start sm:flex-row sm:justify-center">
//       <div className="w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Welcome Back <span className="text-3xl">Mohsin</span></h2>

//         {/* Autism Level */}
//         <div className="bg-purple-500 text-white p-4 rounded-lg mb-4">
//           <div className="flex justify-between items-center">
//             <p className="text-xl font-semibold">Autism Level</p>
//             <span className="text-3xl font-bold">1</span>
//           </div>
//           <div className="mt-2">
//             <input type="range" min="1" max="10" value="1" className="w-full slider-thumb bg-purple-700 rounded-lg" readOnly />
//           </div>
//         </div>

//         {/* Therapy Goals */}
//         <div className="bg-yellow-100 p-4 rounded-lg mb-4 flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Therapy Goals</p>
//           </div>
//           <div>
//             <img src={therapygoalsIMG} alt="Therapy Goals" className="h-12 w-12" />
//           </div>
//         </div>

//         {/* Daily Activities */}
//         <div className="bg-pink-100 p-4 rounded-lg mb-4 flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Daily Activities</p>
//           </div>
//           <div>
//             <img src={dailyActivitiesIMG} alt="Daily Activities" className="h-12 w-12" />
//           </div>
//         </div>

//         {/* Development Milestones */}
//         <div className="bg-green-100 p-4 rounded-lg flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Development Milestones</p>
//           </div>
//           <div>
//             <img src={devMilestoneIMG} alt="Development Milestones" className="h-12 w-12" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


























import React, { useEffect, useState } from 'react';
import therapygoalsIMG from "../assets/therapygoals.png";
import dailyActivitiesIMG from "../assets/dailyActivities.png";
import devMilestoneIMG from "../assets/developmentMilestones.png";
import axios from 'axios';

const Dashboard = () => {
  const [patientName, setPatientName] = useState('');

  // Fetch patient details
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        console.log(localStorage.getItem('token'))
        const response = await axios.get('http://localhost:3001/api/patient-details', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you have stored the token
          }
        });

        setPatientName(response.data.name); // Set the patient's name from the response
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Welcome Back <span className="text-3xl">{patientName || 'Loading...'}</span></h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
        {/* Autism Level */}
        <div className="bg-purple-500 text-white p-4 rounded-lg h-full flex flex-col justify-between mb-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Autism Level</p>
            <span className="text-3xl font-bold">1</span>
          </div>
          <div className="mt-2">
            <input type="range" min="1" max="10" value="1" className="w-full slider-thumb bg-purple-700 rounded-lg" readOnly />
          </div>
        </div>

        {/* Therapy Goals */}
        <div className="bg-yellow-100 p-4 rounded-lg h-full flex items-center">
          <div className="flex-1">
            <p className="text-lg font-semibold">Therapy Goals</p>
          </div>
          <div>
            <img src={therapygoalsIMG} alt="Therapy Goals" className="h-12 w-12" />
          </div>
        </div>

        {/* Daily Activities */}
        <div className="bg-pink-100 p-4 rounded-lg h-full flex items-center">
          <div className="flex-1">
            <p className="text-lg font-semibold">Daily Activities</p>
          </div>
          <div>
            <img src={dailyActivitiesIMG} alt="Daily Activities" className="h-12 w-12" />
          </div>
        </div>

        {/* Development Milestones */}
        <div className="bg-green-100 p-4 rounded-lg h-full flex items-center">
          <div className="flex-1">
            <p className="text-lg font-semibold">Development Milestones</p>
          </div>
          <div>
            <img src={devMilestoneIMG} alt="Development Milestones" className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
