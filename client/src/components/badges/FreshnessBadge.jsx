// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const COLORS = {
  fresh: "bg-emerald-500",
  moderate: "bg-yellow-400",
  spoiled: "bg-red-500",
};

export default function FreshnessBadge({ status }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${COLORS[status]}`}
    >
      {status.toUpperCase()}
    </motion.div>
  );
}
