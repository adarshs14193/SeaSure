import FreshnessBadge from "../badges/FreshnessBadge";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FishCard({ fish, onOrder }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow p-4 flex gap-4"
    >
      <img
        src={fish.image}
        alt={fish.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">{fish.name}</h3>
        <p className="text-sm text-slate-500">
          {fish.vendor} • {fish.distance} km away
        </p>

        <div className="mt-2 flex items-center gap-2">
          <FreshnessBadge status={fish.freshness} />
          <span className="text-sm font-medium">₹{fish.price}</span>
        </div>
      </div>

      <button
        onClick={onOrder}
        className="bg-[#00B4D8] text-white px-4 py-2 rounded-lg self-center hover:bg-[#0096c7]"
      >
        Order
      </button>
    </motion.div>
  );
}
