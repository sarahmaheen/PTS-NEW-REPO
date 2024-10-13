// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const [isPatientDropdownOpen, setPatientDropdownOpen] = useState(false);
//   const [isTherapyDropdownOpen, setTherapyDropdownOpen] = useState(false);

//   const togglePatientDropdown = () => {
//     setPatientDropdownOpen(!isPatientDropdownOpen);
//   };

//   const toggleTherapyDropdown = () => {
//     setTherapyDropdownOpen(!isTherapyDropdownOpen);
//   };

//   return (
//     <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
//       {/* Logo */}
//       <div className="text-xl font-bold text-green-600 flex items-center">
//         <span className="mr-2 text-yellow-500">█ █ █</span> {/* Logo Color */}
//         Looza
//       </div>

//       {/* Navigation Links */}
//       <ul className="flex space-x-6 items-center">
//         {/* Patient Dropdown */}
//         <li
//           className="relative group"
//           onMouseEnter={togglePatientDropdown}
//           onMouseLeave={togglePatientDropdown}
//         >
//           <button className="text-purple-500 hover:text-purple-600 font-semibold">
//             Patient
//           </button>
//           {/* Dropdown */}
//           {isPatientDropdownOpen && (
//             <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 group-hover:block">
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/add-patient" className="text-gray-700">
//                   Add Patient
//                 </Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/get-all-patients" className="text-gray-700">
//                   Get All Patients
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Therapy Dropdown */}
//         <li
//           className="relative group"
//           onMouseEnter={toggleTherapyDropdown}
//           onMouseLeave={toggleTherapyDropdown}
//         >
//           <button className="text-purple-500 hover:text-purple-600 font-semibold">
//             Therapy
//           </button>
//           {/* Dropdown */}
//           {isTherapyDropdownOpen && (
//             <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 group-hover:block">
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/add-therapy" className="text-gray-700">
//                   Add Therapy
//                 </Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/get-all-therapies" className="text-gray-700">
//                   Get All Therapies
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Therapist Dropdown */}
//         <li className="relative group">
//           <button className="text-purple-500 hover:text-purple-600 font-semibold">
//             Therapist
//           </button>
//           {/* Dropdown */}
//           <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 group-hover:block">
//             <li className="px-4 py-2 hover:bg-purple-100">
//               <Link to="/add-therapist" className="text-gray-700">
//                 Add Therapist
//               </Link>
//             </li>
//             <li className="px-4 py-2 hover:bg-purple-100">
//               <Link to="/get-all-therapists" className="text-gray-700">
//                 Get All Therapists
//               </Link>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;










































// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const [isPatientDropdownOpen, setPatientDropdownOpen] = useState(false);
//   const [isTherapyDropdownOpen, setTherapyDropdownOpen] = useState(false);
//   const [isTherapistDropdownOpen, setTherapistDropdownOpen] = useState(false);

//   const togglePatientDropdown = () => {
//     setPatientDropdownOpen(!isPatientDropdownOpen);
//   };

//   const toggleTherapyDropdown = () => {
//     setTherapyDropdownOpen(!isTherapyDropdownOpen);
//   };

//   const toggleTherapistDropdown = () => {
//     setTherapistDropdownOpen(!isTherapistDropdownOpen);
//   };

//   return (
//     <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
//       {/* Logo */}
//       <div className="text-xl font-bold text-green-600 flex items-center">
//         <span className="mr-2 text-yellow-500">█ █ █</span> {/* Logo Color */}
//         Looza
//       </div>

//       {/* Navigation Links */}
//       <ul className="flex space-x-6 items-center">
//         {/* Patient Dropdown */}
//         <li className="relative">
//           <button
//             onClick={togglePatientDropdown}
//             className="text-purple-500 hover:text-purple-600 font-semibold"
//           >
//             Patient
//           </button>
//           {/* Dropdown */}
//           {isPatientDropdownOpen && (
//             <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48">
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/add-patient" className="text-gray-700">
//                   Add Patient
//                 </Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/get-all-patients" className="text-gray-700">
//                   Get All Patients
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Therapy Dropdown */}
//         <li className="relative">
//           <button
//             onClick={toggleTherapyDropdown}
//             className="text-purple-500 hover:text-purple-600 font-semibold"
//           >
//             Therapy
//           </button>
//           {/* Dropdown */}
//           {isTherapyDropdownOpen && (
//             <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48">
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/add-therapy" className="text-gray-700">
//                   Add Therapy
//                 </Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/get-all-therapies" className="text-gray-700">
//                   Get All Therapies
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Therapist Dropdown */}
//         <li className="relative">
//           <button
//             onClick={toggleTherapistDropdown}
//             className="text-purple-500 hover:text-purple-600 font-semibold"
//           >
//             Therapist
//           </button>
//           {/* Dropdown */}
//           {isTherapistDropdownOpen && (
//             <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48">
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/add-therapist" className="text-gray-700">
//                   Add Therapist
//                 </Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-purple-100">
//                 <Link to="/get-all-therapists" className="text-gray-700">
//                   Get All Therapists
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import { Menu, House, Plus, Heart, Users, FileText, ClipboardList, User } from "lucide-react"; // Import necessary icons
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

// Updated NAVBAR_ITEMS with Home and new icons for each item
const NAVBAR_ITEMS = [
  {
    name: "Home",
    icon: House, // Home icon
    color: "#4CAF50",
    href: "/admin-dashboard", // Home link
  },
  {
    name: "Add Patient",
    icon: User, // New icon for Add Patient
    color: "#EC4899",
    href: "/add-patient",
  },
  {
    name: "Get All Patients",
    icon: ClipboardList, // New icon for Get All Patients
    color: "#EC4899",
    href: "/get-all-patients",
  },
  {
    name: "Add Therapy",
    icon: Heart, // Therapy icon
    color: "#10B981",
    href: "/add-therapy",
  },
  {
    name: "Get All Therapies",
    icon: FileText, // New icon for Get All Therapies
    color: "#10B981",
    href: "/get-all-therapies",
  },
  {
    name: "Add Therapist",
    icon: Plus, // Therapist icon
    color: "#8B5CF6",
    href: "/add-therapist",
  },
  {
    name: "Get All Therapists",
    icon: ClipboardList, // New icon for Get All Therapists
    color: "#8B5CF6",
    href: "/get-all-therapists",
  },
];

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to control navbar visibility

  const toggleNavbar = () => {
    // Toggle the navbar open state
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-150 ease-in-out flex-shrink-0 ${
        isNavbarOpen ? "w-64" : "w-20"
      } shadow-lg`}
      animate={{ width: isNavbarOpen ? 220 : 80 }}
    >
      <div className='h-full bg-white p-4 flex flex-col border-r border-zinc-400'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleNavbar}
          className='p-2 rounded-full hover:bg-green-500 transition-colors max-w-fit'
        >
          <Menu size={24} />
        </motion.button>

        <nav className='mt-2 flex-grow'>
          {NAVBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-white hover:shadow-lg transition-colors mb-2 cursor-pointer'
              >
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isNavbarOpen && (
                    <motion.span
                      className='ml-4 whitespace-nowrap'
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
