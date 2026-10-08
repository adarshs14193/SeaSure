// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function OceanEntry({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-linear-to-br from-[#B2EBF2] to-[#E0F7FA]"
    >
      {children}
    </motion.div>
  );
}
