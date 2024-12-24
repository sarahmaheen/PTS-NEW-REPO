import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#34D399", "#3B82F6", "#EF4444"]; // More colors for varied therapy types

const CategoryDistributionChart = () => {
  const [therapyData, setTherapyData] = useState([]);

  // Fetch patient data to compute therapy distribution
  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/allpatients`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
          },
        });
        
        // Extract and count therapy types
        // console.log(therapyData, "mkkkkkkkkkkkkkkkkkk")
        const therapyCounts = {};
        response.data.forEach((patient) => {
          patient.therapy.forEach((therapy) => {
            therapyCounts[therapy] = (therapyCounts[therapy] || 0) + 1;
          });
        });

        // Prepare data for the chart
        const chartData = Object.keys(therapyCounts).map((therapy) => ({
          name: therapy,
          value: therapyCounts[therapy],
        }));
        setTherapyData(chartData);
      } catch (error) {
        console.error("Error fetching therapies:", error);
      }
    };

    fetchTherapies();
  }, []);

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">Therapy Distribution</h2>
      <div className="h-80">
        {therapyData.length ? (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
              <Pie
                data={therapyData}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {therapyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
