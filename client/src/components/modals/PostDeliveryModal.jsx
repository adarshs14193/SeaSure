// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PostDeliveryModal({ onClose, onScan }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          🎉 Fish Delivered!
        </h2>

        <button
          onClick={onScan}
          className="w-full bg-[#0077B6] text-white py-2 rounded mb-3"
        >
          Scan Fish Again 🧪
        </button>

        <button className="w-full bg-emerald-500 text-white py-2 rounded mb-3">
          View Local Recipes 🍛
        </button>

        <button className="w-full bg-yellow-400 text-slate-800 py-2 rounded">
          Health Benefits 💪
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-slate-500 underline"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
