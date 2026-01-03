// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ProblemSection() {
  return (
    <section className="w-full py-28 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
        className="max-w-7xl mx-auto"
      >
        {/* Glass Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="
            bg-white/70 backdrop-blur-xl
            rounded-3xl
            shadow-xl
            p-8 sm:p-12
            grid grid-cols-1 md:grid-cols-2 gap-12
            items-center
          "
        >
          {/* TEXT */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A5A6A]">
              The Problem
            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              In India, millions of people buy fish daily without knowing
              whether it is truly fresh. Visual inspection is unreliable,
              leading to health risks, food wastage and loss of trust
              between consumers and sellers.
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              <span className="font-semibold text-[#0A5A6A]">SeaSure</span> solves
              this by using AI to instantly analyze fish freshness from an image
              empowering buyers to make safe, informed decisions.
            </p>
          </div>

          {/* IMAGE */}
          <motion.img
            src="/fish-freshness-problem.png"
            alt="People buying fish without knowing freshness"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }}
            className="w-full max-w-md mx-auto rounded-2xl"
            />

        </motion.div>
      </motion.div>
    </section>
  );
}
