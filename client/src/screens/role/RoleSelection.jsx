// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OceanEntry from "@/components/animations/OceanEntry";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <OceanEntry>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-slate-800 mb-2 text-center"
        >
          How would you like to use SeaSure today?
        </motion.h1>

        <p className="text-slate-600 mb-10 text-center">
          Choose your role — you can switch anytime 🌊
        </p>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* Vendor Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/vendor")}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-8 border border-[#B2EBF2]"
          >
            <div className="text-5xl mb-4">🧑‍🌾</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              I am a Vendor
            </h2>
            <p className="text-slate-600 text-sm">
              Upload fish details, get AI-powered freshness scores,
              manage orders, and reach nearby customers.
            </p>
          </motion.div>

          {/* Consumer Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/consumer")}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-8 border border-[#B2EBF2]"
          >
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              I am a Consumer
            </h2>
            <p className="text-slate-600 text-sm">
              Discover fresh fish from nearby vendors,
              track delivery live, and explore recipes & health benefits.
            </p>
          </motion.div>

        </div>
      </div>
    </OceanEntry>
  );
}
