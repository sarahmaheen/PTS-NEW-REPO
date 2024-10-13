// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function AddPatient() {
//   const [patientData, setPatientData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     age: "",
//     therapyId: "",
//     therapistId: "",
//     bookingType: "",
//     paymentAmount: "",
//     dailyActivities: "",
//   });

//   const [therapies, setTherapies] = useState([]);
//   const [therapists, setTherapists] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch Therapies and Therapists when component mounts
//   useEffect(() => {
//     const fetchTherapies = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/therapies", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token
//           },
//         });
//         setTherapies(response.data);
//       } catch (error) {
//         console.error("Error fetching therapies:", error);
//       }
//     };

//     const fetchTherapists = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/therapists", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token
//           },
//         });
//         setTherapists(response.data);
//       } catch (error) {
//         console.error("Error fetching therapists:", error);
//       }
//     };

//     fetchTherapies();
//     fetchTherapists();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData({ ...patientData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const response = await axios.post("http://localhost:3001/api/add-patient", patientData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log(response)
//       setSuccessMessage("Patient added successfully!");
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.message || "Error adding patient");
//       } else {
//         setErrorMessage("Server error. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6">Add New Patient</h2>

//         {/* Success and Error Messages */}
//         {successMessage && (
//           <div className="text-green-500 mb-4">{successMessage}</div>
//         )}
//         {errorMessage && (
//           <div className="text-red-500 mb-4">{errorMessage}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={patientData.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={patientData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={patientData.password}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Age */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Age</label>
//             <input
//               type="number"
//               name="age"
//               value={patientData.age}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Therapy ID Dropdown */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Therapy</label>
//             <select
//               name="therapyId"
//               value={patientData.therapyId}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             >
//               <option value="">Select Therapy</option>
//               {therapies.map((therapy) => (
//                 <option key={therapy._id} value={therapy._id}>
//                   {therapy.name} (Plan: {therapy.plan.length})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Therapist Name Dropdown */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Therapist</label>
//             <select
//               name="therapistId"
//               value={patientData.therapistId}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             >
//               <option value="">Select Therapist</option>
//               {therapists.map((therapist) => (
//                 <option key={therapist._id} value={therapist._id}>
//                   {therapist.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Booking Type */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Booking Type</label>
//             <select
//               name="bookingType"
//               value={patientData.bookingType}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             >
//               <option value="">Select Booking Type</option>
//               <option value="Online">Online</option>
//               <option value="In-person">In-person</option>
//             </select>
//           </div>

//           {/* PaymentAmount */}
//           <div className="mb-4">
//             <label className="block text-gray-700">PaymentAmount</label>
//             <input
//               type="number"
//               name="paymentAmount"
//               value={patientData.paymentAmount}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Daily Activities */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Daily Activities</label>
//             <textarea
//               name="dailyActivities"
//               value={patientData.dailyActivities}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-purple-500 text-white py-2 rounded-lg"
//           >
//             Add Patient
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddPatient;


























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddPatient = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     age: '',
//     condition: '',
//     conditionLevel: '',
//     therapy: [],
//     therapyPlan: '', // Initialize as a string but will convert to number
//     bookingType: '', // Add bookingType here
//     paymentAmount: '', // Add paymentAmount here (paymentAmountAmount as string)
//     PaymentMethod: '', // Add PaymentMethod here
//     therapistArray: [],
//   });

//   const [therapists, setTherapists] = useState([]);

//   useEffect(() => {
//     const fetchTherapists = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/therapists'); // Adjust the URL to your endpoint
//         setTherapists(response.data);
//       } catch (error) {
//         console.error('Error fetching therapists:', error);
//       }
//     };

