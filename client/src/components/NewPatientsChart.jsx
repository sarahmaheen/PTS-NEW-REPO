import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Fake data for new patients
const fakePatientsData = [
  { name: "Jan 2024", newPatients: 10 },
  { name: "Feb 2024", newPatients: 15 },
  { name: "Mar 2024", newPatients: 12 },
  { name: "Apr 2024", newPatients: 20 },
  { name: "May 2024", newPatients: 18 },
  { name: "Jun 2024", newPatients: 25 },
  { name: "Jul 2024", newPatients: 30 },
  { name: "Aug 2024", newPatients: 28 },
  { name: "Sep 2024", newPatients: 35 },
  { name: "Oct 2024", newPatients: 40 },
];

const NewPatientsChart = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>New Patients Overview</h2>

      <div className='h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={fakePatientsData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey={"name"} stroke='#9ca3af' />
            <YAxis stroke='#9ca3af' />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type='monotone'
              dataKey='newPatients'
              stroke='#10B981' // Change color if needed
              strokeWidth={3}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Show message if no data is available */}
      {fakePatientsData.length === 0 && (
        <p className="text-gray-400 text-center mt-4">No new patients data available.</p>
      )}
    </motion.div>
  );
};

export default NewPatientsChart;
