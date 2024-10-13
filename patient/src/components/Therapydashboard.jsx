// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import axios from 'axios';
// // import './Therapydashboard.css'; // Importing for tailwind CSS

// function Therapydashboard() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [patientDetails, setPatientDetails] = useState(null);
//   const [therapyDetails, setTherapyDetails] = useState([]);
//   const [selectedTherapy, setSelectedTherapy] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch patient details when the component mounts
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/patient-details', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}` // Get the token from localStorage
//           }
//         });
//         console.log(response)
//         setPatientDetails(response.data); // Set patient details
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         setError('Could not fetch patient details');
//       }
//     };
    
//     fetchPatientDetails();
//   }, []);

//   // Fetch therapy details
//   const fetchTherapies = async (therapyIds) => {
//     try {
//         console.log("ccccccccccccccccccccccccccccc",therapyIds)
//       const response = await axios.post('http://localhost:3001/api/therapiesArrayForPatient', { therapyIds });
//       console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",response)
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching therapies:', error);
//       setError('Could not fetch therapies');
//       return [];
//     }
//   };

//   // Calculate the difference in days between two dates
// //   const getDaysDifference = (firstLoginDate, selectedDate) => {
// //     const loginDate = new Date(firstLoginDate);
// //     const clickedDate = new Date(selectedDate);
// //     const timeDiff = clickedDate.getTime() - loginDate.getTime();
// //     console.log(timeDiff)
// //     return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert time difference to days
// //   };

// const getDaysDifference = (firstLoginDate, selectedDate) => {
//     // Normalize the dates to midnight to avoid time differences
//     const loginDate = new Date(firstLoginDate);
//     const clickedDate = new Date(selectedDate);
  
//     // Get the UTC time for both dates
//     const utc1 = Date.UTC(loginDate.getFullYear(), loginDate.getMonth(), loginDate.getDate());
//     const utc2 = Date.UTC(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate());
  
//     // Calculate the difference in days
//     const dayDifference = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
//   console.log(dayDifference)
//     return dayDifference;
//   };
  


//   // Handle calendar date selection
//   const handleCalendarClick = async (date) => {
//     setSelectedDate(date); // Update the selected date
//     setError(''); // Clear previous errors
    
//     if (!patientDetails) return;

//     const { firstLoginDate, therapyId, therapyCompletedDays } = patientDetails;


//     console.log(firstLoginDate)
//     const daysPassed = getDaysDifference(firstLoginDate, date);
//     let therapyDaysCompleted = therapyCompletedDays;

//     // Fetch all therapy details
//     const therapies = await fetchTherapies(therapyId);
    
//     let cumulativeDays = 0;
//     let variableTherapy = null;
  
//     // Iterate through the therapies array
//     for (let therapy of therapies) {
//       cumulativeDays += therapy.assignedDays; // Add the current therapy's assignedDays
      
//       // Check if cumulativeDays is greater than or equal to daysPassed
//       if (cumulativeDays >= daysPassed) {
//         variableTherapy = therapy
//         console.log("storedddddddddddddddddddddddd",variableTherapy)
//         setSelectedTherapy(therapy); // Select the current therapy
//         console.log("mmmmmmmmmmmmmmkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",selectedTherapy)
//         break; // Stop iteration when the condition is met
//       }
//     }

//     // const forAssignedDays = 
//     console.log("selected therapy",selectedTherapy)
//     console.log("llllllllllllllllllllllllllllllllllllll",therapies)
//     // Calculate total therapy days completed
//     therapies.forEach(therapy => {
//       therapyDaysCompleted += therapy.duration; // Assuming therapy has a duration field
//     });

//     // If therapy days completed is greater than or equal to the days passed, show therapies
//     if (therapyDaysCompleted >= daysPassed) {
//       setTherapyDetails(therapies);
//     } else {
//       setTherapyDetails([]);
//       setError("No therapies available for this date.");
//     }
//   };

//   return (
//     // <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//     //   <h1 className="text-4xl font-bold mb-10 text-gray-800">Therapy Goals</h1>

//     //   {/* Calendar Picker */}
//     //   <div className="bg-white shadow-md p-6 rounded-md mb-8">
//     //     <DatePicker
//     //       selected={selectedDate}
//     //       onChange={handleCalendarClick}
//     //       inline
//     //       className="w-full text-lg"
//     //     />
//     //   </div>

//     //   {/* Display Patient Details */}
//     //   {patientDetails ? (
//     //     <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md mb-8">
//     //       <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//     //         {patientDetails.name}'s Therapy Goals
//     //       </h2>
//     //       <p className="text-gray-600">
//     //         First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
//     //       </p>
//     //       <p className="text-gray-600">
//     //         Therapy Completed Days: {patientDetails.therapyCompletedDays}
//     //       </p>
//     //     </div>
//     //   ) : (
//     //     <p className="text-red-500 mb-8">Loading patient details...</p>
//     //   )}

//     //   {/* Display Therapy Details */}
//     //   <div className="bg-white shadow-md p-6 rounded-md w-full max-w-lg">
//     //     {error && <p className="text-red-500 mb-4">{error}</p>}
//     //     {therapyDetails.length > 0 ? (
//     //       <ul>
//     //         {therapyDetails.map((therapy, index) => (
//     //           <li key={index} className="mb-4">
//     //             <h3 className="text-lg font-semibold text-gray-700">{therapy.name}</h3>
//     //             <p className="text-gray-600">{therapy.description}</p>
//     //             <p className="text-gray-600">Duration: {therapy.duration} days</p>
//     //           </li>
//     //         ))}
//     //       </ul>
//     //     ) : (
//     //       <p className="text-gray-500">Select a date to view therapy details</p>
//     //     )}
//     //   </div>
//     // </div>







//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//     <h1 className="text-4xl font-bold mb-10 text-gray-800">Therapy Goals</h1>

//     {/* Calendar Picker */}
//     <div className="bg-white shadow-md p-6 rounded-md mb-8">
//         <DatePicker
//             selected={selectedDate}
//             onChange={handleCalendarClick}
//             inline
//             className="w-full text-lg"
//         />
//     </div>

