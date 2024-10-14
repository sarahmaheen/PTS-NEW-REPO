import React, { useState } from "react";
import axios from "axios";

const AddTherapist = () => {
    const [therapistData, setTherapistData] = useState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        licenseNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTherapistData({ ...therapistData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-therapist`, therapistData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(response.data.message);
            setTherapistData({
                name: "",
                email: "",
                phone: "",
                specialization: "",
                experience: "",
                licenseNumber: "",
            });
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add therapist");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Add Therapist</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={therapistData.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={therapistData.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={therapistData.phone}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        value={therapistData.specialization}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="experience"
                        placeholder="Years of Experience"
                        value={therapistData.experience}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <input
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={therapistData.licenseNumber}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Therapist
                </button>
            </form>
        </div>
    );
};

export default AddTherapist;
