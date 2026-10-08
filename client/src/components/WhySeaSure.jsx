// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ---------- Animated Counter ---------- */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1200;
    const stepTime = 16;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-extrabold text-[#0A5A6A]">
      {count}
      {suffix}
    </span>
  );
}

/* ---------- SVG Icons ---------- */
const AIIcon = () => (
  <svg className="w-10 h-10 text-[#5FB3A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.5" d="M12 3v3m6.364-.364-2.121 2.121M21 12h-3M6.757 6.757 4.636 4.636M3 12h3m.364 6.364 2.121-2.121M12 18v3m6.364.364-2.121-2.121" />
  </svg>
);

const TrustIcon = () => (
  <svg className="w-10 h-10 text-[#5FB3A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.5" d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
  </svg>
);

const WasteIcon = () => (
  <svg className="w-10 h-10 text-[#5FB3A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.5" d="M3 6h18M8 6V4h8v2m-9 0v14a2 2 0 002 2h6a2 2 0 002-2V6" />
  </svg>
);

export default function WhySeaSure() {
  return (
    <section className="w-full py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ---------- Header ---------- */}
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="text-center max-w-4xl mx-auto"
        >
        <div className="text-center max-w-4xl mx-auto">
  <h2 className="relative inline-block text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A5A6A]">
    Why SeaSure?

    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false }}
      className="
        absolute left-0 -bottom-3
        w-full h-1
        origin-left
        rounded-full
        bg-[#5FB3A2]
      "
    />
  </h2>

  <p className="mt-8 text-xl sm:text-2xl text-slate-600">
    Because food safety, trust, and sustainability shouldn’t be optional.
  </p>
</div>


        </motion.div>


        {/* ---------- Stats ---------- */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <Counter value={30} suffix="%" />
            <p className="mt-3 text-lg text-slate-600">
              Fish wasted due to spoilage & poor freshness checks
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <Counter value={3} suffix="×" />
            <p className="mt-3 text-lg text-slate-600">
              Faster spoilage compared to other meats
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <Counter value={100} suffix="M+" />
            <p className="mt-3 text-lg text-slate-600">
              Buyers relying on visual guesswork daily
            </p>
          </div>
        </div>

        {/* ---------- Comparison ---------- */}
        <div className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="rounded-3xl p-10 border border-slate-200"
          >
            <h3 className="text-2xl font-semibold text-slate-700">
              Traditional Buying
            </h3>
            <ul className="mt-6 space-y-4 text-lg text-slate-600">
              <li>• Depends on smell & appearance</li>
              <li>• No freshness verification</li>
              <li>• High risk of spoiled fish</li>
              <li>• Zero data or traceability</li>
            </ul>
          </motion.div>

          {/* SeaSure */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="rounded-3xl p-10 bg-white/70 backdrop-blur-xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-[#0A5A6A]">
              With SeaSure
            </h3>
            <ul className="mt-6 space-y-4 text-lg text-slate-600">
              <li>• AI-verified freshness score</li>
              <li>• Clear Fresh / Moderate / Spoiled labels</li>
              <li>• Reduced health & safety risks</li>
              <li>• Transparency before purchase</li>
            </ul>
          </motion.div>
        </div>

        {/* ---------- Why It Matters ---------- */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "AI over Guesswork",
              text: "Computer vision analyzes eye clarity, gills, texture & moisture.",
              Icon: AIIcon,
            },
            {
              title: "Trust by Design",
              text: "Buyers know freshness before paying not after.",
              Icon: TrustIcon,
            },
            {
              title: "Waste Reduction",
              text: "Better decisions mean less spoilage and healthier supply chains.",
              Icon: WasteIcon,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: false }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-lg"
            >
              <item.Icon />
              <h4 className="mt-6 text-2xl font-semibold text-[#0A5A6A]">
                {item.title}
              </h4>
              <p className="mt-4 text-lg text-slate-600">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
