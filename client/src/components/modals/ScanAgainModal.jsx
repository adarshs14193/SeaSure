// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ScanAgainModal({ onClose, onScan }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">
          🔍 Scan Fish Freshness
        </h2>

        <p className="text-sm text-slate-600 mb-4">
          Upload or capture a photo to recheck freshness using AI.
        </p>

        <input type="file" className="mb-4 w-full" />

        <button
          onClick={onScan}
          className="w-full bg-[#0077B6] text-white py-2 rounded mb-3"
        >
          Analyze Freshness 🧪
        </button>

        <button
          onClick={onClose}
          className="w-full text-slate-500 text-sm underline"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}
