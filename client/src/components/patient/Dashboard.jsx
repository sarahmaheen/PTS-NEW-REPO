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





















import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [therapies, setTherapies] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [dailyActivitiesTrackStatus, setDailyActivitiesTrackStatus] = useState([]);

  const fetchTherapiesAndTherapists = async (therapyIds, therapistIds) => {
    try {
      console.log(therapyIds,therapistIds)
      const therapyResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/therapiesArrayForPatient`, { therapyIds });
      console.log("kkkk",therapyResponse)
      setTherapies(therapyResponse.data);

      const therapistResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/therapistArrayForPatient`, { therapists: therapistIds });
      setTherapists(therapistResponse.data);
    } catch (error) {
      console.error('Error fetching therapies or therapists:', error);
    }
  };

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
        console.log(patientData)
        setPatientDetails(patientData);

        // Fetch therapies and therapists using their IDs
        console.log(patientData.therapyId, patientData.therapists)
        fetchTherapiesAndTherapists(patientData.therapyId, patientData.therapistArray);

        console.log("aaaaaaaaaaaaaaaaaaaaa",therapies)
        // Compare dailyActivitiesTrack with dailyActivities length

        // const trackStatus = therapies.dailyActivitiesTrack.map(index => {
        //   return index < therapies.dailyActivities.length ? 'Valid' : 'Invalid';
        // });
        console.log("lllllllllllllll",therapies.data)
        therapies.forEach(therapy => {
          const { dailyActivities, dailyActivitiesTrack } = therapy;
          console.log("mssssssssssssss",dailyActivities, dailyActivitiesTrack )
          // Check if dailyActivities and dailyActivitiesTrack exist
          if (dailyActivities && dailyActivitiesTrack) {
            // Loop through the dailyActivitiesTrack array
            dailyActivitiesTrack.forEach((activityIndex, idx) => {
              // Compare the activity index with the dailyActivities array length
              if (activityIndex >= 0 && activityIndex < dailyActivities.length) {
                console.log(`Therapy ID: ${therapy._id}`);
                console.log(`Index: ${activityIndex} - Activity: ${dailyActivities[activityIndex]}`);
              } else {
                console.log(`Therapy ID: ${therapy._id} - Invalid index: ${activityIndex}`);
              }
            });
          }
        });
        const trackStatus=[1,3,4,5,7];
        console.log(trackStatus)
        setDailyActivitiesTrackStatus(trackStatus);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  // Prepare data for bar chart (comparison of dailyActivitiesTrack)
  const barChartData = {
    labels: patientDetails?.dailyActivitiesTrack || [],
    datasets: [
      {
        label: 'Track Status',
        data: dailyActivitiesTrackStatus.map(status => (status === 'Valid' ? 1 : 0)), // 1 for valid, 0 for invalid
        backgroundColor: dailyActivitiesTrackStatus.map(status => (status === 'Valid' ? '#42a5f5' : '#ff5252')),
        borderColor: dailyActivitiesTrackStatus.map(status => (status === 'Valid' ? '#1e88e5' : '#e53935')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Welcome Back <span className="text-3xl">{patientDetails?.name || 'Loading...'}</span></h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
        {/* Bar Chart: Daily Activities Progress */}
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Daily Activities Track Status</h3>
          <Bar data={barChartData} />
        </div>

        {/* Other sections such as Therapy Goals, Daily Activities */}
        {/* Your existing sections go here */}
      </div>
    </div>
  );
};

export default Dashboard;