//     fetchTherapists();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'therapy') {
//       const updatedTherapy = formData.therapy.includes(value)
//         ? formData.therapy.filter((item) => item !== value)
//         : [...formData.therapy, value];
//       setFormData({ ...formData, therapy: updatedTherapy });
//     } else if (name === 'therapyPlan') {
//       // Convert therapyPlan value to a number
//       setFormData({
//         ...formData,
//         [name]: Number(value),  // Convert to number
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleTherapistSelect = (therapistId) => {
//     setFormData((prev) => {
//       const newTherapistArray = prev.therapistArray.includes(therapistId)
//         ? prev.therapistArray.filter((id) => id !== therapistId)
//         : [...prev.therapistArray, therapistId];
//       return { ...prev, therapistArray: newTherapistArray };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(formData);
//       const response = await axios.post('http://localhost:3001/api/add-patient', formData);
//       console.log('Patient added successfully', response.data);
//     } catch (error) {
//       console.error('There was an error adding the patient!', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Patient</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name, Email, Password, Age, Condition, Condition Level Inputs */}
//           {['name', 'email', 'password', 'age', 'condition', 'conditionLevel'].map((field) => (
//             <div key={field}>
//               <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
//               <input
//                 type={field === 'age' ? 'number' : 'text'}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </div>
//           ))}

//           {/* Therapy Checkboxes */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Therapy</label>
//             {['Occupational', 'Behavioral', 'Speech'].map((therapy) => (
//               <div key={therapy} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="therapy"
//                   value={therapy.toLowerCase()}
//                   checked={formData.therapy.includes(therapy.toLowerCase())}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <label className="text-sm text-gray-700">{therapy}</label>
//               </div>
//             ))}
//           </div>

//           {/* Therapy Plan Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Therapy Plan (Days)</label>
//             <select
//               name="therapyPlan"
//               value={formData.therapyPlan}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             >
//               <option value="">Select</option>
//               <option value="30">30 Days</option>
//               <option value="90">90 Days</option>
//               <option value="120">120 Days</option>
//             </select>
//           </div>

//           {/* Therapist Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Select Therapists</label>
//             <div className="flex flex-col space-y-2">
//               {therapists.map((therapist) => (
//                 <div key={therapist._id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     onChange={() => handleTherapistSelect(therapist._id)}
//                     checked={formData.therapistArray.includes(therapist._id)}
//                     className="mr-2"
//                   />
//                   <label className="text-sm text-gray-700">{therapist.name}</label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* PaymentAmount Amount */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">PaymentAmount Amount</label>
//             <input
//               type="text"  // Keep paymentAmountAmount as a string
//               name="paymentAmount"
//               value={formData.paymentAmount}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>

//           {/* PaymentAmount PaymentMethod */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">PaymentAmount PaymentMethod</label>
//             <div className="flex space-x-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="PaymentMethod"
//                   value="Cash"
//                   onChange={handleChange}
//                   className="mr-2"
//                   required
//                 />
//                 <label className="text-sm text-gray-700">Cash</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="PaymentMethod"
//                   value="Online"
//                   onChange={handleChange}
//                   className="mr-2"
//                   required
//                 />
//                 <label className="text-sm text-gray-700">Online</label>
//               </div>
//             </div>
//           </div>

//           {/* Booking Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Booking Type</label>
//             <div className="flex space-x-4">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="bookingType"
//                   value="In-Person"
//                   onChange={handleChange}
//                   className="mr-2"
//                   required
//                 />
//                 <label className="text-sm text-gray-700">In-Person</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="bookingType"
//                   value="Online"
//                   onChange={handleChange}
//                   className="mr-2"
//                   required
//                 />
//                 <label className="text-sm text-gray-700">Online</label>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
//             >
//               Add Patient
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPatient;






































import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    condition: '',
    conditionLevel: '',
    therapy: [], // Array to store selected therapies
    therapyPlan: '', // Number input
    bookingType: '',
    paymentAmount: '', // Correct key for paymentAmount
    paymentMethod: '',
    therapistArray: [] // Array to store selected therapists
  });

  const [therapists, setTherapists] = useState([]);

  // Fetching therapists
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/therapists');
        setTherapists(response.data);
      } catch (error) {
        console.error('Error fetching therapists:', error);
      }
    };
    fetchTherapists();
  }, []);

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'therapy') {
      const updatedTherapy = formData.therapy.includes(value)
        ? formData.therapy.filter((item) => item !== value)
        : [...formData.therapy, value];
      setFormData({ ...formData, therapy: updatedTherapy });
    } else if (name === 'therapyPlan' || name === 'age' || name === 'paymentAmount') {
      // Convert therapyPlan, age, and paymentAmount to numbers
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle selection of therapists
  const handleTherapistSelect = (therapistId) => {
    setFormData((prev) => {
      const updatedTherapistArray = prev.therapistArray.includes(therapistId)
        ? prev.therapistArray.filter((id) => id !== therapistId)
        : [...prev.therapistArray, therapistId];
      return { ...prev, therapistArray: updatedTherapistArray };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      condition: formData.condition,
      conditionLevel: formData.conditionLevel,
      therapy: formData.therapy,
      therapyPlan: formData.therapyPlan,
      bookingType: formData.bookingType,
      paymentAmount: formData.paymentAmount,
      paymentMethod: formData.paymentMethod,
      therapistArray: formData.therapistArray,
    };

    try {
      console.log('Sending Data:', payload);
      const response = await axios.post('http://localhost:3001/api/add-patient', payload);
      console.log('Patient added successfully', response.data);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="flex">
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {['name', 'email', 'password', 'age', 'condition', 'conditionLevel'].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        ))}
  
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Therapy</label>
          <div className="flex flex-wrap">
            {['Occupational', 'Behavioral', 'Speech'].map((therapy) => (
              <div key={therapy} className="flex items-center mr-4">
                <input
                  type="checkbox"
                  name="therapy"
                  value={therapy.toLowerCase()}
                  checked={formData.therapy.includes(therapy.toLowerCase())}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">{therapy}</label>
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Therapy Plan (days)</label>
          <input
            type="number"
            name="therapyPlan"
            value={formData.therapyPlan}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Booking Type</label>
          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select booking type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
  
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
          <input
            type="number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select payment method</option>
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
  
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Select Therapists</label>
          {therapists.map((therapist) => (
            <div key={therapist._id} className="flex items-center">
              <input
                type="checkbox"
                value={therapist._id}
                checked={formData.therapistArray.includes(therapist._id)}
                onChange={() => handleTherapistSelect(therapist._id)}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">{therapist.name}</label>
            </div>
          ))}
        </div>
  
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default AddPatient;
