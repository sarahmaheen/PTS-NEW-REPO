// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const GetAllPatients = () => {
//   const [parents, setParents] = useState([]);
//   const [error, setError] = useState("");
  
//   // Fetch parents when the component mounts
//   useEffect(() => {
//     const fetchParents = async () => {
//       try {
//         const response = await axios.get("{process.env.REACT_APP_API_URL}/api/allpatients", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
//           },
//         });
//         setParents(response.data);
//       } catch (error) {
//         setError("Error fetching parents data.");
//         console.error("Error fetching parents:", error);
//       }
//     };

//     fetchParents();
//   }, []);

//   // Function to handle delete patient
//   const handleDelete = async (id) => {
//     try {
//       console.log(id)
//       await axios.delete(`{process.env.REACT_APP_API_URL}/api/delete-patient/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       // Filter out the deleted patient from the state
//       setParents(parents.filter((parent) => parent._id !== id));
//     } catch (error) {
//       console.error("Error deleting patient:", error);
//       setError("Error deleting patient.");
//     }
//   };

//   // Function to handle update patient (dummy implementation, can be expanded)
//   const handleUpdate = (id) => {
//     // Navigate to the update patient page or implement update functionality here
//     console.log(`Update patient with ID: ${id}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Parent List</h1>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <button 
//         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4"
//         onClick={() => window.location.reload()} // Reload to fetch all patients again
//       >
//         Read All Patients
//       </button>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {parents.map((parent) => (
//           <div
//             key={parent._id}
//             className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
//           >
//             <h2 className="text-lg font-semibold">{parent.name}</h2>
//             <p className="text-gray-600">Email: {parent.email}</p>
//             <p className="text-gray-600">Age: {parent.age}</p>
//             <p className="text-gray-600">
//               Therapist: {parent.therapistName ? parent.therapistName.name : 'N/A'}
//             </p>
//             <div className="flex justify-between mt-4">
//               <button 
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 onClick={() => handleDelete(parent._id)} // Call delete function
//               >
//                 Delete
//               </button>
//               <button 
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 onClick={() => handleUpdate(parent._id)} // Call update function
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GetAllPatients;



























// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const GetAllPatients = () => {
//   const [patients, setPatients] = useState([]);
//   const [error, setError] = useState("");
//   const [updatePatient, setUpdatePatient] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     age: "",
//     condition: "",
//     conditionLevel: "",
//     therapy: [],
//     therapyPlan: "",
//     bookingType: "",
//     paymentAmount: "",
//     paymentMethod: "",
//     therapyCompletedDays: 0,
//   });

