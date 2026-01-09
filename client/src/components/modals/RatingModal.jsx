import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function RatingModal({ onSubmit }) {
  const [rating, setRating] = useState(0);

  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-xl shadow-lg"
    >
      <h3 className="font-semibold mb-3">
        ⭐ Rate Your Delivery
      </h3>

      <div className="flex gap-2 mb-4">
        {[1,2,3,4,5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-2xl ${rating >= n ? "text-yellow-400" : "text-slate-300"}`}
          >
            ★
          </button>
        ))}
      </div>

      <button
        onClick={() => onSubmit(rating)}
        className="w-full bg-[#00B4D8] text-white py-2 rounded"
      >
        Submit Rating
      </button>
    </motion.div>
  );
}
