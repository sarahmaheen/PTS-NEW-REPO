import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllTherapists = () => {
    const [therapists, setTherapists] = useState([]);

    useEffect(() => {
        const fetchTherapists = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:3001/api/therapists", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTherapists(response.data);
            } catch (error) {
                console.error("Failed to fetch therapists:", error);
            }
        };

        fetchTherapists();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">All Therapists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map((therapist) => (
                    <div key={therapist._id} className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105">
                        <h3 className="text-xl font-semibold text-blue-600">{therapist.name}</h3>
                        <p className="text-gray-600">Email: {therapist.email}</p>
                        <p className="text-gray-600">Phone: {therapist.phone}</p>
                        <p className="text-gray-600">Specialization: {therapist.specialization}</p>
                        <p className="text-gray-600">Experience: {therapist.experience} years</p>
                        <p className="text-gray-600">License No: {therapist.licenseNumber}</p>

                        {/* Patients Section */}
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-blue-500">Patients:</h4>
                            {therapist.patients.length > 0 ? (
                                therapist.patients.map((patient) => (
                                    <div key={patient._id} className="mt-2 bg-gray-100 p-2 rounded">
                                        <p className="font-medium">{patient.name}</p>
                                        <p className="text-gray-600">Therapy: {patient.therapyName}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No patients assigned.</p>
                            )}
                        </div>

                        <div className="flex justify-between mt-4">
                            <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Update</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetAllTherapists;
