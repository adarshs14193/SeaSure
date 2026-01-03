// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaHandsHelping } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#E0F7FA]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-[#0F3057] mb-6"
        >
          About SeaSure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-[#37474F] max-w-3xl mx-auto"
        >
          SeaSure bridges the gap between fishermen, sellers, and consumers by
          combining AI-powered freshness verification with a transparent fish
          marketplace — so you always know what you’re buying.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-8 bg-linear-to-b from-[#4FC3F7] to-[#0288D1]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-white text-center mb-10"
        >
          Our Mission
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-[#E1F5FE] max-w-4xl mx-auto text-center"
        >
          To empower consumers across India with confidence in seafood purchases
          by using AI to verify fish freshness, reduce food waste, and ensure
          healthier meals from sea to plate.
        </motion.p>
      </section>

      {/* Vision & Values */}
      <section className="py-20 px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-center text-[#0F3057] mb-12"
        >
          Our Vision & Core Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: FaHeartbeat,
              title: "Health & Freshness",
              text: "Ensuring every fish meets freshness standards through AI-powered image analysis.",
            },
            {
              icon: FaUsers,
              title: "Trust & Community",
              text: "Building a trusted seafood ecosystem connecting fishermen, sellers and consumers.",
            },
            {
              icon: FaHandsHelping,
              title: "Sustainability",
              text: "Reducing food wastage and promoting responsible fishing practices.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center"
            >
              <value.icon className="w-12 h-12 text-[#26A69A] mb-4" />
              <h3 className="text-xl font-semibold text-[#0F3057] mb-2">
                {value.title}
              </h3>
              <p className="text-[#455A64]">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
