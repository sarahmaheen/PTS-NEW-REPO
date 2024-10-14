import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const UpdateTherapy = () => {
  const { therapyId } = useParams(); // Get the id from the URL parameters
  const [patientName, setPatientName] = useState('');
  const [therapyData, setTherapyData] = useState(null);
  const [therapyNames, setTherapyNames] = useState([]); // To store therapy names
  const [patients, setPatients] = useState([]); // To store all patients
  const [therapists, setTherapists] = useState([]); // To store all therapists
  const [selectedPatient, setSelectedPatient] = useState(''); // Selected patient ID
  const [selectedTherapist, setSelectedTherapist] = useState(''); // Selected therapist ID
  const [observations, setObservations] = useState({});
  const [dailyActivities, setDailyActivities] = useState(['']);
  const [timeDuration, setTimeDuration] = useState('');
  const [assignedDays, setAssignedDays] = useState('');
  const [therapyPlan, setTherapyPlan] = useState('');
  const [therapyCompletedDays, setTherapyCompletedDays] = useState('');

  // Fetch therapy data, patients, and therapists based on id
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(therapyId)
        // Fetch therapy data
        const therapyResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/therapies/${therapyId}`);
        setPatientName(therapistsResponse.data.patientName || '')
        setTherapyData(therapyResponse.data);
        setTherapyNames(therapyResponse.data.therapyNames || []);
        setObservations(therapyResponse.data.observations || {});
        setDailyActivities(therapyResponse.data.dailyActivities || ['']);
        setTimeDuration(therapyResponse.data.timeDuration || '');
        setAssignedDays(therapyResponse.data.assignedDays || '');
        setTherapyPlan(therapyResponse.data.therapyPlan || '');
        setTherapyCompletedDays(therapyResponse.data.therapyCompletedDays || '');

        // Set selected patient and therapist based on therapy data
        setSelectedPatient(therapyResponse.data.patientId || ''); // Adjust according to your API response
        setSelectedTherapist(therapyResponse.data.therapistId || ''); // Adjust according to your API response

        // Fetch all patients
        const patientsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/allpatients`);
        setPatients(patientsResponse.data);

        // Fetch all therapists
        const therapistsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/therapists`);
        setTherapists(therapistsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [therapyId]); // Dependency array includes id

  const handleActivityChange = (index, value) => {
    const newActivities = [...dailyActivities];
    newActivities[index] = value;
    setDailyActivities(newActivities);
  };

  const handleAddActivity = () => {
    setDailyActivities([...dailyActivities, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      therapyNames,
      observations,
      dailyActivities,
      timeDuration,
      assignedDays,
      therapyPlan,
      therapyCompletedDays,
      patientId: selectedPatient, // Include selected patient ID
      therapistId: selectedTherapist, // Include selected therapist ID
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/update-therapy/${therapyId}`, updatedData);
      alert('Therapy record updated successfully!');
    } catch (error) {
      console.error("Error updating therapy record:", error);
    }
  };

  if (!therapyData) return <div>Loading...</div>; // Loading state

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Update Therapy Record</h2>

      {/* Patient Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Patient</label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name} {/* Adjust based on your patient object structure */}
            </option>
          ))}
        </select>
      </div>

      {/* Therapist Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Therapist</label>
        <select
          value={selectedTherapist}
          onChange={(e) => setSelectedTherapist(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Select a therapist</option>
          {therapists.map((therapist) => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.name} {/* Adjust based on your therapist object structure */}
            </option>
          ))}
        </select>
      </div>

      {therapyNames.map((therapyName, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{therapyName.charAt(0).toUpperCase() + therapyName.slice(1)} Observations</label>
          <input
            type="text"
            value={observations[therapyName] || ''}
            onChange={(e) => setObservations({ ...observations, [therapyName]: e.target.value })}
            className="mt-1 block w-full border rounded p-2"
            placeholder={`Enter observations for ${therapyName.charAt(0).toUpperCase() + therapyName.slice(1)}`}
          />
        </div>
      ))}

      {/* Daily Activities Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Daily Activities</label>
        {dailyActivities.map((activity, index) => (
          <input
            key={index}
            type="text"
            value={activity}
            onChange={(e) => handleActivityChange(index, e.target.value)}
            className="mt-1 block w-full border rounded p-2 mb-2"
            placeholder={`Activity ${index + 1}`}
          />
        ))}
        <button type="button" onClick={handleAddActivity} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Add Activity</button>
      </div>

      <div className="mb-4">
        <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Time Duration</label>
        <input
          type="text"
          id="timeDuration"
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="e.g., 30 mins"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="assignedDays" className="block text-sm font-medium text-gray-700">Assigned Days</label>
        <input
          type="text"
          id="assignedDays"
          value={assignedDays}
          onChange={(e) => setAssignedDays(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="e.g., Mon, Wed, Fri"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="therapyPlan" className="block text-sm font-medium text-gray-700">Therapy Plan</label>
        <input
          type="number"
          id="therapyPlan"
          value={therapyPlan}
          onChange={(e) => setTherapyPlan(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Enter therapy plan number"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="therapyCompletedDays" className="block text-sm font-medium text-gray-700">Therapy Completed Days</label>
        <input
          type="number"
          id="therapyCompletedDays"
          value={therapyCompletedDays}
          onChange={(e) => setTherapyCompletedDays(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Enter completed days"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Update Therapy</button>
    </form>
  );
};

export default UpdateTherapy;