//     {/* Display Patient Details */}
//     {patientDetails ? (
//         <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md mb-8">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                 {patientDetails.name}'s Therapy Goals
//             </h2>
//             <p className="text-gray-600">
//                 First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
//             </p>
//             <p className="text-gray-600">
//                 Therapy Completed Days: {patientDetails.therapyCompletedDays}
//             </p>
//         </div>
//     ) : (
//         <p className="text-red-500 mb-8">Loading patient details...</p>
//     )}

//     {/* Display Therapy Details */}
//     {/* <div className="bg-white shadow-md p-6 rounded-md w-full max-w-lg">
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {therapyDetails.length > 0 ? (
//             <ul>
//                 {therapyDetails.map((therapy, index) => (
//                     <li key={index} className="mb-4">
//                         <h3 className="text-lg font-semibold text-gray-700">{therapy.name}</h3>
//                         <p className="text-gray-600">{therapy.description}</p>
//                         <p className="text-gray-600">Duration: {therapy.duration} days</p>
//                     </li>
//                 ))}
//             </ul>
//         ) : (
//             <p className="text-gray-500">Select a date to view therapy details</p>
//         )}
//     </div> */}

//     {/* Display Selected Therapy Details */}
//     {selectedTherapy && (
//         <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md mt-8">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700">Selected Therapy</h2>
//             <p className="text-gray-600">Name: {selectedTherapy.name}</p>
//             <p className="text-gray-600">Description: {selectedTherapy.description}</p>
//             <p className="text-gray-600">Assigned Days: {selectedTherapy.assignedDays}</p>
//         </div>
//     )}
// </div>
//   );
// }

// export default Therapydashboard;














































// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import "./Therapydashboard.css";
// import axios from 'axios';

// function Therapydashboard() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [patientDetails, setPatientDetails] = useState(null);
//   const [selectedTherapy, setSelectedTherapy] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch patient details when the component mounts
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/patient-details', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setPatientDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         setError('Could not fetch patient details');
//       }
//     };
    
//     fetchPatientDetails();
//   }, []);

//   // Calculate the difference in days between two dates
//   const getDaysDifference = (firstLoginDate, selectedDate) => {
//     const loginDate = new Date(firstLoginDate);
//     const clickedDate = new Date(selectedDate);
//     const utc1 = Date.UTC(loginDate.getFullYear(), loginDate.getMonth(), loginDate.getDate());
//     const utc2 = Date.UTC(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate());
//     return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
//   };



//   const fetchTherapies = async (therapyIds) => {
//     try {
//         console.log("ccccccccccccccccccccccccccccc",therapyIds)
//       const response = await axios.post('http://localhost:3001/api/therapiesArrayForPatient', { therapyIds });
//       console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",response)
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching therapies:', error);
//       setError('Could not fetch therapies');
//       return [];
//     }
//   };
//   // Handle calendar date selection
//   const handleCalendarClick = async (date) => {
//     setSelectedDate(date);
//     setError('');

//     if (!patientDetails) return;

//     const { firstLoginDate, therapyId, therapyCompletedDays } = patientDetails;
//     const daysPassed = getDaysDifference(firstLoginDate, date);
//     let therapyDaysCompleted = therapyCompletedDays;

//     const therapies = await fetchTherapies(therapyId);
//     let cumulativeDays = 0;

//     for (let therapy of therapies) {
//       cumulativeDays += therapy.assignedDays;
//       if (cumulativeDays >= daysPassed) {
//         setSelectedTherapy(therapy);
//         break;
//       }
//     }

//     // if (therapyDaysCompleted >= daysPassed) {
//     //   setTherapyDetails(therapies);
//     // } else {
//     //   setTherapyDetails([]);
//     //   setError("No therapies available for this date.");
//     // }
//   };

//   // Calculate max date (therapy completed days)
//   const calculateMaxDate = (firstLoginDate, therapyCompletedDays) => {
//     const loginDate = new Date(firstLoginDate);
//     return new Date(loginDate.setDate(loginDate.getDate() + therapyCompletedDays));
//   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
// //       <h1 className="text-4xl font-bold mb-10 text-gray-800">Therapy Goals</h1>

// //       {/* Calendar Picker */}
// //       {/* <div className="bg-white shadow-md p-6 rounded-md mb-8 w-full max-w-lg">
// //         {patientDetails && (
// //           <DatePicker
// //             selected={selectedDate}
// //             onChange={handleCalendarClick}
// //             inline
// //             className="w-full text-lg"
// //             minDate={new Date(patientDetails.firstLoginDate)} // Restrict to first login date
// //             maxDate={calculateMaxDate(patientDetails.firstLoginDate, patientDetails.therapyCompletedDays)} // Restrict to therapyCompletedDays
// //           />
// //         )}
// //       </div> */}






// // {/* <div className="bg-white shadow-md p-6 rounded-md mb-8 w-full max-w-lg">
// //         {patientDetails && (
// //           <DatePicker
// //             selected={selectedDate}
// //             onChange={handleCalendarClick}
// //             inline
// //             className="w-full text-lg"
// //             minDate={new Date(patientDetails.firstLoginDate)} // Restrict to first login date
// //             maxDate={calculateMaxDate(patientDetails.firstLoginDate, patientDetails.therapyCompletedDays)} // Restrict to therapyCompletedDays
// //           />
// //         )}
// //       </div> */}












// //       {/* Horizontal Scroll Calendar */}
// //       <div className="bg-white shadow-md p-6 rounded-md mb-8 w-full max-w-lg">
// //         {patientDetails && (
// //           <div className="horizontal-calendar">
// //             <div className="date-scroll">
// //               {/* Dynamically render dates based on therapyCompletedDays */}
// //               {Array.from({ length: patientDetails.therapyCompletedDays }, (_, index) => {
// //                 const date = new Date(patientDetails.firstLoginDate);
// //                 date.setDate(date.getDate() + index); // Increment date

// //                 return (
// //                   <button
// //                     key={index}
// //                     className={`date-button ${selectedDate.getDate() === date.getDate() ? 'active' : ''}`}
// //                     onClick={() => handleCalendarClick(date)}
// //                   >
// //                     {date.getDate()}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Patient Details */}
// //       {patientDetails ? (
// //         <div className="bg-white shadow-md p-6 rounded-md w-full max-w-lg">
// //           <h2 className="text-2xl font-semibold mb-4 text-gray-700">
// //             {patientDetails.name}'s Therapy Goals
// //           </h2>
// //           <p className="text-gray-600">
// //             First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
// //           </p>
// //           <p className="text-gray-600">
// //             Therapy Completed Days: {patientDetails.therapyCompletedDays}
// //           </p>
// //         </div>
// //       ) : (
// //         <p className="text-red-500 mb-8">Loading patient details...</p>
// //       )}

// //       {/* Therapy Details */}
// //       {error && <p className="text-red-500 mb-4">{error}</p>}
// //       {selectedTherapy ? (
// //         <div className="bg-white shadow-md p-6 rounded-md w-full max-w-lg mt-8">
// //           <h2 className="text-2xl font-semibold mb-4 text-gray-700">Selected Therapy</h2>
// //           <p className="text-gray-600">Name: {selectedTherapy.name}</p>
// //           <p className="text-gray-600">Description: {selectedTherapy.description}</p>
// //           <p className="text-gray-600">Assigned Days: {selectedTherapy.assignedDays}</p>
// //         </div>
// //       ) : (
// //         <p className="text-gray-500">Select a date to view therapy details</p>
// //       )}
// //     </div>
// //   );







// return (
//     <div className="therapy-dashboard-container">
//       <h1 className="therapy-title">Therapy Goals</h1>

//       {/* Horizontal Scroll Calendar */}
//       <div className="calendar-container">
//         {patientDetails && (
//           <div className="horizontal-calendar">
//             <div className="date-scroll">
//               {Array.from({ length: patientDetails.therapyCompletedDays }, (_, index) => {
//                 const date = new Date(patientDetails.firstLoginDate);
//                 date.setDate(date.getDate() + index);
//                 return (
//                   <button
//                     key={index}
//                     className={`date-button ${selectedDate.getDate() === date.getDate() ? 'active' : ''}`}
//                     onClick={() => handleCalendarClick(date)}
//                   >
//                     {date.getDate()}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Patient Details Section */}
//       {patientDetails && (
//         <div className="patient-details-container">
//           <h2 className="patient-details-title">{patientDetails.name}'s Therapy Goals</h2>
//           <p className="patient-details-info">
//             First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
//           </p>
//           <p className="patient-details-info">Therapy Completed Days: {patientDetails.therapyCompletedDays}</p>
//         </div>
//       )}

//       {/* Display Selected Therapy Details */}
//       {selectedTherapy ? (
//         <div className="therapy-details-container">
//           <h2 className="therapy-details-title">Therapy Details for {selectedDate.toDateString()}</h2>
//           <p className="therapy-details-info"><strong>Therapist:</strong> {selectedTherapy.therapist}</p>
//           <p className="therapy-details-info"><strong>Therapy Type:</strong> {selectedTherapy.type}</p>
//           <p className="therapy-details-info"><strong>Mode:</strong> {selectedTherapy.mode}</p>
//           <p className="therapy-details-info"><strong>Duration:</strong> {selectedTherapy.duration}</p>

//           <div className="therapy-goals">
//             <h3>Therapy Goals</h3>
//             <ul>
//               {selectedTherapy.goals.map((goal, index) => (
//                 <li key={index}>{goal}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <p className="therapy-details-placeholder">Select a date to view therapy details.</p>
//       )}
//     </div>
//   );
// }

// export default Therapydashboard;












































































































































// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import "./Therapydashboard.css";
// import axios from 'axios';

// function Therapydashboard() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [patientDetails, setPatientDetails] = useState(null);
//   const [selectedTherapy, setSelectedTherapy] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch patient details when the component mounts
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/patient-details', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setPatientDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         setError('Could not fetch patient details');
//       }
//     };
    
//     fetchPatientDetails();
//   }, []);

//   // Calculate the difference in days between two dates
//   const getDaysDifference = (firstLoginDate, selectedDate) => {
//     const loginDate = new Date(firstLoginDate);
//     const clickedDate = new Date(selectedDate);
//     const utc1 = Date.UTC(loginDate.getFullYear(), loginDate.getMonth(), loginDate.getDate());
//     const utc2 = Date.UTC(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate());
//     return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
//   };



//   const fetchTherapies = async (therapyIds) => {
//     try {
//         console.log("ccccccccccccccccccccccccccccc",therapyIds)
//       const response = await axios.post('http://localhost:3001/api/therapiesArrayForPatient', { therapyIds });
//       console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",response)
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching therapies:', error);
//       setError('Could not fetch therapies');
//       return [];
//     }
//   };
//   // Handle calendar date selection
//   const handleCalendarClick = async (date) => {
//     setSelectedDate(date);
//     setError('');

//     if (!patientDetails) return;

//     const { firstLoginDate, therapyId, therapyCompletedDays } = patientDetails;
//     const daysPassed = getDaysDifference(firstLoginDate, date);
//     let therapyDaysCompleted = therapyCompletedDays;

//     const therapies = await fetchTherapies(therapyId);
//     let cumulativeDays = 0;

//     for (let therapy of therapies) {
//       cumulativeDays += therapy.assignedDays;
//       if (cumulativeDays >= daysPassed) {
//         setSelectedTherapy(therapy);
//         break;
//       }
//     }

//     // if (therapyDaysCompleted >= daysPassed) {
//     //   setTherapyDetails(therapies);
//     // } else {
//     //   setTherapyDetails([]);
//     //   setError("No therapies available for this date.");
//     // }
//   };

//   // Calculate max date (therapy completed days)
//   const calculateMaxDate = (firstLoginDate, therapyCompletedDays) => {
//     const loginDate = new Date(firstLoginDate);
//     return new Date(loginDate.setDate(loginDate.getDate() + therapyCompletedDays));
//   };

// return (
//     <div className="therapy-dashboard-container">
//       <h1 className="therapy-title">Therapy Goals</h1>

//       {/* Horizontal Scroll Calendar */}
//       <div className="calendar-container">
//         {patientDetails && (
//           <div className="horizontal-calendar">
//             <div className="date-scroll">
//               {Array.from({ length: patientDetails.therapyCompletedDays }, (_, index) => {
//                 const date = new Date(patientDetails.firstLoginDate);
//                 date.setDate(date.getDate() + index);
//                 return (
//                   <button
//                     key={index}
//                     className={`date-button ${selectedDate.getDate() === date.getDate() ? 'active' : ''}`}
//                     onClick={() => handleCalendarClick(date)}
//                   >
//                     {date.getDate()}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Patient Details Section */}
//       {patientDetails && (
//         <div className="patient-details-container">
//           <h2 className="patient-details-title">{patientDetails.name}'s Therapy Goals</h2>
//           <p className="patient-details-info">
//             First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
//           </p>
//           <p className="patient-details-info">Therapy Completed Days: {patientDetails.therapyCompletedDays}</p>
//         </div>
//       )}

//       {/* Display Selected Therapy Details */}
//       {selectedTherapy ? (
//         <div className="therapy-details-container">
//           <h2 className="therapy-details-title">Therapy Details for {selectedDate.toDateString()}</h2>
//           <p className="therapy-details-info"><strong>Therapist:</strong> {selectedTherapy.therapist}</p>
//           <p className="therapy-details-info"><strong>Therapy Type:</strong> {selectedTherapy.type}</p>
//           <p className="therapy-details-info"><strong>Mode:</strong> {selectedTherapy.mode}</p>
//           <p className="therapy-details-info"><strong>Duration:</strong> {selectedTherapy.duration}</p>

//           <div className="therapy-goals">
//             <h3>Therapy Goals</h3>
//             <ul>
//               {selectedTherapy.goals.map((goal, index) => (
//                 <li key={index}>{goal}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <p className="therapy-details-placeholder">Select a date to view therapy details.</p>
//       )}
//     </div>
//   );
// }

// export default Therapydashboard;










































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Therapydashboard.css";

// function Therapydashboard() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [patientDetails, setPatientDetails] = useState(null);
//   const [selectedTherapy, setSelectedTherapy] = useState(null);
//   const [currentMonth, setCurrentMonth] = useState('');
//   const [therapists, setTherapists] = useState([]);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('observations');
//   // const [index, setIndex] = useState(null);
//   // const [completedActivities, setCompletedActivities]=useState([])
//   // const [completedActivities, setCompletedActivities] = useState([]);
//   const [index, setIndex] = useState(null);
//   const [completedActivitiesCount, setCompletedActivitiesCount] = useState(0); // Store the count of completed activities
//   const [totalActivities, setTotalActivities] = useState(0); // Store the total number of activities
//   const [decrement , setDecrement] =useState(0);

//   // Fetch patient details when the component mounts
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/patient-details', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setPatientDetails(response.data);
//         updateMonthYear(new Date(response.data.firstLoginDate)); // Initialize month/year
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         setError('Could not fetch patient details');
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   // Function to update the month and year based on the selected date
//   const updateMonthYear = (date) => {
//     const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
//     setCurrentMonth(monthYear);
//   };


//   const fetchTherapists = async (therapistIds) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/therapistArrayForPatient', { therapists: therapistIds });
//       console.log(response)
//       setTherapists(response.data); // Set therapists in state
//     } catch (error) {
//       console.error('Error fetching therapists:', error);
//       setError('Could not fetch therapists');
//     }
//   };
//   // Handle calendar date selection
//   const handleCalendarClick = async (date) => {
//     setSelectedDate(date);
//     updateMonthYear(date); // Update month and year on date selection
//     setError('');

//     if (!patientDetails) return;

//     const { firstLoginDate, therapyId, therapyCompletedDays } = patientDetails;
//     const daysPassed = getDaysDifference(firstLoginDate, date);
//     console.log("qqqqqqqqqqqqqqqqqqqq",daysPassed)
//     let therapyDaysCompleted = therapyCompletedDays;

//     const therapies = await fetchTherapies(therapyId);
//     let cumulativeDays = 0;

//     for (let therapy of therapies) {
//       const convertTonum = Number(therapy.assignedDays);
//       cumulativeDays += convertTonum;
//       // console.log("kkkkkkkkkkkkkkkkkkkkkk",cumulativeDays)
//       if (cumulativeDays >= daysPassed) {
//         setSelectedTherapy(therapy);
//         console.log("assssssssssssssssssssssssssssssssssingeddays",cumulativeDays)
//         console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",therapy)
//         fetchTherapists(therapy.therapists); 
//         setIndex(convertTonum - (cumulativeDays-daysPassed));
//         setCompletedActivitiesCount(therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays-daysPassed)]); // Reset the count when a new therapy is selected
//         console.log("lllllllll",convertTonum - (cumulativeDays-daysPassed))
//         console.log("kkkkkkkkkkkkkkkkkkkkkkkk",therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays-daysPassed)])
//         if (therapy && Array.isArray(therapy.dailyActivities)) {
//           console.log("kkkkkkkkkkkkkkkkkkkkkkkk", therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays - daysPassed)]);
          
//           // Set total activities for the progress bar
//           setTotalActivities(therapy.dailyActivities.length); // Use length property without parentheses
//         }
//         // setTotalActivities(therapy.dailyActivities.length()); // Set total activities for the progress bar
//         setDecrement(therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays-daysPassed)]);

//         break;
//       }
//     }
//   };

 
//   const handleActivityChange = (isChecked) => {
//     console.log(decrement)
//     if (decrement > 0) {
//       console.log("Checkbox is checked, decrement remains the same:", decrement);
//     } else {
//       if (!isChecked) {
//         const newDecrement = decrement > 0 ? decrement - 1 : 0;
//         setDecrement(newDecrement);
//         console.log("Checkbox is unchecked, decrement:", newDecrement);
//       }
//     }
//     console.log(isChecked)
//     if(completedActivitiesCount === totalActivities){
//       return;
//     }
//     setCompletedActivitiesCount((prevCount) =>
//       isChecked ? prevCount + 1 : prevCount - 1
//     );

//   };

//   // Calculate the difference in days between two dates
//   const getDaysDifference = (firstLoginDate, selectedDate) => {
//     const loginDate = new Date(firstLoginDate);
//     const clickedDate = new Date(selectedDate);
//     return Math.floor((clickedDate - loginDate) / (1000 * 60 * 60 * 24));
//   };


//   const updateDailyActivity = async () => {
//     if (!selectedTherapy || index === null) {
//       setError('No therapy or index selected');
//       return;
//     }

//     try {
//       console.log(completedActivitiesCount)
//       const data = {
//         dayIndex: index,
//         completedActivity: completedActivitiesCount // Sending count of completed activities
//       };

//       const response = await axios.put(`http://localhost:3001/api/update-dailyActivityTrack-therapy/${selectedTherapy._id}`, data);

//       if (response.status === 200) {
//         console.log('Daily activity updated successfully:', response.data);
//       } else {
//         setError('Failed to update daily activity');
//       }
//     } catch (error) {
//       console.error('Error updating daily activity:', error);
//       setError('An error occurred while updating daily activity');
//     }
//   };

  
//   const fetchTherapies = async (therapyIds) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/therapiesArrayForPatient', { therapyIds });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching therapies:', error);
//       setError('Could not fetch therapies');
//       return [];
//     }
//   };

//   // Calculate max date (therapy completed days)
//   const calculateMaxDate = (firstLoginDate, therapyCompletedDays) => {
//     const loginDate = new Date(firstLoginDate);
//     return new Date(loginDate.setDate(loginDate.getDate() + therapyCompletedDays));
//   };
//   const calculateProgress = () => {
//     if (totalActivities === 0) return 0; // Avoid division by zero
//     if(completedActivitiesCount === totalActivities){
//       return 100;
//     }
//     return Math.min(100, Math.round((completedActivitiesCount / totalActivities) * 100));
//   };
  


  
//   const toggleTab = (tab) => {
//     setActiveTab(tab);
//   };
//   return (
//     <div className="therapy-dashboard-container">
//       <h1 className="therapy-title">Therapy Goals</h1>

//       {/* Month/Year Display */}
//       {currentMonth && <div className="month-year-display">{currentMonth}</div>}

//       {/* Horizontal Scroll Calendar */}
//       <div className="calendar-container">
//         {patientDetails && (
//           <div className="horizontal-calendar">
//             <div className="date-scroll">
//               {Array.from({ length: patientDetails.therapyCompletedDays }, (_, index) => {
//                 const date = new Date(patientDetails.firstLoginDate);
//                 date.setDate(date.getDate() + index);
//                 return (
//                   <button
//                     key={index}
//                     className={`date-button ${selectedDate.getDate() === date.getDate() ? 'active' : ''}`}
//                     onClick={() => handleCalendarClick(date)}
//                   >
//                     {date.getDate()}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Patient Details Section */}
//       {patientDetails && (
//         <div className="patient-details-container">
//           <h2 className="patient-details-title">{patientDetails.name}'s Therapy Goals</h2>
//           <p className="patient-details-info">
//             First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
//           </p>
//           <p className="patient-details-info">Therapy Completed Days: {patientDetails.therapyCompletedDays}</p>
//         </div>
//       )}

//       {/* Display Selected Therapy Details */}
//       {selectedTherapy ? (
//         <div className="therapy-details-container">
//           <h2 className="therapy-details-title">Therapy Details for {selectedDate.toDateString()}</h2>

//           {/* Show therapists */}
//           <p className="therapy-details-info">
//             <strong>Therapist:</strong> {therapists.length > 0 ? therapists.map(t => t.name).join(', ') : 'No therapists found'}
//           </p>

//           {/* Therapy type */}
//           <p className="therapy-details-info">
//             <strong>Therapy Type:</strong> {selectedTherapy.therapyNames.join(', ')}
//           </p>

//           {/* Tabs for switching between "Observations" and "Daily Activities" */}
//           <div className="tab-container">
//             <button
//               className={`tab-button ${activeTab === 'observations' ? 'active' : ''}`}
//               onClick={() => toggleTab('observations')}
//             >
//               Observations
//             </button>
//             <button
//               className={`tab-button ${activeTab === 'dailyActivities' ? 'active' : ''}`}
//               onClick={() => toggleTab('dailyActivities')}
//             >
//               Daily Activities
//             </button>
//           </div>

//           {/* Conditionally render based on the active tab */}
//           {activeTab === 'observations' && (
//             <div className="therapy-observations">
//               <h3>Observations</h3>
//               <ul>
//                 {Object.entries(selectedTherapy.observations).map(([key, value]) => (
//                   value && value.trim() !== '' && (
//                     <li key={key}>
//                       <strong>{key}:</strong> {value}
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* {activeTab === 'dailyActivities' && (
//             <div className="therapy-daily-activities">
//               <h3>Daily Activities</h3>
//               <ul>
//                 {selectedTherapy.dailyActivities.map((activity, index) => (
//                   <li key={index}>{activity}</li>
//                 ))}
//               </ul>
//             </div>
//           )} */}

// {activeTab === 'dailyActivities' && (
//             <div className="therapy-daily-activities">
//               <h3>Daily Activities</h3>
//               <ul>
//                 {selectedTherapy.dailyActivities.map((activity, activityIndex) => (
//                   <li key={activityIndex}>
//                     <label>
//                       <input
//                         type="checkbox"
//                         onChange={(e) => handleActivityChange(e.target.checked)}
//                         checked={decrement > 0}
//                       />
//                       {activity}
//                     </label>
//                   </li>
//                 ))}
//               </ul>


//               <div className="progress-bar-container">
//                 <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
//               </div>
//               <p>{calculateProgress()}% Completed</p>
//               <button onClick={updateDailyActivity}>Update Activity</button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="therapy-details-placeholder">Select a date to view therapy details.</p>
//       )}
//     </div>

      
//   );
// }

// export default Therapydashboard;


import React, { useState, useEffect } from 'react';
import { Calendar, User, CheckSquare, Activity } from 'lucide-react';
import axios from 'axios';
import "./Therapydashboard.css";

function Therapydashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patientDetails, setPatientDetails] = useState(null);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [therapists, setTherapists] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('observations');
  // const [index, setIndex] = useState(null);
  // const [completedActivities, setCompletedActivities]=useState([])
  // const [completedActivities, setCompletedActivities] = useState([]);
  const [index, setIndex] = useState(null);
  const [completedActivitiesCount, setCompletedActivitiesCount] = useState(0); // Store the count of completed activities
  const [totalActivities, setTotalActivities] = useState(0); // Store the total number of activities
  const [decrement , setDecrement] =useState(0);

  const [checkedActivities, setCheckedActivities] = useState([]);
  // Fetch patient details when the component mounts
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patient-details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data)
        setPatientDetails(response.data);
        updateMonthYear(new Date(response.data.firstLoginDate)); // Initialize month/year
      } catch (error) {
        console.error('Error fetching patient details:', error);
        setError('Could not fetch patient details');
      }
    };

    fetchPatientDetails();
  }, []);

  // Function to update the month and year based on the selected date
  const updateMonthYear = (date) => {
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    setCurrentMonth(monthYear);
  };


  const fetchTherapists = async (therapistIds) => {
    try {
      const response = await axios.post('http://localhost:3001/api/therapistArrayForPatient', { therapists: therapistIds });
      console.log(response)
      setTherapists(response.data); // Set therapists in state
    } catch (error) {
      console.error('Error fetching therapists:', error);
      setError('Could not fetch therapists');
    }
  };
  // Handle calendar date selection
  const handleCalendarClick = async (date) => {
    setSelectedDate(date);
    updateMonthYear(date); // Update month and year on date selection
    setError('');

    if (!patientDetails) return;

    const { firstLoginDate, therapyId, therapyCompletedDays } = patientDetails;
    const daysPassed = getDaysDifference(firstLoginDate, date);
    console.log("qqqqqqqqqqqqqqqqqqqq",daysPassed)
    let therapyDaysCompleted = therapyCompletedDays;

    const therapies = await fetchTherapies(therapyId);
    let cumulativeDays = 0;

    for (let therapy of therapies) {
      const convertTonum = Number(therapy.assignedDays);
      cumulativeDays += convertTonum;
      // console.log("kkkkkkkkkkkkkkkkkkkkkk",cumulativeDays)
      if (cumulativeDays >= daysPassed) {
        setSelectedTherapy(therapy);
        console.log("assssssssssssssssssssssssssssssssssingeddays",cumulativeDays)
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",therapy)
        fetchTherapists(therapy.therapists); 
        setIndex(convertTonum - (cumulativeDays-daysPassed));
        setCompletedActivitiesCount(therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays-daysPassed)]); // Reset the count when a new therapy is selected
        console.log("lllllllll",convertTonum - (cumulativeDays-daysPassed))
        console.log("kkkkkkkkkkkkkkkkkkkkkkkk",therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays-daysPassed)])
        if (therapy && Array.isArray(therapy.dailyActivities)) {
          console.log("kkkkkkkkkkkkkkkkkkkkkkkk", therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays - daysPassed)]);
          
          // Set total activities for the progress bar
          setTotalActivities(therapy.dailyActivities.length); // Use length property without parentheses
        }
        // setTotalActivities(therapy.dailyActivities.length()); // Set total activities for the progress bar
        setDecrement(therapy.dailyActivitiesTrack[convertTonum - (cumulativeDays-daysPassed)]);

        break;
      }
    }
  };

 
  // const handleActivityChange = (isChecked) => {
  //   console.log(decrement)
  //   if (decrement > 0) {
  //     console.log("Checkbox is checked, decrement remains the same:", decrement);
  //   } else {
  //     if (!isChecked) {
  //       const newDecrement = decrement > 0 ? decrement - 1 : 0;
  //       setDecrement(newDecrement);
  //       console.log("Checkbox is unchecked, decrement:", newDecrement);
  //     }
  //   }
  //   console.log(isChecked)
  //   if(completedActivitiesCount === totalActivities){
  //     return;
  //   }
  //   setCompletedActivitiesCount((prevCount) =>
  //     isChecked ? prevCount + 1 : prevCount - 1
  //   );

  // };


  const handleActivityChange = (index, isChecked) => {
    const updatedCheckedActivities = [...checkedActivities];
    updatedCheckedActivities[index] = isChecked;
    setCheckedActivities(updatedCheckedActivities);

    // Update completed activities count
    const completedCount = updatedCheckedActivities.filter(Boolean).length;
    setCompletedActivitiesCount(completedCount);

    // Handle decrement logic
    const newDecrement = isChecked ? decrement + 1 : decrement - 1;
    setDecrement(Math.max(0, newDecrement)); // Prevent negative decrement
  };

  // Calculate the difference in days between two dates
  const getDaysDifference = (firstLoginDate, selectedDate) => {
    const loginDate = new Date(firstLoginDate);
    const clickedDate = new Date(selectedDate);
    return Math.floor((clickedDate - loginDate) / (1000 * 60 * 60 * 24));
  };


  const updateDailyActivity = async () => {
    if (!selectedTherapy || index === null) {
      setError('No therapy or index selected');
      return;
    }

    try {
      console.log(completedActivitiesCount)
      const data = {
        dayIndex: index,
        completedActivity: completedActivitiesCount // Sending count of completed activities
      };

      const response = await axios.put(`http://localhost:3001/api/update-dailyActivityTrack-therapy/${selectedTherapy._id}`, data);

      if (response.status === 200) {
        console.log('Daily activity updated successfully:', response.data);
      } else {
        setError('Failed to update daily activity');
      }
    } catch (error) {
      console.error('Error updating daily activity:', error);
      setError('An error occurred while updating daily activity');
    }
  };

  
  const fetchTherapies = async (therapyIds) => {
    try {
      const response = await axios.post('http://localhost:3001/api/therapiesArrayForPatient', { therapyIds });
      return response.data;
    } catch (error) {
      console.error('Error fetching therapies:', error);
      setError('Could not fetch therapies');
      return [];
    }
  };

  // Calculate max date (therapy completed days)
  const calculateMaxDate = (firstLoginDate, therapyCompletedDays) => {
    const loginDate = new Date(firstLoginDate);
    return new Date(loginDate.setDate(loginDate.getDate() + therapyCompletedDays));
  };
  const calculateProgress = () => {
    if (totalActivities === 0) return 0; // Avoid division by zero
    if(completedActivitiesCount === totalActivities){
      return 100;
    }
    return Math.min(100, Math.round((completedActivitiesCount / totalActivities) * 100));
  };
  


  
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
//   return (
//     <div className="therapy-dashboard-container p-6 bg-gray-100 min-h-screen font-mono">
//   <h1 className="therapy-title text-3xl font-bold text-[#CB6BE5] mb-4">Therapy Goals</h1>

