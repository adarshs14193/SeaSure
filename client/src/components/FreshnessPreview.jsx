// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const items = [
  {
    label: "Fresh",
    score: "92%",
    color: "green",
    description: "Safe & recommended",
    bg: "bg-green-100",
    text: "text-green-800",
  },
  {
    label: "Moderate",
    score: "65%",
    color: "yellow",
    description: "Consume soon",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  {
    label: "Spoiled",
    score: "—",
    color: "red",
    description: "Not recommended",
    bg: "bg-red-100",
    text: "text-red-800",
  },
];

export default function FreshnessPreview() {
  return (
    <section className="w-full py-28 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A5A6A]">
          AI Freshness Score
        </h2>

        <p className="mt-6 text-xl sm:text-2xl text-slate-600">
          Instantly understand fish quality with clear, AI-driven scores.
        </p>

        {/* Equal-width cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: false }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`
                ${item.bg} ${item.text}
                rounded-2xl
                p-8
                shadow-lg
                flex flex-col items-center justify-center
                backdrop-blur-md
              `}
            >
              <span className="text-2xl uppercase tracking-wider font-semibold">
                {item.label}
              </span>

              <span className="mt-3 text-4xl sm:text-5xl font-extrabold">
                {item.score}
              </span>

              <span className="mt-2 text-base sm:text-lg opacity-80">
                {item.description}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          *AI-based estimation using visual freshness indicators
        </p>
      </motion.div>
    </section>
  );
}
