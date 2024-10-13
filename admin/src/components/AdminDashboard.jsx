import React, { useEffect, useState } from "react";
import TotalData from "./TotalData"; // Import TotalData component
import CategoryDistributionChart from "./CategoryDistributionChart"; // Import CategoryDistributionChart component
import NewPatientsChart from "./NewPatientsChart"; // Import the new patients chart
import axios from "axios";

const AdminDashboard = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [therapistCount, setTherapistCount] = useState(0);
  const [therapyDistribution, setTherapyDistribution] = useState([]);
  const [newPatientsData, setNewPatientsData] = useState([]);

  // Fetch patient, therapist counts, therapy distribution, and new patients data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the count of patients
        const patientResponse = await axios.get("http://localhost:3001/api/patients-count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("ppppppppp",patientResponse.data.count)
        setPatientCount(patientResponse.data.count);

        // Fetch the count of therapists
        const therapistResponse = await axios.get("http://localhost:3001/api/therapists-count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTherapistCount(therapistResponse.data.count);

        // Fetch therapy distribution data (from patient data)
        const therapyResponse = await axios.get("http://localhost:3001/api/therapy-distribution", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("jeeeeeeeeeeeee",therapistResponse);
        setTherapyDistribution(therapyResponse.data.count);

        // Fetch new patients data for the NewPatientsChart
        // const newPatientsResponse = await axios.get("http://localhost:3001/api/new-patients", {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        // setNewPatientsData(newPatientsResponse);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* TotalData Component - Showing total patient and therapist counts */}
      <TotalData patientCount={patientCount} therapistCount={therapistCount} />

      {/* Two Charts Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* CategoryDistributionChart - Therapy Distribution */}
        <CategoryDistributionChart therapyDistribution={therapyDistribution} />

        {/* NewPatientsChart - Number of New Patients Over Time */}
        <NewPatientsChart newPatientsData={newPatientsData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