//   {/* Month/Year Display */}
//   {currentMonth && <div className="month-year-display text-xl text-gray-700 mb-4">{currentMonth}</div>}

//   {/* Horizontal Scroll Calendar */}
//   <div className="calendar-container overflow-x-auto mb-6">
//     {patientDetails && (
//       <div className="horizontal-calendar flex space-x-2">
//         <div className="date-scroll flex">
//           {Array.from({ length: patientDetails.therapyCompletedDays }, (_, index) => {
//             const date = new Date(patientDetails.firstLoginDate);
//             date.setDate(date.getDate() + index);
//             return (
//               <button
//                 key={index}
//                 className={`date-button px-4 py-2 rounded-md ${
//                   selectedDate.getDate() === date.getDate() ? 'bg-[#CB6BE5] text-white' : 'bg-gray-200'
//                 }`}
//                 onClick={() => handleCalendarClick(date)}
//               >
//                 {date.getDate()}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     )}
//   </div>

//   {/* Patient Details Section */}
//   {patientDetails && (
//     <div className="patient-details-container mb-6 p-4 bg-white shadow-md rounded-md">
//       <h2 className="patient-details-title text-2xl font-semibold text-gray-800 mb-2">
//         {patientDetails.name}'s Therapy Goals
//       </h2>
//       <p className="patient-details-info text-gray-600">
//         First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
//       </p>
//       <p className="patient-details-info text-gray-600">
//         Therapy Completed Days: {patientDetails.therapyCompletedDays}
//       </p>
//     </div>
//   )}

