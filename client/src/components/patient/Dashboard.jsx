// import React, { useEffect, useState } from 'react';
// import therapygoalsIMG from "../../assets/therapygoals.png";
// import dailyActivitiesIMG from "../../assets/dailyActivities.png";
// import devMilestoneIMG from "../../assets/developmentMilestones.png";
// import axios from 'axios';

// const Dashboard = () => {
//   const [patientName, setPatientName] = useState('');

//   // Fetch patient details
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         // console.log("ndejfnejwnfk",{process.env.REACT_APP_API_URL})
//         console.log(localStorage.getItem('token'))
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patient-details`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you have stored the token
//           }
//         });

//         setPatientName(response.data.name); // Set the patient's name from the response
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
//       <h2 className="text-2xl font-bold mb-4">Welcome Back <span className="text-3xl">{patientName || 'Loading...'}</span></h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
//         {/* Autism Level */}
//         <div className="bg-purple-500 text-white p-4 rounded-lg h-full flex flex-col justify-between mb-4">
//           <div className="flex justify-between items-center">
//             <p className="text-xl font-semibold">Autism Level</p>
//             <span className="text-3xl font-bold">1</span>
//           </div>
//           <div className="mt-2">
//             <input type="range" min="1" max="10" value="1" className="w-full slider-thumb bg-purple-700 rounded-lg" readOnly />
//           </div>
//         </div>

//         {/* Therapy Goals */}
//         <div className="bg-yellow-100 p-4 rounded-lg h-full flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Therapy Goals</p>
//           </div>
//           <div>
//             <img src={therapygoalsIMG} alt="Therapy Goals" className="h-12 w-12" />
//           </div>
//         </div>

//         {/* Daily Activities */}
//         <div className="bg-pink-100 p-4 rounded-lg h-full flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Daily Activities</p>
//           </div>
//           <div>
//             <img src={dailyActivitiesIMG} alt="Daily Activities" className="h-12 w-12" />
//           </div>
//         </div>

//         {/* Development Milestones */}
//         <div className="bg-green-100 p-4 rounded-lg h-full flex items-center">
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















// import React, { useEffect, useState } from 'react';
// import therapygoalsIMG from "../../assets/therapygoals.png";
// import dailyActivitiesIMG from "../../assets/dailyActivities.png";
// import devMilestoneIMG from "../../assets/developmentMilestones.png";
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import axios from 'axios';

// // Register chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const Dashboard = () => {
//   const [patientName, setPatientName] = useState('');
//   const [therapyData, setTherapyData] = useState([]);
//   const [completedDays, setCompletedDays] = useState(0);
//   const [assignedDays, setAssignedDays] = useState(0);
//   const [dailyActivities, setDailyActivities] = useState([]);
//   const [dailyActivitiesTrack, setDailyActivitiesTrack] = useState([]);

//   // Fetch patient and therapy details
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patient-details`, {
//           headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//         });

//         setPatientName(response.data.name);
//         const therapyIds = response.data.therapyId;
        
//         // Fetch therapy details using therapy IDs
//         const therapyResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/therapiesArrayForPatient`, { therapyIds });
//         const therapy = therapyResponse.data[0];  // Assuming you get an array and taking the first entry

//         setTherapyData(therapy);
//         setCompletedDays(therapy.dailyActivitiesTrack.length);
//         setAssignedDays(parseInt(therapy.assignedDays, 10));  // Parse assigned days
//         setDailyActivities(therapy.dailyActivities);
//         setDailyActivitiesTrack(therapy.dailyActivitiesTrack);
//       } catch (error) {
//         console.error('Error fetching patient/therapy details:', error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   // Data for pie chart
//   const pieData = {
//     labels: ['Days Completed', 'Days Left'],
//     datasets: [
//       {
//         data: [completedDays, assignedDays - completedDays],
//         backgroundColor: ['#FF6384', '#36A2EB'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB'],
//       },
//     ],
//   };

//   // Data for bar chart (daily activities completion)
//   const barData = {
//     labels: dailyActivities.map((_, index) => `Activity ${index + 1}`),
//     datasets: [
//       {
//         label: 'Completed Activities',
//         data: dailyActivities.map((_, index) => (dailyActivitiesTrack.includes(index + 1) ? 1 : 0)),
//         backgroundColor: '#FF6384',
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
//       <h2 className="text-2xl font-bold mb-4">
//         Welcome Back <span className="text-3xl">{patientName || 'Loading...'}</span>
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full mb-6">
//         {/* Autism Level */}
//         <div className="bg-purple-500 text-white p-4 rounded-lg h-full flex flex-col justify-between mb-4">
//           <div className="flex justify-between items-center">
//             <p className="text-xl font-semibold">Autism Level</p>
//             <span className="text-3xl font-bold">1</span>
//           </div>
//           <div className="mt-2">
//             <input type="range" min="1" max="10" value="1" className="w-full slider-thumb bg-purple-700 rounded-lg" readOnly />
//           </div>
//         </div>

//         {/* Therapy Goals */}
//         <div className="bg-yellow-100 p-4 rounded-lg h-full flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Therapy Goals</p>
//           </div>
//           <div>
//             <img src={therapygoalsIMG} alt="Therapy Goals" className="h-12 w-12" />
//           </div>
//         </div>

//         {/* Daily Activities */}
//         <div className="bg-pink-100 p-4 rounded-lg h-full flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Daily Activities</p>
//           </div>
//           <div>
//             <img src={dailyActivitiesIMG} alt="Daily Activities" className="h-12 w-12" />
//           </div>
//         </div>

//         {/* Development Milestones */}
//         <div className="bg-green-100 p-4 rounded-lg h-full flex items-center">
//           <div className="flex-1">
//             <p className="text-lg font-semibold">Development Milestones</p>
//           </div>
//           <div>
//             <img src={devMilestoneIMG} alt="Development Milestones" className="h-12 w-12" />
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
//         {/* Pie Chart */}
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-bold mb-4">Therapy Plan Completion</h3>
//           <Pie data={pieData} />
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-bold mb-4">Daily Activities Progress</h3>
//           <Bar data={barData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const Dashboard = () => {
//   const [patientDetails, setPatientDetails] = useState(null);
//   const [activityPercentages, setActivityPercentages] = useState([]);
  
//   // Fetch patient details
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patient-details`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         const patientData = response.data;
//         setPatientDetails(patientData);
//         calculateActivityPercentages(patientData);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   const calculateActivityPercentages = (patientData) => {
//     // Assuming therapyId corresponds to therapy activities
//     const percentages = patientData.therapyId.map((therapyId) => {
//       // Dummy calculation for example, replace with actual logic
//       return Math.random() * 100; // Replace with actual logic to calculate percentage
//     });
//     setActivityPercentages(percentages);
//   };

//   // Prepare data for bar chart (comparison of daily activities track)
//   const barChartData = {
//     labels: patientDetails?.therapy.map((therapy, index) => `Therapy ${index + 1}`) || [],
//     datasets: [
//       {
//         label: 'Activity Percentages',
//         data: activityPercentages,
//         backgroundColor: activityPercentages.map(value => (value >= 50 ? '#42a5f5' : '#ff5252')),
//         borderColor: '#1e88e5',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
//       {patientDetails ? (
//         <>
//           <h2 className="text-2xl font-bold mb-4">
//             Welcome Back <span className="text-3xl">{patientDetails.name}</span>
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
//             {/* Patient Profile Overview */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold mb-2">Patient Profile</h3>
//               <p>Email: {patientDetails.email}</p>
//               <p>Age: {patientDetails.age}</p>
//               <p>Condition: {patientDetails.condition}</p>
//               <p>Condition Level: {patientDetails.conditionLevel}</p>
//               <p>Booking Type: {patientDetails.bookingType}</p>
//               <p>Payment Amount: ${patientDetails.paymentAmount}</p>
//               <p>Payment Method: {patientDetails.paymentMethod}</p>
//             </div>

//             {/* Therapy Progress Tracking */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold mb-4">Therapy Progress</h3>
//               <Bar data={barChartData} />
//             </div>

//             {/* Therapist Information */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold mb-4">Therapists</h3>
//               <ul>
//                 {patientDetails.therapistArray.map((therapistId, index) => (
//                   <li key={index}>Therapist ID: {therapistId}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* Activity Log */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
//               <ul>
//                 {/* Mocking activity logs, replace with real data */}
//                 <li>Completed Speech Exercise</li>
//                 <li>Attended Behavioral Therapy</li>
//               </ul>
//             </div>
//           </div>
//         </>
//       ) : (
//         <p>Loading patient details...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [activityPercentages, setActivityPercentages] = useState([]);
  const [therapists, setTherapists] = useState([]); // State to hold therapists data

  // Fetch patient details
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patient-details`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const patientData = response.data;
        setPatientDetails(patientData);
        calculateActivityPercentages(patientData);

        // Fetch therapists for the patient
        await fetchTherapists(patientData.therapistArray);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  const fetchTherapists = async (therapistIds) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/therapistArrayForPatient`, { therapists: therapistIds });
      setTherapists(response.data); // Update the therapists state with the fetched data
    } catch (error) {
      console.error('Error fetching therapists:', error);
    }
  };

  const calculateActivityPercentages = (patientData) => {
    // Assuming therapyId corresponds to therapy activities
    const percentages = patientData.therapyId.map(() => {
      // Dummy calculation for example, replace with actual logic
      return Math.random() * 100; // Replace with actual logic to calculate percentage
    });
    setActivityPercentages(percentages);
  };

  // Prepare data for bar chart (comparison of daily activities track)
  const barChartData = {
    labels: patientDetails?.therapy.map((_, index) => `Therapy ${index + 1}`) || [],
    datasets: [
      {
        label: 'Activity Percentages',
        data: activityPercentages,
        backgroundColor: activityPercentages.map(value => (value >= 50 ? '#42a5f5' : '#ff5252')),
        borderColor: '#1e88e5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      {patientDetails ? (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Welcome Back <span className="text-3xl">{patientDetails.name}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
            {/* Patient Profile Overview */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Patient Profile</h3>
              <p>Email: {patientDetails.email}</p>
              <p>Age: {patientDetails.age}</p>
              <p>Condition: {patientDetails.condition}</p>
              <p>Condition Level: {patientDetails.conditionLevel}</p>
              <p>Booking Type: {patientDetails.bookingType}</p>
              <p>Payment Amount: ${patientDetails.paymentAmount}</p>
              <p>Payment Method: {patientDetails.paymentMethod}</p>
            </div>

            {/* Therapy Progress Tracking */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Therapy Progress</h3>
              <Bar data={barChartData} />
            </div>

            {/* Therapist Information */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Therapists</h3>
              <ul>
                {therapists.length > 0 ? (
                  therapists.map((therapist, index) => (
                    <li key={index}>Therapist Name: {therapist.name}</li> // Adjust based on therapist object structure
                  ))
                ) : (
                  <li>No therapists available.</li>
                )}
              </ul>
            </div>

            {/* Activity Log */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
              <ul>
                {/* Mocking activity logs, replace with real data */}
                <li>Completed Speech Exercise</li>
                <li>Attended Behavioral Therapy</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
};

export default Dashboard;
