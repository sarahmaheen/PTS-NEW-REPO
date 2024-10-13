import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Heart, Plus } from "lucide-react"; // Icons for cards
import StatCard from "./StatCard"; // Import StatCard component

const TotalData = () => {
  const [stats, setStats] = useState({
    patientsCount: 0,
    therapistsCount: 0,
    therapiesCount: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch counts for dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        const patientsResponse = await axios.get("http://localhost:3001/api/patient/patient-count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const therapistsResponse = await axios.get("http://localhost:3001/api/therapist/therapist-count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const therapiesResponse = await axios.get("http://localhost:3001/api/therapy/therapy-count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats({
          patientsCount: patientsResponse.data.count,
          therapistsCount: therapistsResponse.data.count,
          therapiesCount: therapiesResponse.data.count,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Error fetching dashboard data.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <div className="text-red-500">{error}</div>}

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Patients Stat */}
            <StatCard
              name="Total Patients"
              icon={Users}
              value={stats.patientsCount}
              color="#EC4899" // Pink color
            />

            {/* Therapists Stat */}
            <StatCard
              name="Total Therapists"
              icon={Plus}
              value={stats.therapistsCount}
              color="#8B5CF6" // Purple color
            />

            {/* Therapies Stat */}
            <StatCard
              name="Total Therapies"
              icon={Heart}
              value={stats.therapiesCount}
              color="#10B981" // Green color
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TotalData;
