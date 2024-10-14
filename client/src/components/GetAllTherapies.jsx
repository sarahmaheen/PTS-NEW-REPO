// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const GetAllTherapies = () => {
//     const [therapy, setTherapies] = useState([]);
//     // const history = useHistory();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchTherapies = async () => {
//             try {
//                 const response = await axios.get('{process.env.REACT_APP_API_URL}/api/therapies');
//                 console.log(response)
//                 setTherapies(response.data);
//                 console.log(therapy)
//             } catch (error) {
//                 console.error('Error fetching therapies:', error);
//             }
//         };

//         fetchTherapies();
//     }, []);

//     const handleCardClick = (therapyId) => {
//         navigate(`/therapies/${therapyId}`);
//     };

//     return (
//         // <div className="container mx-auto p-4">
//         //     <h1 className="text-2xl font-bold mb-6">Available Therapies</h1>
//         //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         //         {therapies.map((therapy) => (
//         //             <div
//         //                 key={therapy._id}
//         //                 className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105"
//         //                 onClick={() => handleCardClick(therapy._id)}
//         //             >
//         //                 <div className="p-4">
//         //                     <h2 className="text-lg font-semibold">Name: {therapy.therapyName}</h2>
//         //                     <p className="text-black-600">Duration Days: {therapy.assignedDays} </p>
//         //                     <h3 className="text-md font-medium mt-2">Therapists:</h3>
//         //                     {/* <ul className="list-disc pl-5">
//         //                         {therapy.therapistIds.map((therapist) => (
//         //                             <li key={therapist._id} className="text-gray-700">
//         //                                 {therapist.name} 
//         //                             </li>
//         //                         ))}
//         //                     </ul> */}
//         //                 </div>
//         //             </div>
//         //         ))}
//         //     </div>
//         // </div>


// //         <div className="p-4">
// //   <h2 className="text-lg font-semibold">Patient Name: {therapy.patientName}</h2>

 
// //   <h3 className="text-md font-medium mt-2">Therapies:</h3>
// //   <ul className="list-disc pl-5">
// //     {therapy.therapyNames.map((therapyName, index) => (
// //       <li key={index} className="text-gray-700">{therapyName}</li>
// //     ))}
// //   </ul>

  
// //   <h3 className="text-md font-medium mt-2">Therapists:</h3>
// //   <ul className="list-disc pl-5">
// //     {therapy.therapists.map((therapist) => (
// //       <li key={therapist._id} className="text-gray-700">
// //         {therapist.name} 
// //       </li>
// //     ))}
// //   </ul>

 
// //   <h3 className="text-md font-medium mt-2">Therapy Goals:</h3>
// //   <p className="text-gray-700">Behavioural Therapy (Short Term): {therapy.therapyGoals.behaviouralTherapy.shortTerm ? 'Yes' : 'No'}</p>
// //   <p className="text-gray-700">Behavioural Therapy (Long Term): {therapy.therapyGoals.behaviouralTherapy.longTerm ? 'Yes' : 'No'}</p>
// //   <p className="text-gray-700">Speech Therapy (Short Term): {therapy.therapyGoals.speechTherapy.shortTerm ? 'Yes' : 'No'}</p>
// //   <p className="text-gray-700">Speech Therapy (Long Term): {therapy.therapyGoals.speechTherapy.longTerm ? 'Yes' : 'No'}</p>
// //   <p className="text-gray-700">Occupational Therapy (Short Term): {therapy.therapyGoals.occupationalTherapy.shortTerm ? 'Yes' : 'No'}</p>
// //   <p className="text-gray-700">Occupational Therapy (Long Term): {therapy.therapyGoals.occupationalTherapy.longTerm ? 'Yes' : 'No'}</p>

// //   {/* Observations */}
// //   <h3 className="text-md font-medium mt-2">Observations:</h3>
// //   <p className="text-gray-700">Behavioural Therapy: {therapy.observations.behaviouralTherapy || 'N/A'}</p>
// //   <p className="text-gray-700">Speech Therapy: {therapy.observations.speechTherapy || 'N/A'}</p>
// //   <p className="text-gray-700">Occupational Therapy: {therapy.observations.occupationalTherapy || 'N/A'}</p>

  
// //   <h3 className="text-md font-medium mt-2">Daily Activities:</h3>
// //   <ul className="list-disc pl-5">
// //     {therapy.dailyActivities.map((activity, index) => (
// //       <li key={index} className="text-gray-700">{activity}</li>
// //     ))}
// //   </ul>

 
// //   <p className="text-black-600 mt-2">Time Duration: {therapy.timeDuration}</p>
// //   <p className="text-black-600">Assigned Days: {therapy.assignedDays}</p>
// // </div>


// <div>Available therapies </div>
//     );
// };

// export default GetAllTherapies;









import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react'; // For expand/collapse icons
import { useNavigate } from 'react-router-dom'; // Ensure you import navigate

