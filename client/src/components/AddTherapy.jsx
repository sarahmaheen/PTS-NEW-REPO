// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTherapy = () => {
//   const [therapyName, setTherapyName] = useState('');
//   const [therapistIds, setTherapistIds] = useState('');
//   const [plans, setPlans] = useState([{ goals: '', observations: '', duration: '', mode: '' }]);

//   const handlePlanChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedPlans = plans.map((plan, i) => 
//       i === index ? { ...plan, [name]: value } : plan
//     );
//     setPlans(updatedPlans);
//   };

//   const addDay = () => {
//     setPlans([...plans, { goals: '', observations: '', duration: '', mode: '' }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const therapistIdsArray = therapistIds.split(',').map(id => id.trim());
//       const response = await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
//         therapyName,
//         therapistIds: therapistIdsArray,
//         plan: plans,
//       });
//       alert('Therapy added successfully');
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding therapy:', error);
//       alert('Failed to add therapy');
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Add New Therapy</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Therapy Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Therapy Name</label>
//           <input 
//             type="text" 
//             value={therapyName} 
//             onChange={(e) => setTherapyName(e.target.value)}
//             required 
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         {/* Therapist IDs */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Therapist IDs (comma-separated)</label>
//           <input 
//             type="text" 
//             value={therapistIds} 
//             onChange={(e) => setTherapistIds(e.target.value)} 
//             required 
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         {/* Plan Days */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Therapy Plan</h3>
//           {plans.map((plan, index) => (
//             <div key={index} className="mb-4 p-4 border rounded-md">
//               <h4 className="font-bold">Day {index + 1}</h4>
//               <label className="block text-gray-700">Goals</label>
//               <input
//                 type="text"
//                 name="goals"
//                 value={plan.goals}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Observations</label>
//               <input
//                 type="text"
//                 name="observations"
//                 value={plan.observations}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Duration (minutes)</label>
//               <input
//                 type="text"
//                 name="duration"
//                 value={plan.duration}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Mode (e.g., in-person, online)</label>
//               <input
//                 type="text"
//                 name="mode"
//                 value={plan.mode}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Add Day Button */}
//         <button type="button" onClick={addDay} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Another Day
//         </button>

//         {/* Submit Button */}
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
//           Submit Therapy
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTherapy;









































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddTherapy = () => {
//   const [therapyName, setTherapyName] = useState('');
//   const [therapistIds, setTherapistIds] = useState([]);
//   const [plans, setPlans] = useState([{ goals: '', observations: '', duration: '', mode: '' }]);
//   const [therapists, setTherapists] = useState([]);

//   // Fetch therapists on component mount
//   useEffect(() => {
//     const fetchTherapists = async () => {
//       try {
//         const response = await axios.get('{process.env.REACT_APP_API_URL}/api/therapists');
//         setTherapists(response.data);
//       } catch (error) {
//         console.error('Error fetching therapists:', error);
//       }
//     };
//     fetchTherapists();
//   }, []);

//   const handlePlanChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedPlans = plans.map((plan, i) =>
//       i === index ? { ...plan, [name]: value } : plan
//     );
//     setPlans(updatedPlans);
//   };

//   const addDay = () => {
//     setPlans([...plans, { goals: '', observations: '', duration: '', mode: '' }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
//         therapyName,
//         therapistIds,
//         plan: plans,
//       });
//       alert('Therapy added successfully');
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding therapy:', error);
//       alert('Failed to add therapy');
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Add New Therapy</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Therapy Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Therapy Name</label>
//           <input 
//             type="text" 
//             value={therapyName} 
//             onChange={(e) => setTherapyName(e.target.value)}
//             required 
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         {/* Therapist Dropdown */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Select Therapists</label>
//           <select 
//             multiple
//             value={therapistIds} 
//             onChange={(e) => setTherapistIds([...e.target.selectedOptions].map(option => option.value))}
//             required
//             className="border rounded p-2 w-full"
//           >
//             {therapists.map(therapist => (
//               <option key={therapist._id} value={therapist._id}>
//                 {therapist.name} - {therapist.specialization}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Plan Days */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Therapy Plan</h3>
//           {plans.map((plan, index) => (
//             <div key={index} className="mb-4 p-4 border rounded-md">
//               <h4 className="font-bold">Day {index + 1}</h4>
//               <label className="block text-gray-700">Goals</label>
//               <input
//                 type="text"
//                 name="goals"
//                 value={plan.goals}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Observations</label>
//               <input
//                 type="text"
//                 name="observations"
//                 value={plan.observations}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Duration (minutes)</label>
//               <input
//                 type="text"
//                 name="duration"
//                 value={plan.duration}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Mode (e.g., in-person, online)</label>
//               <input
//                 type="text"
//                 name="mode"
//                 value={plan.mode}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Add Day Button */}
//         <button type="button" onClick={addDay} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Another Day
//         </button>

//         {/* Submit Button */}
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
//           Submit Therapy
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTherapy;

































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddTherapy = () => {
//   const [therapyName, setTherapyName] = useState('');
//   const [therapistIds, setTherapistIds] = useState([]);
//   const [plans, setPlans] = useState([{ goals: '', observations: '', duration: '', mode: '' }]);
//   const [therapists, setTherapists] = useState([]);

//   // Fetch therapists on component mount
//   useEffect(() => {
//     const fetchTherapists = async () => {
//       try {
//         const response = await axios.get('{process.env.REACT_APP_API_URL}/api/therapists');
//         setTherapists(response.data);
//       } catch (error) {
//         console.error('Error fetching therapists:', error);
//       }
//     };
//     fetchTherapists();
//   }, []);

//   const handlePlanChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedPlans = plans.map((plan, i) =>
//       i === index ? { ...plan, [name]: value } : plan
//     );
//     setPlans(updatedPlans);
//   };

//   const addDay = () => {
//     setPlans([...plans, { goals: '', observations: '', duration: '', mode: '' }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
//         therapyName,
//         therapistIds,
//         plan: plans,
//       });

//       console.log(response)
//       alert('Therapy added successfully');
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding therapy:', error);
//       alert('Failed to add therapy');
//     }
//   };

//   const handleTherapistChange = (id) => {
//     setTherapistIds((prevIds) => 
//       prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
//     );
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Add New Therapy</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Therapy Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Therapy Name</label>
//           <input 
//             type="text" 
//             value={therapyName} 
//             onChange={(e) => setTherapyName(e.target.value)}
//             required 
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         {/* Therapist Options */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Select Therapists</label>
//           <div className="flex flex-col">
//             {therapists.map(therapist => (
//               <label key={therapist._id} className="flex items-center mb-2">
//                 <input 
//                   type="checkbox" 
//                   value={therapist._id} 
//                   checked={therapistIds.includes(therapist._id)} 
//                   onChange={() => handleTherapistChange(therapist._id)} 
//                   className="mr-2"
//                 />
//                 {therapist.name} - {therapist.specialization}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Plan Days */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Therapy Plan</h3>
//           {plans.map((plan, index) => (
//             <div key={index} className="mb-4 p-4 border rounded-md">
//               <h4 className="font-bold">Day {index + 1}</h4>
//               <label className="block text-gray-700">Goals</label>
//               <input
//                 type="text"
//                 name="goals"
//                 value={plan.goals}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Observations</label>
//               <input
//                 type="text"
//                 name="observations"
//                 value={plan.observations}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Duration (minutes)</label>
//               <input
//                 type="text"
//                 name="duration"
//                 value={plan.duration}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full mb-2"
//               />
//               <label className="block text-gray-700">Mode (e.g., in-person, online)</label>
//               <input
//                 type="text"
//                 name="mode"
//                 value={plan.mode}
//                 onChange={(e) => handlePlanChange(index, e)}
//                 required
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Add Day Button */}
//         <button type="button" onClick={addDay} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Another Day
//         </button>

//         {/* Submit Button */}
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
//           Submit Therapy
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTherapy;










































    // import React, { useState, useEffect } from 'react';
    // import axios from 'axios';

    // const AddTherapy = () => {
    //     const [therapyName, setTherapyName] = useState('');
    //     const [therapistIds, setTherapistIds] = useState([]);
    //     const [plans, setPlans] = useState([{ goals: '', observations: '', duration: '', mode: '' }]);
    //     const [therapists, setTherapists] = useState([]);

    //     // Fetch therapists on component mount
    //     useEffect(() => {
    //         const fetchTherapists = async () => {
    //             try {
    //                 const response = await axios.get('{process.env.REACT_APP_API_URL}/api/therapists');
    //                 setTherapists(response.data);
    //             } catch (error) {
    //                 console.error('Error fetching therapists:', error);
    //             }
    //         };
    //         fetchTherapists();
    //     }, []);

    //     const handlePlanChange = (index, event) => {
    //         const { name, value } = event.target;
    //         const updatedPlans = plans.map((plan, i) =>
    //             i === index ? { ...plan, [name]: value } : plan
    //         );
    //         setPlans(updatedPlans);
    //     };

    //     const addDay = () => {
    //         setPlans([...plans, { goals: '', observations: '', duration: '', mode: '' }]);
    //     };

    //     const handleSubmit = async (e) => {
    //         e.preventDefault();
    //         try {
    //             const formattedPlans = plans.map(plan => ({
    //                 goals: plan.goals,
    //                 observations: plan.observations,
    //                 duration: plan.duration,
    //                 mode: plan.mode
    //             }));
    //             // console.log(formattedPlans.goals)
    //             console.log( therapyName,
    //                 therapistIds, // Sending the array of therapist IDs
    //                 formattedPlans) // Sending the formatted plans)
    //             const response = await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
    //                 therapyName,
    //                 therapistIds, // Sending the array of therapist IDs
    //                 plan: formattedPlans // Sending the formatted plans
    //             });

    //             console.log(response);
    //             alert('Therapy added successfully');
    //         } catch (error) {
    //             console.error('Error adding therapy:', error);
    //             alert(error.response.data.message)
    //             // alert('Failed to add therapy');
    //         }
    //     };

    //     const handleTherapistChange = (id) => {
    //         setTherapistIds((prevIds) => 
    //             prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
    //         );
    //     };

    //     return (
    //         <div className="p-4 bg-white shadow-md rounded-md">
    //             <h2 className="text-2xl font-bold mb-4">Add New Therapy</h2>
    //             <form onSubmit={handleSubmit}>
    //                 {/* Therapy Name */}
    //                 <div className="mb-4">
    //                     <label className="block text-gray-700">Therapy Name</label>
    //                     <input 
    //                         type="text" 
    //                         value={therapyName} 
    //                         onChange={(e) => setTherapyName(e.target.value)}
    //                         required 
    //                         className="border rounded p-2 w-full"
    //                     />
    //                 </div>

    //                 {/* Therapist Options */}
    //                 <div className="mb-4">
    //                     <label className="block text-gray-700">Select Therapists</label>
    //                     <div className="flex flex-col">
    //                         {therapists.map(therapist => (
    //                             <label key={therapist._id} className="flex items-center mb-2">
    //                                 <input 
    //                                     type="checkbox" 
    //                                     value={therapist._id} 
    //                                     checked={therapistIds.includes(therapist._id)} 
    //                                     onChange={() => handleTherapistChange(therapist._id)} 
    //                                     className="mr-2"
    //                                 />
    //                                 {therapist.name} - {therapist.specialization}
    //                             </label>
    //                         ))}
    //                     </div>
    //                 </div>

    //                 {/* Plan Days */}
    //                 <div className="mb-4">
    //                     <h3 className="text-lg font-semibold">Therapy Plan</h3>
    //                     {plans.map((plan, index) => (
    //                         <div key={index} className="mb-4 p-4 border rounded-md">
    //                             <h4 className="font-bold">Day {index + 1}</h4>
    //                             <label className="block text-gray-700">Goals</label>
    //                             <input
    //                                 type="text"
    //                                 name="goals"
    //                                 value={plan.goals}
    //                                 onChange={(e) => handlePlanChange(index, e)}
    //                                 required
    //                                 className="border rounded p-2 w-full mb-2"
    //                             />
    //                             <label className="block text-gray-700">Observations</label>
    //                             <input
    //                                 type="text"
    //                                 name="observations"
    //                                 value={plan.observations}
    //                                 onChange={(e) => handlePlanChange(index, e)}
    //                                 required
    //                                 className="border rounded p-2 w-full mb-2"
    //                             />
    //                             <label className="block text-gray-700">Duration (minutes)</label>
    //                             <input
    //                                 type="text"
    //                                 name="duration"
    //                                 value={plan.duration}
    //                                 onChange={(e) => handlePlanChange(index, e)}
    //                                 required
    //                                 className="border rounded p-2 w-full mb-2"
    //                             />
    //                             <label className="block text-gray-700">Mode (e.g., in-person, online)</label>
    //                             <input
    //                                 type="text"
    //                                 name="mode"
    //                                 value={plan.mode}
    //                                 onChange={(e) => handlePlanChange(index, e)}
    //                                 required
    //                                 className="border rounded p-2 w-full"
    //                             />
    //                         </div>
    //                     ))}
    //                 </div>

    //                 {/* Add Day Button */}
    //                 <button type="button" onClick={addDay} className="bg-blue-500 text-white px-4 py-2 rounded">
    //                     Add Another Day
    //                 </button>

    //                 {/* Submit Button */}
    //                 <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
    //                     Submit Therapy
    //                 </button>
    //             </form>
    //         </div>
    //     );
    // };

    // export default AddTherapy;
































//     // AddTherapy.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AddTherapy = () => {
//   const [patients, setPatients] = useState([]);
//   const [therapists, setTherapists] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [selectedTherapist, setSelectedTherapist] = useState('');
//   const [therapyNames, setTherapyNames] = useState({
//     occupational: false,
//     speech: false,
//     behavioral: false,
//   });
//   const [therapyGoals, setTherapyGoals] = useState([]);
//   const [observations, setObservations] = useState('');
//   const [dailyActivities, setDailyActivities] = useState(['']);
//   const [timeDuration, setTimeDuration] = useState('');
//   const [assignedDays, setAssignedDays] = useState('');
//   const [therapyCompletedDays, setTherapyCompletedDays] = useState(0);
//   const [therapyPlan, settherapyPlan] = useState(0);
  
//   useEffect(() => {
//     const fetchPatientsAndTherapists = async () => {
//       try {
//         const patientsResponse = await axios.get('{process.env.REACT_APP_API_URL}/api/allpatients');
//         setPatients(patientsResponse.data);
        
//         const therapistsResponse = await axios.get('{process.env.REACT_APP_API_URL}/api/therapists');
//         setTherapists(therapistsResponse.data);
//       } catch (error) {
//         console.error('Error fetching patients or therapists:', error);
//       }
//     };

//     fetchPatientsAndTherapists();
//   }, []);

//   const handlePatientChange = async (e) => {
//     const patientId = e.target.value;
//     setSelectedPatient(patientId);

//     if (patientId) {
//       try {
//         const patientResponse = await axios.get(`{process.env.REACT_APP_API_URL}/api/patients/${patientId}`);
//         const { therapyCompletedDays, therapyPlan } = patientResponse.data; // Adjust as per your response structure
//         setTherapyCompletedDays(therapyCompletedDays);
//         settherapyPlan(therapyPlan);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//       }
//     }
//   };

//   const handleTherapyNameChange = (e) => {
//     const { name, checked } = e.target;
//     setTherapyNames((prev) => ({ ...prev, [name]: checked }));
//     // Here you can set therapy goals based on the therapy name selection
//     // Example:
//     if (name === 'behavioral' && checked) {
//       setTherapyGoals(['Short Term', 'Long Term']);
//     } else {
//       setTherapyGoals([]);
//     }
//   };

//   const handleAddActivity = () => {
//     setDailyActivities((prev) => [...prev, '']); // Add an empty string for a new activity input
//   };

//   const handleActivityChange = (index, value) => {
//     const newActivities = [...dailyActivities];
//     newActivities[index] = value;
//     setDailyActivities(newActivities);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const therapyDaysLeft = therapyPlan - therapyCompletedDays;
//     console.log("days left",therapyDaysLeft )

//     try {
//       await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
//         patientName: selectedPatient,
//         therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
//         therapists: selectedTherapist,
//         therapyGoals,
//         observations,
//         dailyActivities,
//         timeDuration,
//         assignedDays: Math.min(therapyDaysLeft, assignedDays), // Ensuring assigned days do not exceed limits
//       });

//       // Clear the form or show a success message as needed
//     } catch (error) {
//       console.error('Error adding therapy:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow-md">
//       <h2 className="text-lg font-bold mb-4">Add New Therapy Record</h2>

//       <div className="mb-4">
//         <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
//         <select id="patient" value={selectedPatient} onChange={handlePatientChange} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a patient</option>
//           {patients.map(patient => (
//             <option key={patient._id} value={patient._id}>{patient.name}</option> // Adjust as per your patient model
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="therapist" className="block text-sm font-medium text-gray-700">Therapist</label>
//         <select id="therapist" value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a therapist</option>
//           {therapists.map(therapist => (
//             <option key={therapist._id} value={therapist._id}>{therapist.name}</option> // Adjust as per your therapist model
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Therapy Name</label>
//         <div className="flex space-x-4">
//           {Object.keys(therapyNames).map((therapyName) => (
//             <label key={therapyName} className="flex items-center">
//               <input
//                 type="checkbox"
//                 name={therapyName}
//                 checked={therapyNames[therapyName]}
//                 onChange={handleTherapyNameChange}
//                 className="mr-2"
//               />
//               {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}
//             </label>
//           ))}
//         </div>
//       </div>

//       {therapyNames.behavioral && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Therapy Goals</label>
//           <div className="flex space-x-4">
//             {therapyGoals.map((goal) => (
//               <label key={goal} className="flex items-center">
//                 <input
//                   type="radio"
//                   name="therapyGoal"
//                   value={goal}
//                   className="mr-2"
//                 />
//                 {goal}
//               </label>
//             ))}
//           </div>
//         </div>
//       )}

//       {therapyNames.behavioral && (
//         <div className="mb-4">
//           <label htmlFor="observations" className="block text-sm font-medium text-gray-700">Observations</label>
//           <textarea
//             id="observations"
//             value={observations}
//             onChange={(e) => setObservations(e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//             rows="4"
//           />
//         </div>
//       )}

//       <div className="mb-4">
//         <label htmlFor="dailyActivities" className="block text-sm font-medium text-gray-700">Daily Activities</label>
//         {dailyActivities.map((activity, index) => (
//           <div key={index} className="flex space-x-2 mb-2">
//             <input
//               type="text"
//               value={activity}
//               onChange={(e) => handleActivityChange(index, e.target.value)}
//               className="mt-1 block w-full border rounded p-2"
//               placeholder="Enter activity"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddActivity} className="text-blue-500">Add Activity</button>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Time Duration (in minutes)</label>
//         <input
//           type="number"
//           id="timeDuration"
//           value={timeDuration}
//           onChange={(e) => setTimeDuration(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter time duration"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="assignedDays" className="block text-sm font-medium text-gray-700">Assigned Days</label>
//         <input
//           type="number"
//           id="assignedDays"
//           value={assignedDays}
//           onChange={(e) => setAssignedDays(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter assigned days"
//           max={therapyPlan - therapyCompletedDays} // Ensure not exceeding the limit
//         />
//         <p className="mt-2 text-sm text-gray-500">Therapy Completed: {therapyCompletedDays}, Therapy Remaining: {therapyPlan - therapyCompletedDays}</p>
//       </div>

//       <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>
//     </form>
//   );
// };

// export default AddTherapy;





































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AddTherapy = () => {
//   const [patients, setPatients] = useState([]);
//   const [therapists, setTherapists] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [selectedTherapist, setSelectedTherapist] = useState('');
//   const [therapyNames, setTherapyNames] = useState({
//     occupational: false,
//     speech: false,
//     behavioral: false,
//   });
//   const [therapyGoals, setTherapyGoals] = useState([]);
//   const [observations, setObservations] = useState('');
//   const [dailyActivities, setDailyActivities] = useState(['']);
//   const [timeDuration, setTimeDuration] = useState('');
//   const [assignedDays, setAssignedDays] = useState('');
//   const [therapyCompletedDays, setTherapyCompletedDays] = useState(0);
//   const [therapyPlan, settherapyPlan] = useState(0);

//   useEffect(() => {
//     const fetchPatientsAndTherapists = async () => {
//       try {
//         const patientsResponse = await axios.get('{process.env.REACT_APP_API_URL}/api/allpatients');
//         setPatients(patientsResponse.data);
        
//         const therapistsResponse = await axios.get('{process.env.REACT_APP_API_URL}/api/therapists');
//         setTherapists(therapistsResponse.data);
//       } catch (error) {
//         console.error('Error fetching patients or therapists:', error);
//       }
//     };

//     fetchPatientsAndTherapists();
//   }, []);

//   const handlePatientChange = async (e) => {
//     const patientId = e.target.value;
//     setSelectedPatient(patientId);

//     if (patientId) {
//       try {
//         const patientResponse = await axios.get(`{process.env.REACT_APP_API_URL}/api/patients/${patientId}`);
//         const { therapyCompletedDays, therapyPlan } = patientResponse.data; // Adjust as per your response structure
//         setTherapyCompletedDays(therapyCompletedDays);
//         settherapyPlan(therapyPlan);
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//       }
//     }
//   };

//   const handleTherapyNameChange = (e) => {
//     const { name, checked } = e.target;
//     setTherapyNames((prev) => ({ ...prev, [name]: checked }));
//     if (name === 'behavioral' && checked) {
//       setTherapyGoals(['Short Term', 'Long Term']);
//     } else {
//       setTherapyGoals([]);
//     }
//   };

//   const handleAddActivity = () => {
//     setDailyActivities((prev) => [...prev, '']); // Add an empty string for a new activity input
//   };

//   const handleActivityChange = (index, value) => {
//     const newActivities = [...dailyActivities];
//     newActivities[index] = value;
//     setDailyActivities(newActivities);
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log(therapyPlan,therapyCompletedDays)
// //     const therapyDaysLeft = therapyPlan - therapyCompletedDays;
// //     console.log("days left",therapyDaysLeft );

// //     try {
// //       await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
// //         patientName: selectedPatient,
// //         therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
// //         therapists: selectedTherapist,
// //         therapyGoals,
// //         observations,
// //         dailyActivities,
// //         timeDuration,
// //         assignedDays: Math.min(therapyDaysLeft, assignedDays), // Ensuring assigned days do not exceed limits
// //       });

// //       // Clear the form or show a success message as needed
// //     } catch (error) {
// //       console.error('Error adding therapy:', error);
// //     }
// //   };








// // const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const therapyDaysLeft = therapyPlan - therapyCompletedDays;
// //     const daysToAssign = Math.min(therapyDaysLeft, assignedDays); // Make sure assignedDays doesn't exceed remaining days
// //     const updatedTherapyCompletedDays = therapyCompletedDays + Number(daysToAssign); // Add assignedDays to therapyCompletedDays

// //     try {
// //       // Post the therapy data to the server
// //       await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
// //         patientName: selectedPatient,
// //         therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
// //         therapists: selectedTherapist,
// //         therapyGoals,
// //         observations,
// //         dailyActivities,
// //         timeDuration,
// //         assignedDays: daysToAssign, // Send only the allowed number of assigned days
// //         therapyCompletedDays: updatedTherapyCompletedDays, // Send the updated therapyCompletedDays
// //       });

// //       // Update the local state to reflect the new therapyCompletedDays
// //       setTherapyCompletedDays(updatedTherapyCompletedDays);

// //       // Log the success
// //       console.log('Therapy added successfully.');
// //       console.log(`Updated therapyCompletedDays: ${updatedTherapyCompletedDays}`);
// //     } catch (error) {
// //       console.error('Error adding therapy:', error);
// //     }
// // };











// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const therapyDaysLeft = therapyPlan - therapyCompletedDays;
//     const daysToAssign = Math.min(therapyDaysLeft, assignedDays);
//     const updatedTherapyCompletedDays = therapyCompletedDays + Number(daysToAssign);
  
//     try {
//       await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
//         patientName: selectedPatient,
//         therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
//         therapists: selectedTherapist,
//         therapyGoals,
//         observations,  // Capturing all therapy-specific observations
//         dailyActivities,
//         timeDuration,
//         assignedDays: daysToAssign,
//         therapyCompletedDays: updatedTherapyCompletedDays,
//       });
  
//       setTherapyCompletedDays(updatedTherapyCompletedDays);
  
//       console.log('Therapy added successfully.');
//       console.log(`Updated therapyCompletedDays: ${updatedTherapyCompletedDays}`);
//     } catch (error) {
//       console.error('Error adding therapy:', error);
//     }
//   };
  
//   // Updated form structure to render observations for all selected therapies
//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow-md">
//       <h2 className="text-lg font-bold mb-4">Add New Therapy Record</h2>
  
//       <div className="mb-4">
//         <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
//         <select id="patient" value={selectedPatient} onChange={handlePatientChange} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a patient</option>
//           {patients.map(patient => (
//             <option key={patient._id} value={patient._id}>{patient.name}</option>
//           ))}
//         </select>
//       </div>
  
//       <div className="mb-4">
//         <label htmlFor="therapist" className="block text-sm font-medium text-gray-700">Therapist</label>
//         <select id="therapist" value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a therapist</option>
//           {therapists.map(therapist => (
//             <option key={therapist._id} value={therapist._id}>{therapist.name}</option>
//           ))}
//         </select>
//       </div>
  
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Therapy Name</label>
//         <div className="flex space-x-4">
//           {Object.keys(therapyNames).map((therapyName) => (
//             <label key={therapyName} className="flex items-center">
//               <input
//                 type="checkbox"
//                 name={therapyName}
//                 checked={therapyNames[therapyName]}
//                 onChange={handleTherapyNameChange}
//                 className="mr-2"
//               />
//               {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}
//             </label>
//           ))}
//         </div>
//       </div>
  
//       {Object.keys(therapyNames).filter(name => therapyNames[name]).map((therapyName) => (
//         <div key={therapyName} className="mb-4">
//           <label htmlFor={`observations-${therapyName}`} className="block text-sm font-medium text-gray-700">{therapyName} Observations</label>
//           <textarea
//             id={`observations-${therapyName}`}
//             value={observations[therapyName] || ''}
//             onChange={(e) => setObservations(prev => ({ ...prev, [therapyName]: e.target.value }))}
//             className="mt-1 block w-full border rounded p-2"
//             rows="4"
//           />
//         </div>
//       ))}
  
//       <div className="mb-4">
//         <label htmlFor="dailyActivities" className="block text-sm font-medium text-gray-700">Daily Activities</label>
//         {dailyActivities.map((activity, index) => (
//           <div key={index} className="flex space-x-2 mb-2">
//             <input
//               type="text"
//               value={activity}
//               onChange={(e) => handleActivityChange(index, e.target.value)}
//               className="mt-1 block w-full border rounded p-2"
//               placeholder="Enter activity"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddActivity} className="text-blue-500">Add Activity</button>
//       </div>
  
//       <div className="mb-4">
//         <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Time Duration (in minutes)</label>
//         <input
//           type="number"
//           id="timeDuration"
//           value={timeDuration}
//           onChange={(e) => setTimeDuration(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter time duration"
//         />
//       </div>
  
//       <div className="mb-4">
//         <label htmlFor="assignedDays" className="block text-sm font-medium text-gray-700">Assigned Days</label>
//         <input
//           type="number"
//           id="assignedDays"
//           value={assignedDays}
//           onChange={(e) => setAssignedDays(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter assigned days"
//           max={therapyDaysLeft}
//         />
//         <p className="text-sm text-gray-600">Completed: {therapyCompletedDays} days, Remaining: {therapyDaysLeft} days</p>
//       </div>
  
//       <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
//     </form>
//   );
  






















//   // Calculating remaining therapy days
//   const therapyDaysLeft = therapyPlan - therapyCompletedDays;

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow-md">
//       <h2 className="text-lg font-bold mb-4">Add New Therapy Record</h2>

//       <div className="mb-4">
//         <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
//         <select id="patient" value={selectedPatient} onChange={handlePatientChange} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a patient</option>
//           {patients.map(patient => (
//             <option key={patient._id} value={patient._id}>{patient.name}</option> // Adjust as per your patient model
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="therapist" className="block text-sm font-medium text-gray-700">Therapist</label>
//         <select id="therapist" value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a therapist</option>
//           {therapists.map(therapist => (
//             <option key={therapist._id} value={therapist._id}>{therapist.name}</option> // Adjust as per your therapist model
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Therapy Name</label>
//         <div className="flex space-x-4">
//           {Object.keys(therapyNames).map((therapyName) => (
//             <label key={therapyName} className="flex items-center">
//               <input
//                 type="checkbox"
//                 name={therapyName}
//                 checked={therapyNames[therapyName]}
//                 onChange={handleTherapyNameChange}
//                 className="mr-2"
//               />
//               {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}
//             </label>
//           ))}
//         </div>
//       </div>

//       {therapyNames.behavioral && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Therapy Goals</label>
//           <div className="flex space-x-4">
//             {therapyGoals.map((goal) => (
//               <label key={goal} className="flex items-center">
//                 <input
//                   type="radio"
//                   name="therapyGoal"
//                   value={goal}
//                   className="mr-2"
//                 />
//                 {goal}
//               </label>
//             ))}
//           </div>
//         </div>
//       )}

//       {therapyNames.behavioral && (
//         <div className="mb-4">
//           <label htmlFor="observations" className="block text-sm font-medium text-gray-700">Observations</label>
//           <textarea
//             id="observations"
//             value={observations}
//             onChange={(e) => setObservations(e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//             rows="4"
//           />
//         </div>
//       )}

//       <div className="mb-4">
//         <label htmlFor="dailyActivities" className="block text-sm font-medium text-gray-700">Daily Activities</label>
//         {dailyActivities.map((activity, index) => (
//           <div key={index} className="flex space-x-2 mb-2">
//             <input
//               type="text"
//               value={activity}
//               onChange={(e) => handleActivityChange(index, e.target.value)}
//               className="mt-1 block w-full border rounded p-2"
//               placeholder="Enter activity"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddActivity} className="text-blue-500">Add Activity</button>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Time Duration (in minutes)</label>
//         <input
//           type="number"
//           id="timeDuration"
//           value={timeDuration}
//           onChange={(e) => setTimeDuration(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter time duration"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="assignedDays" className="block text-sm font-medium text-gray-700">Assigned Days</label>
//         <input
//           type="number"
//           id="assignedDays"
//           value={assignedDays}
//           onChange={(e) => setAssignedDays(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter assigned days"
//           max={therapyDaysLeft} // Ensuring it doesn't exceed the remaining days
//         />
//         <p className="text-sm text-gray-600">Completed: {therapyCompletedDays} days, Remaining: {therapyDaysLeft} days</p>
//       </div>

//       <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
//     </form>
//   );
// };

// export default AddTherapy;














































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddTherapy = () => {
//   const [patients, setPatients] = useState([]);
//   const [therapists, setTherapists] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [selectedTherapist, setSelectedTherapist] = useState('');
//   const [therapyNames, setTherapyNames] = useState({
//     behaviouralTherapy: false,
//     speechTherapy: false,
//     occupationalTherapy: false,
//   });
//   const [therapyGoals, setTherapyGoals] = useState({
//     behaviouralTherapy: { shortTerm: false, longTerm: false },
//     speechTherapy: { shortTerm: false, longTerm: false },
//     occupationalTherapy: { shortTerm: false, longTerm: false },
//   });
//   const [observations, setObservations] = useState({
//     behaviouralTherapy: '',
//     speechTherapy: '',
//     occupationalTherapy: '',
//   });
//   const [dailyActivities, setDailyActivities] = useState([]);
//   const [timeDuration, setTimeDuration] = useState('');
//   const [assignedDays, setAssignedDays] = useState('');
//   const [therapyCompletedDays, setTherapyCompletedDays] = useState(0);
//   const [therapyPlan, setTherapyPlan] = useState(30);  // Default value for therapy plan duration

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [patientsResponse, therapistsResponse] = await Promise.all([
//           axios.get('{process.env.REACT_APP_API_URL}/api/allpatients'),
//           axios.get('{process.env.REACT_APP_API_URL}/api/therapists')
//         ]);

//         setPatients(patientsResponse.data);
//         setTherapists(therapistsResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handlePatientChange = (e) => {
//     setSelectedPatient(e.target.value);
//   };

//   const handleTherapyNameChange = (e) => {
//     const { name, checked } = e.target;
//     setTherapyNames(prev => ({
//       ...prev,
//       [name]: checked
//     }));
//   };

//   const handleActivityChange = (index, value) => {
//     const updatedActivities = [...dailyActivities];
//     updatedActivities[index] = value;
//     setDailyActivities(updatedActivities);
//   };

//   const handleAddActivity = () => {
//     setDailyActivities(prev => [...prev, '']);
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Calculate remaining days in the therapy plan
// //     const therapyDaysLeft = therapyPlan - therapyCompletedDays;
    
// //     // Ensure we only assign days within the limit
// //     const daysToAssign = Math.min(therapyDaysLeft, assignedDays);
    
// //     // Update the completed days after assigning
// //     const updatedTherapyCompletedDays = therapyCompletedDays + Number(daysToAssign);
// //     console.log(therapyCompletedDays , daysToAssign)

// //     try {
// //       await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
// //         patientName: selectedPatient,
// //         therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
// //         therapists: selectedTherapist,
// //         therapyGoals,
// //         observations,
// //         dailyActivities,
// //         timeDuration,
// //         assignedDays: daysToAssign,
// //         therapyCompletedDays: updatedTherapyCompletedDays,
// //       });

// //       setTherapyCompletedDays(updatedTherapyCompletedDays);

// //       console.log('Therapy added successfully.');
// //     } catch (error) {
// //       console.error('Error adding therapy:', error);
// //     }
// //   };





// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Calculate remaining days in the therapy plan
//     const therapyDaysLeft = therapyPlan - therapyCompletedDays;
  
//     // Ensure we only assign days within the limit
//     const daysToAssign = Math.min(therapyDaysLeft, assignedDays);
  
//     // Update completed days after assigning
//     const updatedTherapyCompletedDays = therapyCompletedDays + Number(daysToAssign);
  
//     try {
//       // Step 1: Add the therapy record
//     const therapyResponse=  await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
//         patientName: selectedPatient,
//         therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
//         therapists: selectedTherapist,
//         therapyGoals,
//         observations,
//         dailyActivities,
//         timeDuration,
//         assignedDays: daysToAssign,
//         therapyCompletedDays: updatedTherapyCompletedDays,
//       });
  

//       const therapyId = therapyResponse.data.therapy._id;
//       console.log(therapyResponse.data.therapy._id)
//       // Step 2: Update the patient with the new therapyCompletedDays
//       await axios.put(`{process.env.REACT_APP_API_URL}/api/update-patient/${selectedPatient}`, {
//         therapyCompletedDays: therapyCompletedDays+updatedTherapyCompletedDays,
//          // Update with new therapy completed days
//          therapyId: [therapyId],
//       });
  
//       // Update the local state for therapy completed days
//       setTherapyCompletedDays(updatedTherapyCompletedDays);
  
//       console.log('Therapy added and patient updated successfully.');
//     } catch (error) {
//       console.error('Error adding therapy or updating patient:', error);
//     }
//   };
  








//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow-md">
//       <h2 className="text-lg font-bold mb-4">Add New Therapy Record</h2>

//       <div className="mb-4">
//         <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
//         <select id="patient" value={selectedPatient} onChange={handlePatientChange} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a patient</option>
//           {patients.map(patient => (
//             <option key={patient._id} value={patient._id}>{patient.name}</option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="therapist" className="block text-sm font-medium text-gray-700">Therapist</label>
//         <select id="therapist" value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)} className="mt-1 block w-full border rounded p-2">
//           <option value="">Select a therapist</option>
//           {therapists.map(therapist => (
//             <option key={therapist._id} value={therapist._id}>{therapist.name}</option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Therapy Name</label>
//         <div className="flex space-x-4">
//           {Object.keys(therapyNames).map((therapyName) => (
//             <label key={therapyName} className="flex items-center">
//               <input
//                 type="checkbox"
//                 name={therapyName}
//                 checked={therapyNames[therapyName]}
//                 onChange={handleTherapyNameChange}
//                 className="mr-2"
//               />
//               {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}
//             </label>
//           ))}
//         </div>
//       </div>

//       {Object.keys(therapyNames).filter(name => therapyNames[name]).map((therapyName) => (
//         <div key={therapyName} className="mb-4">
//           <label htmlFor={`observations-${therapyName}`} className="block text-sm font-medium text-gray-700">{therapyName} Observations</label>
//           <textarea
//             id={`observations-${therapyName}`}
//             value={observations[therapyName] || ''}
//             onChange={(e) => setObservations(prev => ({ ...prev, [therapyName]: e.target.value }))}
//             className="mt-1 block w-full border rounded p-2"
//             rows="4"
//           />
//         </div>
//       ))}

//       <div className="mb-4">
//         <label htmlFor="dailyActivities" className="block text-sm font-medium text-gray-700">Daily Activities</label>
//         {dailyActivities.map((activity, index) => (
//           <div key={index} className="flex space-x-2 mb-2">
//             <input
//               type="text"
//               value={activity}
//               onChange={(e) => handleActivityChange(index, e.target.value)}
//               className="mt-1 block w-full border rounded p-2"
//               placeholder="Enter activity"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddActivity} className="text-blue-500">Add Activity</button>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Time Duration (in minutes)</label>
//         <input
//           type="number"
//           id="timeDuration"
//           value={timeDuration}
//           onChange={(e) => setTimeDuration(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter time duration"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="assignedDays" className="block text-sm font-medium text-gray-700">Assigned Days</label>
//         <input
//           type="number"
//           id="assignedDays"
//           value={assignedDays}
//           onChange={(e) => setAssignedDays(e.target.value)}
//           className="mt-1 block w-full border rounded p-2"
//           placeholder="Enter assigned days"
//         />
//       </div>

//       <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
//     </form>
//   );
// };

// export default AddTherapy;
















































import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTherapy = () => {
  const [patients, setPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);

  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [therapyNames, setTherapyNames] = useState({
    behaviouralTherapy: false,
    speechTherapy: false,
    occupationalTherapy: false,
  });
  const [therapyGoals, setTherapyGoals] = useState({
    behaviouralTherapy: { shortTerm: false, longTerm: false },
    speechTherapy: { shortTerm: false, longTerm: false },
    occupationalTherapy: { shortTerm: false, longTerm: false },
  });
  const [observations, setObservations] = useState({
    behaviouralTherapy: '',
    speechTherapy: '',
    occupationalTherapy: '',
  });
  const [dailyActivities, setDailyActivities] = useState([]);
  const [timeDuration, setTimeDuration] = useState('');
  const [assignedDays, setAssignedDays] = useState('');
  const [therapyCompletedDays, setTherapyCompletedDays] = useState(0);
  const [therapyPlan, setTherapyPlan] = useState(30); // Default value for therapy plan duration
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientDetails, setPatientDetails] = useState({});



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsResponse, therapistsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/allpatients`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/therapists`),
        ]);

        setPatients(patientsResponse.data);
        setTherapists(therapistsResponse.data);
        // setTherapyPlan(patients)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // const handlePatientChange = (e) => {
  //   setSelectedPatient(e.target.value);
  // };

  const handleTherapyNameChange = (e) => {
    const { name, checked } = e.target;
    setTherapyNames((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Reset goals when therapy name is unchecked
    if (!checked) {
      setTherapyGoals((prev) => ({
        ...prev,
        [name]: { shortTerm: false, longTerm: false },
      }));
    }
  };

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...dailyActivities];
    updatedActivities[index] = value;
    setDailyActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    setDailyActivities((prev) => [...prev, '']);
  };

  const handleGoalChange = (therapyType, goalType) => {
    setTherapyGoals((prev) => ({
      ...prev,
      [therapyType]: {
        ...prev[therapyType],
        [goalType]: !prev[therapyType][goalType],
      },
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(patients)
    
  //   const therapyDaysLeft = therapyPlan - therapyCompletedDays;
  //   const daysToAssign = Math.min(therapyDaysLeft, assignedDays);
  //   const updatedTherapyCompletedDays = therapyCompletedDays + Number(daysToAssign);
  //   console.log(updatedTherapyCompletedDays)
  
  //   try {
  //     const therapyResponse = await axios.post('{process.env.REACT_APP_API_URL}/api/add-therapy', {
  //       patientName: selectedPatient,
  //       therapyNames: Object.keys(therapyNames).filter(name => therapyNames[name]),
  //       therapists: selectedTherapist,
  //       therapyGoals,
  //       observations,
  //       dailyActivities,
  //       timeDuration,
  //       assignedDays: daysToAssign,
  //       therapyCompletedDays: updatedTherapyCompletedDays,
  //     });
  
  //     const therapyId = therapyResponse.data.therapy._id;
  //     console.log(updatedTherapyCompletedDays)
  //     await axios.put(`{process.env.REACT_APP_API_URL}/api/update-patient/${selectedPatient}`, {
  //       therapyCompletedDays: therapyCompletedDays + updatedTherapyCompletedDays,
  //       therapyId: [therapyId],
  //     });
  
  //     setTherapyCompletedDays(updatedTherapyCompletedDays);
  //     console.log('Therapy added and patient updated successfully.');
  //   } catch (error) {
  //     console.error('Error adding therapy or updating patient:', error);
  //   }
  // };









  const handlePatientChange = async (e) => {
    const selectedPatientId = e.target.value;
    setSelectedPatient(selectedPatientId);

    if (selectedPatientId) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patient/${selectedPatientId}`);
        setPatientDetails(response.data); // Store patient details
        setTherapyPlan(response.data.therapyPlan); // Set therapy plan directly from patient details
        setTherapyCompletedDays(response.data.therapyCompletedDays); // Set completed days
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    }
  };
  

  
 



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const patientDetails= await axios.get(`{process.env.REACT_APP_API_URL}/api/patient/${selectedPatient}`)
    // console.log(patientDetails)
    // console.log(patientDetails.data.therapyPlan)
    // setTherapyPlan(patientDetails.data.therapyPlan)
    // const plan = patientDetails.data.therapyPlan;


    // setTherapyCompletedDays(patientDetails.data.therapyCompletedDays);
    
    // setTherapyPlan(plan);
    
    const therapyDaysLeft =  therapyPlan  - therapyCompletedDays;
    console.log("therapyPlan",therapyPlan,"therapyCompletedDays",therapyCompletedDays)
    // console.log(therapyDaysLeft)
    console.log('lllllllllllllllllllllllllllllllllllllssssssssssss',assignedDays  )
    console.log("ppppppppppppppppppppppppppppppppppppppppppp",assignedDays)
    const daysToAssign =Number(assignedDays);
    // const daysToAssign = Math.min(therapyDaysLeft, Number(assignedDays));
    console.log(typeof daysToAssign);
    const intAssignedDays = Number(assignedDays);
    
    // Validation for assigned days
    if (intAssignedDays > therapyDaysLeft) {
      alert(`You cannot assign more than the remaining days (${therapyDaysLeft}).`);
      return;
    }
  
    // const updatedTherapyCompletedDays = daysToAssign;

    const updatedTherapyCompletedDays = therapyCompletedDays + intAssignedDays;
    // console.log("updatedTherapyCompletedDays",updatedTherapyCompletedDays)
    console.log("intAssignedDays",intAssignedDays)
  
    try {
      const therapyResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-therapy`, {
        patientName: selectedPatient,
        therapyNames: Object.keys(therapyNames).filter((name) => therapyNames[name]),
        therapists: selectedTherapist,
        therapyGoals,
        observations,
        dailyActivities,
        timeDuration,
        assignedDays: intAssignedDays,
      });
  
      const therapyId = therapyResponse.data.therapy._id;
      console.log(typeof therapyId)
console.log("patient detaislsssssssssssssssssssssss", patientDetails)
      const updatedTherapyIdArray = [...patientDetails.therapyId, therapyId];
      console.log(updatedTherapyIdArray)
  
      await axios.put(`${process.env.REACT_APP_API_URL}/api/update-patient/${selectedPatient}`, {
        therapyCompletedDays: updatedTherapyCompletedDays,
        therapyId: updatedTherapyIdArray,
      });
  
      setTherapyCompletedDays(updatedTherapyCompletedDays);
      console.log('Therapy added and patient updated successfully.');
    } catch (error) {
      console.error('Error adding therapy or updating patient:', error);
      console.error(error.response.data.error)
    }
  };
  









  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto p-4 border rounded shadow-md">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column: Patient and Therapist Selection */}
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mb-4">Add New Therapy Record</h2>
      <div className="mb-4">
        <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          id="patient"
          value={selectedPatient}
          onChange={handlePatientChange}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>{patient.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="therapist" className="block text-sm font-medium text-gray-700">Therapist</label>
        <select
          id="therapist"
          value={selectedTherapist}
          onChange={(e) => setSelectedTherapist(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Select a therapist</option>
          {therapists.map((therapist) => (
            <option key={therapist._id} value={therapist._id}>{therapist.name}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Right Column: Time Duration, Assigned Days, and Daily Activities */}
    <div className="flex flex-col md:items-end">
      {/* Time Duration */}
      <div className="mb-4 w-full">
        <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Time Duration</label>
        <input
          type="text"
          id="timeDuration"
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Time Duration (e.g., 30 minutes)"
        />
      </div>

      {/* Assigned Days */}
      <div className="mb-4 w-full">
        <label htmlFor="assignedDays" className="block text-sm font-medium text-gray-700">Assigned Days</label>
        <input
          type="number"
          id="assignedDays"
          value={assignedDays}
          onChange={(e) => setAssignedDays(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Enter number of assigned days"
        />
      </div>

      {/* Daily Activities Section */}
      <div className="mb-4 w-full">
        <h3 className="font-semibold">Daily Activities</h3>
        {dailyActivities.map((activity, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={activity}
              onChange={(e) => handleActivityChange(index, e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              placeholder="Activity"
            />
          </div>
        ))}
        <button 
          type="button" 
          onClick={handleAddActivity} 
          className="bg-blue-500 text-white rounded px-4 py-2 mt-2">
          Add Activity
        </button>
      </div>
    </div>
  </div>

  {/* Therapy Name Section, Goals, Observations */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Therapy Name</label>
    <div className="flex flex-wrap space-x-4">
      {Object.keys(therapyNames).map((therapyName) => (
        <label key={therapyName} className="flex items-center">
          <input
            type="checkbox"
            name={therapyName}
            checked={therapyNames[therapyName]}
            onChange={handleTherapyNameChange}
            className="mr-2"
          />
          {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}
        </label>
      ))}
    </div>
  </div>


  {/* Therapy Goals and Observations */}
  {Object.keys(therapyNames).filter(name => therapyNames[name]).map((therapyName) => (
    <div key={therapyName} className="mb-2">
      <h3 className="font-semibold">Therapy Goals for {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}</h3>
      <label className="flex items-center">
        <input
          type="radio"
          name={`${therapyName}Goals`}
          checked={therapyGoals[therapyName].shortTerm}
          onChange={() => handleGoalChange(therapyName, 'shortTerm')}
        />
        Short Term Goal
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name={`${therapyName}Goals`}
          checked={therapyGoals[therapyName].longTerm}
          onChange={() => handleGoalChange(therapyName, 'longTerm')}
        />
        Long Term Goal
      </label>

      <label className="block text-sm font-medium text-gray-700">Observations for {therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}</label>
      <textarea
        value={observations[therapyName]}
        onChange={(e) => setObservations((prev) => ({ ...prev, [therapyName]: e.target.value }))}
        className="mt-1 block w-full border rounded p-2"
        rows="3"
      />
    </div>
  ))}

  {/* Therapy Plan Summary and Submit Button */}
  <div className="mb-4">
    <label htmlFor="therapyPlan" className="block text-sm font-medium text-gray-700">
      Therapy Plan Days:
    </label>
    <p className="mt-1 text-gray-800">{therapyPlan}</p>
  </div>

  <div className="mb-4">
    <p htmlFor="therapyCompletedDays" className="block text-sm font-medium text-gray-700">
      Therapy Completed Days:
    </p>
    <p className="mt-1 text-gray-800">{therapyCompletedDays}</p>
  </div>

  <div className="mb-4">
    <label htmlFor="therapyDaysLeft" className="block text-sm font-medium text-gray-700">
      Therapy Days Left:
    </label>
    <p className="mt-1 text-gray-800">{therapyPlan - therapyCompletedDays}</p>
  </div>

  <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 mt-4">
    Submit
  </button>
</form>
  );
};

export default AddTherapy;