//   {/* Display Selected Therapy Details */}
//   {selectedTherapy ? (
//     <div className="therapy-details-container p-4 bg-white shadow-md rounded-md">
//       <h2 className="therapy-details-title text-xl font-semibold mb-4">
//         Therapy Details for {selectedDate.toDateString()}
//       </h2>

//       {/* Show therapists */}
//       <p className="therapy-details-info mb-2">
//         <strong>Therapist:</strong>{' '}
//         {therapists.length > 0 ? therapists.map((t) => t.name).join(', ') : 'No therapists found'}
//       </p>

//       {/* Therapy type */}
//       <p className="therapy-details-info mb-6">
//         <strong>Therapy Type:</strong> {selectedTherapy.therapyNames.join(', ')}
//       </p>

//       {/* Tabs for switching between "Observations" and "Daily Activities" */}
//       <div className="tab-container flex space-x-4 mb-6">
//         <button
//           className={`tab-button py-2 px-6 rounded-md ${
//             activeTab === 'observations' ? 'bg-[#CB6BE5] text-white' : 'bg-gray-200'
//           }`}
//           onClick={() => toggleTab('observations')}
//         >
//           Observations
//         </button>
//         <button
//           className={`tab-button py-2 px-6 rounded-md ${
//             activeTab === 'dailyActivities' ? 'bg-[#CB6BE5] text-white' : 'bg-gray-200'
//           }`}
//           onClick={() => toggleTab('dailyActivities')}
//         >
//           Daily Activities
//         </button>
//       </div>

