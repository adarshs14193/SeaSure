// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function OrderRequestModal({ order, onAccept, onDecline }) {
  if (!order) return null;

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-xl rounded-t-xl"
    >
      <h2 className="text-lg font-semibold mb-2">
        🛒 New Order Request
      </h2>
      <p className="text-sm text-slate-600">
        {order.fishName} • {order.distance} km away
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={onAccept}
          className="flex-1 bg-emerald-500 text-white py-2 rounded"
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className="flex-1 bg-red-500 text-white py-2 rounded"
        >
          Decline
        </button>
      </div>
    </motion.div>
  );
}