const GetAllTherapies = () => {
    const [therapies, setTherapies] = useState([]);
    const [expandedTherapyId, setExpandedTherapyId] = useState(null); // Track expanded row
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchTherapies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/therapies`);
                setTherapies(response.data);
            } catch (error) {
                setError('Error fetching therapies data.');
                console.error('Error fetching therapies:', error);
            }
        };

        fetchTherapies();
    }, []);

    // Function to handle delete therapy
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-therapy/${id}`);
            // Filter out the deleted therapy from the state
            setTherapies(therapies.filter((therapy) => therapy._id !== id));
        } catch (error) {
            console.error('Error deleting therapy:', error);
            setError('Error deleting therapy.');
        }
    };

    const toggleExpand = (id) => {
        setExpandedTherapyId((prevId) => (prevId === id ? null : id)); // Toggle expand/collapse
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return (
        <motion.div
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Title and Search Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Therapies List</h1>
                <input
                    type="text"
                    placeholder="Search by therapy name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border rounded-lg mb-4 w-1/2 p-3"
                />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Therapy Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Days</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {therapies
                            .filter((therapy) => 
                                therapy.therapyNames.join(', ').toLowerCase().includes(searchTerm)
                            )
                            .map((therapy) => (
                                <React.Fragment key={therapy._id}>
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="cursor-pointer"
                                        onClick={() => toggleExpand(therapy._id)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{therapy.therapyNames.join(', ')}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{therapy.assignedDays}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {expandedTherapyId === therapy._id ? (
                                                    <ChevronUp size={20} className="text-gray-500" />
                                                ) : (
                                                    <ChevronDown size={20} className="text-gray-500" />
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>

                                    {/* Expanded Row */}
                                    {expandedTherapyId === therapy._id && (
                                        <motion.tr
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-gray-100"
                                        >
                                            <td colSpan={3} className="p-6">
                                                <div className="grid grid-cols-1 gap-4 text-gray-600">
                                                    {/* Show all therapy details here */}
                                                    <p><strong>Duration Days:</strong> {therapy.assignedDays}</p>
                                                    <p><strong>Time Duration:</strong> {therapy.timeDuration}</p>

                                                    <h3 className="text-md font-medium mt-2">Daily Activities:</h3>
                                                    <ul className="list-disc pl-5">
                                                        {therapy.dailyActivities.map((activity, index) => (
                                                            <li key={index} className="text-gray-700">{activity}</li>
                                                        ))}
                                                    </ul>

                                                    <h3 className="text-md font-medium mt-2">Observations:</h3>
                                                    {therapy.observations.behaviouralTherapy && (
                                                        <p>Behavioural Therapy: {therapy.observations.behaviouralTherapy}</p>
                                                    )}
                                                    {therapy.observations.speechTherapy && (
                                                        <p>Speech Therapy: {therapy.observations.speechTherapy}</p>
                                                    )}
                                                    {therapy.observations.occupationalTherapy && (
                                                        <p>Occupational Therapy: {therapy.observations.occupationalTherapy}</p>
                                                    )}

                                                    <h3 className="text-md font-medium mt-2">Therapy Goals:</h3>
                                                    {therapy.therapyGoals.behaviouralTherapy && (
                                                        <div>
                                                            <p>Behavioural Therapy Goals:</p>
                                                            {therapy.therapyGoals.behaviouralTherapy.longTerm && (
                                                                <p>Long Term: {therapy.therapyGoals.behaviouralTherapy.longTerm}</p>
                                                            )}
                                                            {therapy.therapyGoals.behaviouralTherapy.shortTerm && (
                                                                <p>Short Term: {therapy.therapyGoals.behaviouralTherapy.shortTerm}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                    {therapy.therapyGoals.speechTherapy && (
                                                        <div>
                                                            <p>Speech Therapy Goals:</p>
                                                            {therapy.therapyGoals.speechTherapy.longTerm && (
                                                                <p>Long Term: {therapy.therapyGoals.speechTherapy.longTerm}</p>
                                                            )}
                                                            {therapy.therapyGoals.speechTherapy.shortTerm && (
                                                                <p>Short Term: {therapy.therapyGoals.speechTherapy.shortTerm}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                    {therapy.therapyGoals.occupationalTherapy && (
                                                        <div>
                                                            <p>Occupational Therapy Goals:</p>
                                                            {therapy.therapyGoals.occupationalTherapy.longTerm && (
                                                                <p>Long Term: {therapy.therapyGoals.occupationalTherapy.longTerm}</p>
                                                            )}
                                                            {therapy.therapyGoals.occupationalTherapy.shortTerm && (
                                                                <p>Short Term: {therapy.therapyGoals.occupationalTherapy.shortTerm}</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Update and Delete Buttons */}
                                                    <div className="flex justify-between mt-4">
                                                        <button
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                                            onClick={() => navigate(`/update-therapy/${therapy._id}`)}
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                            onClick={() => handleDelete(therapy._id)}
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
        </motion.div>
    );
};

export default GetAllTherapies;