//       {/* Conditionally render based on the active tab */}
//       {activeTab === 'observations' && (
//         <div className="therapy-observations mb-6">
//           <h3 className="font-semibold mb-4">Observations</h3>
//           <ul className="space-y-2">
//             {Object.entries(selectedTherapy.observations).map(
//               ([key, value]) =>
//                 value &&
//                 value.trim() !== '' && (
//                   <li key={key}>
//                     <strong>{key}:</strong> {value}
//                   </li>
//                 )
//             )}
//           </ul>
//         </div>
//       )}

//       {activeTab === 'dailyActivities' && (
//         <div className="therapy-daily-activities mb-6">
//           <h3 className="font-semibold mb-4">Daily Activities</h3>
//           <ul className="space-y-2">
//             {selectedTherapy.dailyActivities.map((activity, activityIndex) => (
//               <li key={activityIndex} className="flex items-center">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     onChange={(e) => handleActivityChange(activityIndex, e.target.checked)}
//                     checked={checkedActivities[activityIndex] || false}
//                     className="activity-checkbox h-4 w-4"
//                   />
//                   <span>{activity}</span>
//                 </label>
//               </li>
//             ))}
//           </ul>

//           <div className="progress-bar-container bg-gray-200 rounded-full h-2 mt-4 mb-2">
//             <div
//               className="progress-bar bg-[#CB6BE5] h-2 rounded-full"
//               style={{ width: `${calculateProgress()}%` }}
//             ></div>
//           </div>
//           <p>{calculateProgress()}% Completed</p>
//           <button
//             className="mt-4 bg-[#CB6BE5] text-white px-4 py-2 rounded-md"
//             onClick={updateDailyActivity}
//           >
//             Update Activity
//           </button>
//         </div>
//       )}
//     </div>
//   ) : (
//     <p className="therapy-details-placeholder text-gray-600">Select a date to view therapy details.</p>
//   )}
// </div>

      
//   );