//   // Fetch patients when the component mounts
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await axios.get("{process.env.REACT_APP_API_URL}/api/allpatients", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
//           },
//         });
//         setPatients(response.data);
//       } catch (error) {
//         setError("Error fetching patients data.");
//         console.error("Error fetching patients:", error);
//       }
//     };

//     fetchPatients();
//   }, []);

//   // Function to handle delete patient
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`{process.env.REACT_APP_API_URL}/api/patient/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       // Filter out the deleted patient from the state
//       setPatients(patients.filter((patient) => patient._id !== id));
//     } catch (error) {
//       console.error("Error deleting patient:", error);
//       setError("Error deleting patient.");
//     }
//   };

//   // Function to handle update patient
//   const handleUpdate = (patient) => {
//     // Set the patient data to be updated in the form
//     console.log(patient)
//     setUpdatePatient(patient);
//     setFormData({
//       name: patient.name,
//       email: patient.email,
//       age: patient.age,
//       condition: patient.condition,
//       conditionLevel: patient.conditionLevel,
//       therapy: patient.therapy,
//       therapyPlan: patient.therapyPlan,
//       bookingType: patient.bookingType,
//       paymentAmount: patient.paymentAmount,
//       paymentMethod: patient.paymentMethod,
//       therapyCompletedDays: patient.therapyCompletedDays,
//     });
//     console.log("llllllllllllllllllll",updatePatient)
//   };

//   // Function to handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Function to handle form submission
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",updatePatient)
//       const response = await axios.put(
//         `{process.env.REACT_APP_API_URL}/api/update-patient/${updatePatient._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       // Update the patients list with the updated patient
//       setPatients((prevPatients) =>
//         prevPatients.map((patient) =>
//           patient._id === response.data._id ? response.data : patient
//         )
//       );
//       setUpdatePatient(null); // Reset the update state
//       setFormData({
//         name: "",
//         email: "",
//         age: "",
//         condition: "",
//         conditionLevel: "",
//         therapy: [],
//         therapyPlan: "",
//         bookingType: "",
//         paymentAmount: "",
//         paymentMethod: "",
//         therapyCompletedDays: 0,
//       }); // Reset form data
//     } catch (error) {
//       console.error("Error updating patient:", error);
//       setError("Error updating patient.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Patient List</h1>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <button
//         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4"
//         onClick={() => window.location.reload()} // Reload to fetch all patients again
//       >
//         Read All Patients
//       </button>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {patients.map((patient) => (
//           <div
//             key={patient._id}
//             className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
//           >
//             <h2 className="text-lg font-semibold">{patient.name}</h2>
//             <p className="text-gray-600">Email: {patient.email}</p>
//             <p className="text-gray-600">Age: {patient.age}</p>
//             <p className="text-gray-600">Condition: {patient.condition}</p>
//             <p className="text-gray-600">Therapy: {patient.therapy.join(", ")}</p>
//             <div className="flex justify-between mt-4">
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 onClick={() => handleDelete(patient._id)} // Call delete function
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 onClick={() => handleUpdate(patient)} // Call update function
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {updatePatient && (
//         <div className="mt-4 p-4 bg-gray-100 rounded">
//           <h2 className="text-xl font-bold mb-4">Update Patient</h2>
//           <form onSubmit={handleFormSubmit}>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Name"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleInputChange}
//               placeholder="Age"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="text"
//               name="condition"
//               value={formData.condition}
//               onChange={handleInputChange}
//               placeholder="Condition"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="text"
//               name="conditionLevel"
//               value={formData.conditionLevel}
//               onChange={handleInputChange}
//               placeholder="Condition Level"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="text"
//               name="therapy"
//               value={formData.therapy.join(", ")} // Assuming therapy is an array of strings
//               onChange={(e) => setFormData({ ...formData, therapy: e.target.value.split(", ") })}
//               placeholder="Therapies (comma separated)"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="number"
//               name="therapyPlan"
//               value={formData.therapyPlan}
//               onChange={handleInputChange}
//               placeholder="Therapy Plan"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="text"
//               name="bookingType"
//               value={formData.bookingType}
//               onChange={handleInputChange}
//               placeholder="Booking Type"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="text"
//               name="paymentAmount"
//               value={formData.paymentAmount}
//               onChange={handleInputChange}
//               placeholder="Payment Amount"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="text"
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleInputChange}
//               placeholder="Payment Method"
//               className="border rounded mb-2 w-full p-2"
//               required
//             />
//             <input
//               type="number"
//               name="therapyCompletedDays"
//               value={formData.therapyCompletedDays}
//               onChange={handleInputChange}
//               placeholder="Therapy Completed Days"
//               className="border rounded mb-2 w-full p-2"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//             >
//               Update Patient
//             </button>
//             <button
//               type="button"
//               className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 ml-2"
//               onClick={() => setUpdatePatient(null)} // Close update form
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetAllPatients;































import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from './Modal'; // Import the modal component
import { ChevronDown, ChevronUp } from "lucide-react"; // For expand/collapse icons

const GetAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null); // Track expanded row
  const [error, setError] = useState("");
  const [updatePatient, setUpdatePatient] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // State for delete confirmation modal
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    condition: "",
    conditionLevel: "",
    therapy: [],
    therapyPlan: "",
    bookingType: "",
    paymentAmount: "",
    paymentMethod: "",
    therapyCompletedDays: 0,
  });

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/allpatients`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
          },
        });
        setPatients(response.data);
      } catch (error) {
        setError("Error fetching patients data.");
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to handle delete patient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Filter out the deleted patient from the state
      setPatients(patients.filter((patient) => patient._id !== id));
      setConfirmDeleteId(null); // Close the confirmation modal
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("Error deleting patient.");
    }
  };

  // Function to handle update patient
  const handleUpdate = (patient) => {
    // Set the patient data to be updated in the form
    setUpdatePatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      age: patient.age,
      condition: patient.condition,
      conditionLevel: patient.conditionLevel,
      therapy: patient.therapy,
      therapyPlan: patient.therapyPlan,
      bookingType: patient.bookingType,
      paymentAmount: patient.paymentAmount,
      paymentMethod: patient.paymentMethod,
      therapyCompletedDays: patient.therapyCompletedDays,
    });
  };

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const toggleExpand = (id) => {
    setExpandedPatientId((prevId) => (prevId === id ? null : id)); // Toggle expand/collapse
  };
  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/update-patient/${updatePatient._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update the patients list with the updated patient
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === response.data._id ? response.data : patient
        )
      );
      setUpdatePatient(null); // Reset the update state
      setFormData({
        name: "",
        email: "",
        age: "",
        condition: "",
        conditionLevel: "",
        therapy: [],
        therapyPlan: "",
        bookingType: "",
        paymentAmount: "",
        paymentMethod: "",
        therapyCompletedDays: 0,
      }); // Reset form data
    } catch (error) {
      console.error("Error updating patient:", error);
      setError("Error updating patient.");
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Title and Refresh Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patient List</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => window.location.reload()} // Reload to fetch all patients again
        >
          Refresh List
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <React.Fragment key={patient._id}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                  onClick={() => toggleExpand(patient._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {expandedPatientId === patient._id ? (
                        <ChevronUp size={20} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                      )}
                    </div>
                  </td>
                </motion.tr>

                {/* Expanded Row */}
                {expandedPatientId === patient._id && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gray-100"
                  >
                    <td colSpan={5} className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                        <div>
                          <p><strong>Therapy:</strong> {patient.therapy.join(", ")}</p>
                          <p><strong>Condition Level:</strong> {patient.conditionLevel}</p>
                          <p><strong>Therapy Plan:</strong> {patient.therapyPlan}</p>
                        </div>
                        <div>
                          <p><strong>Booking Type:</strong> {patient.bookingType}</p>
                          <p><strong>Payment Amount:</strong> {patient.paymentAmount}</p>
                          <p><strong>Payment Method:</strong> {patient.paymentMethod}</p>
                          <p><strong>Therapy Completed Days:</strong> {patient.therapyCompletedDays}</p>
                        </div>
                        <div className="flex justify-between mt-4 col-span-2">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => handleUpdate(patient)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            onClick={() => setConfirmDeleteId(patient._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for Deletion */}
      <Modal isOpen={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <h2 className="text-2xl font-bold mb-6">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this patient?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
            onClick={() => handleDelete(confirmDeleteId)}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={() => setConfirmDeleteId(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>

     {/* Modal for updating patient */}
<Modal isOpen={!!updatePatient} onClose={() => setUpdatePatient(null)}>
  <h2 className="text-2xl font-bold mb-6">Update Patient</h2>
  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label className="block mb-2 font-semibold" htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name" // Added id for accessibility
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="age">Age</label>
      <input
        type="number"
        name="age"
        id="age"
        value={formData.age}
        onChange={handleInputChange}
        placeholder="Age"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="condition">Condition</label>
      <input
        type="text"
        name="condition"
        id="condition"
        value={formData.condition}
        onChange={handleInputChange}
        placeholder="Condition"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
    </div>

    <div>
      <label className="block mb-2 font-semibold" htmlFor="conditionLevel">Condition Level</label>
      <input
        type="text"
        name="conditionLevel"
        id="conditionLevel"
        value={formData.conditionLevel}
        onChange={handleInputChange}
        placeholder="Condition Level"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="therapy">Therapies</label>
      <input
        type="text"
        name="therapy"
        id="therapy"
        value={formData.therapy.join(", ")} // Assuming therapy is an array of strings
        onChange={(e) =>
          setFormData({ ...formData, therapy: e.target.value.split(", ") })
        }
        placeholder="Therapies (comma separated)"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="therapyPlan">Therapy Plan</label>
      <input
        type="number"
        name="therapyPlan"
        id="therapyPlan"
        value={formData.therapyPlan}
        onChange={handleInputChange}
        placeholder="Therapy Plan"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="bookingType">Booking Type</label>
      <input
        type="text"
        name="bookingType"
        id="bookingType"
        value={formData.bookingType}
        onChange={handleInputChange}
        placeholder="Booking Type"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
    </div>

    <div>
      <label className="block mb-2 font-semibold" htmlFor="paymentAmount">Payment Amount</label>
      <input
        type="text"
        name="paymentAmount"
        id="paymentAmount"
        value={formData.paymentAmount}
        onChange={handleInputChange}
        placeholder="Payment Amount"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="paymentMethod">Payment Method</label>
      <input
        type="text"
        name="paymentMethod"
        id="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleInputChange}
        placeholder="Payment Method"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
      
      <label className="block mb-2 font-semibold" htmlFor="therapyCompletedDays">Therapy Completed Days</label>
      <input
        type="number"
        name="therapyCompletedDays"
        id="therapyCompletedDays"
        value={formData.therapyCompletedDays}
        onChange={handleInputChange}
        placeholder="Therapy Completed Days"
        className="border rounded-lg mb-4 w-full p-3"
        required
      />
    </div>

    <div className="col-span-2">
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
      >
        Update Patient
      </button>
    </div>
  </form>
</Modal>

    </motion.div>
  );
};

export default GetAllPatients;
