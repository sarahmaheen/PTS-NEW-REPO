import { Menu, House, Heart } from "lucide-react"; // Import necessary icons
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Define NAVBAR_ITEMS based on the routes in App.js
const NAVBAR_ITEMS = [
  { name: "Dashboard", icon: House, color: "#4CAF50", href: "/dashboard" },
  { name: "Therapy Dashboard", icon: Heart, color: "#10B981", href: "/therapydashboard" },
];

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to toggle the navbar

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev); // Toggle navbar open state
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-150 ease-in-out bg-white shadow-lg border-r ${
        isNavbarOpen ? "w-64" : "w-16"
      }`}
      animate={{ width: isNavbarOpen ? 220 : 80 }} // Animate width of the navbar
    >
      <div className="h-full p-4 flex flex-col">
        <button
          onClick={toggleNavbar}
          className="p-2 rounded-full hover:bg-green-500 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </button>

        <nav className="mt-4 flex-grow">
          {NAVBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href} className="block">
              <motion.div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors mb-2 cursor-pointer">
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                {isNavbarOpen && (
                  <motion.span
                    className="ml-4 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