return (
  <div className="therapy-dashboard-container p-4 sm:p-6 bg-gray-100 min-h-screen font-mono">
  {/* Title with User Icon */}
  <h1 className="therapy-title text-2xl sm:text-3xl font-bold text-black mb-4 flex items-center space-x-2">
    <User className="text-[#CB6BE5]" />
    <span>Therapy Goals</span>
  </h1>

  {/* Month/Year Display */}
  {currentMonth && (
    <div className="month-year-display text-lg sm:text-xl text-black mb-4 flex items-center space-x-2">
      <span style={{ color: '#29A167' }}>{currentMonth}</span>
    </div>
  )}

  {/* Horizontal Scroll Calendar */}
  <div className="calendar-container overflow-x-auto mb-6">
    {patientDetails && (
      <div className="horizontal-calendar flex space-x-2">
        <div className="date-scroll flex space-x-2">
          {Array.from({ length: patientDetails.therapyCompletedDays }, (_, index) => {
            const date = new Date(patientDetails.firstLoginDate);
            date.setDate(date.getDate() + index);
            return (
              <button
                key={index}
                className={`date-button px-3 py-2 rounded-md transition-colors duration-300 ease-in-out ${
                  selectedDate.getDate() === date.getDate()
                    ? 'bg-[#CB6BE5] text-white'
                    : 'bg-gray-200 hover:bg-[#CB6BE5] hover:text-white'
                }`}
                onClick={() => handleCalendarClick(date)}
              >
                <span style={{ color: '#29A167' }}>{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>
    )}
  </div>

  {/* Parent Flex Container for Patient and Therapy Details */}
  <div className="details-container flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
    {/* Patient Details Section */}
    {patientDetails && (
      <div className="patient-details-container flex-1 p-4 bg-[#CB6BE5] text-black shadow-md rounded-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
        <h2 className="patient-details-title text-xl sm:text-2xl font-semibold mb-2 flex items-center space-x-2">
          <User className="text-[#CB6BE5]" />
          <span>{patientDetails.name}'s Therapy Goals</span>
        </h2>
        <p className="patient-details-info">
          First Login Date: {new Date(patientDetails.firstLoginDate).toLocaleDateString()}
        </p>
        <p className="patient-details-info">
          Therapy Completed Days: {patientDetails.therapyCompletedDays}
        </p>
      </div>
    )}

    {/* Display Selected Therapy Details */}
    {selectedTherapy ? (
      <div className="therapy-details-container flex-1 p-4 bg-[#CB6BE5] text-black shadow-md rounded-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
        <div className="therapy-header flex justify-between items-center mb-4">
          <h2 className="therapy-details-title text-lg sm:text-xl font-semibold flex items-center space-x-2">
            <Activity className="text-[#CB6BE5]" />
            <span>Therapy Details for {selectedDate.toDateString()}</span>
          </h2>
        </div>

        {/* Show therapists */}
        <p className="therapy-details-info mb-2 flex items-center space-x-2">
          <User className="text-[#CB6BE5]" />
          <span>
            <strong>Therapist:</strong>{' '}
            {therapists.length > 0
              ? therapists.map((t) => t.name).join(', ')
              : 'No therapists found'}
          </span>
        </p>

        {/* Therapy type */}
        <p className="therapy-details-info mb-6">
          <strong>Therapy Type:</strong> {selectedTherapy.therapyNames.join(', ')}
        </p>

        {/* Tabs for switching between "Observations" and "Daily Activities" */}
        <div className="tab-container flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 mb-6">
          <button
            className={`tab-button py-2 px-4 sm:px-6 rounded-md transition-all duration-300 ease-in-out ${
              activeTab === 'observations'
                ? 'bg-[#CB6BE5] text-white shadow-lg'
                : 'bg-gray-200 hover:bg-[#CB6BE5] hover:text-white'
            }`}
            onClick={() => toggleTab('observations')}
          >
            Observations
          </button>
          <button
            className={`tab-button py-2 px-4 sm:px-6 rounded-md transition-all duration-300 ease-in-out ${
              activeTab === 'dailyActivities'
                ? 'bg-[#CB6BE5] text-white shadow-lg'
                : 'bg-gray-200 hover:bg-[#CB6BE5] hover:text-white'
            }`}
            onClick={() => toggleTab('dailyActivities')}
          >
            Daily Activities
          </button>
        </div>

        {/* Conditionally render based on the active tab */}
        {activeTab === 'observations' && (
          <div className="therapy-observations mb-6">
            <h3 className="font-semibold mb-4">Observations</h3>
            <ul className="space-y-2">
              {Object.entries(selectedTherapy.observations).map(
                ([key, value]) =>
                  value &&
                  value.trim() !== '' && (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        {activeTab === 'dailyActivities' && (
          <div className="therapy-daily-activities mb-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <CheckSquare className="text-[#CB6BE5]" />
              <span>Daily Activities</span>
            </h3>
            <ul className="space-y-2">
              {selectedTherapy.dailyActivities.map((activity, activityIndex) => (
                <li key={activityIndex} className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleActivityChange(activityIndex, e.target.checked)
                      }
                      checked={checkedActivities[activityIndex] || false}
                      className="activity-checkbox h-4 w-4 transition-all duration-300 ease-in-out"
                    />
                    <span>{activity}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="progress-bar-container bg-gray-200 rounded-full h-2 mt-4 mb-2">
              <div
                className="progress-bar bg-[#CB6BE5] h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <p>{calculateProgress()}% Completed</p>
            <button
              className="mt-4 bg-[#CB6BE5] text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#A254CA]"
              onClick={updateDailyActivity}
            >
              Update Activity
            </button>
          </div>
        )}
      </div>
    ) : (
      <p className="therapy-details-placeholder text-black">
        Select a date to view therapy details.
      </p>
    )}
  </div>
</div>
)
}

export default Therapydashboard;
