


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
    // console.log("therapyPlan",therapyPlan,"therapyCompletedDays",therapyCompletedDays)
    // console.log(therapyDaysLeft)
    // console.log('lllllllllllllllllllllllllllllllllllllssssssssssss',assignedDays  )
    // console.log("ppppppppppppppppppppppppppppppppppppppppppp",assignedDays)
    const daysToAssign =Number(assignedDays);
    // const daysToAssign = Math.min(therapyDaysLeft, Number(assignedDays));
    // console.log(typeof daysToAssign);
    const intAssignedDays = Number(assignedDays);
    
    // Validation for assigned days
    if (intAssignedDays > therapyDaysLeft) {
      alert(`You cannot assign more than the remaining days (${therapyDaysLeft}).`);
      return;
    }
  
    // const updatedTherapyCompletedDays = daysToAssign;

    const updatedTherapyCompletedDays = therapyCompletedDays + intAssignedDays;
    // console.log("updatedTherapyCompletedDays",updatedTherapyCompletedDays)
    // console.log("intAssignedDays",intAssignedDays)
  
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
      // console.log(typeof therapyId)
// console.log("patient detaislsssssssssssssssssssssss", patientDetails)
      const updatedTherapyIdArray = [...patientDetails.therapyId, therapyId];
      // console.log(updatedTherapyIdArray)
  
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
