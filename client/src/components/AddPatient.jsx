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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/therapists`);
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-patient`, payload);
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
