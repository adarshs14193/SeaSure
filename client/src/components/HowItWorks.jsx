// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Capture Fish Image",
    description:
      "Take a clear photo of the fish directly from the market or seller using your phone.",
    icon: "📸",
  },
  {
    step: "02",
    title: "AI Freshness Analysis",
    description:
      "Our AI analyzes visual cues like eye clarity, gill color, texture and surface moisture.",
    icon: "🤖",
  },
  {
    step: "03",
    title: "Get Freshness Score",
    description:
      "Receive an instant freshness score with clear labels — Fresh, Moderate or Spoiled.",
    icon: "📊",
  },
  {
    step: "04",
    title: "Buy with Confidence",
    description:
      "Explore nearby verified sellers and order fresh fish with complete transparency.",
    icon: "🛒",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-32 px-4 sm:px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A5A6A]">
          How SeaSure Works
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-slate-600">
          A simple four-step process that turns uncertainty into confidence
          using AI-powered freshness verification.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="mt-20 max-w-7xl mx-auto space-y-12">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: false }}
            className="
              flex flex-col lg:flex-row
              items-center gap-10
              bg-white/70 backdrop-blur-xl
              rounded-3xl
              p-8 sm:p-12
              shadow-xl
            "
          >
            {/* Left: Step Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-extrabold text-[#5FB3A2]">
                  {item.step}
                </span>
                <span className="text-4xl">{item.icon}</span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#0A5A6A]">
                {item.title}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>

            {/* Right: Visual Placeholder */}
            <div className="flex-1 flex justify-center">
              <div className="
                w-full max-w-sm h-48 sm:h-56
                rounded-2xl
                bg-linear-to-br from-[#E0F7FA] to-[#FFF8E1]
                flex items-center justify-center
                text-[#0A5A6A] font-semibold
              ">
                Step {item.step} Preview
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
