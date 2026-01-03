// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative w-full py-44 px-4 sm:px-6 overflow-hidden">

      {/* 🌟 Radial Spotlight (Highlight) */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(95,179,162,0.18),transparent_60%)]
          -z-20
        "
      />

      {/* 🌊 Wave Divider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        className="absolute inset-0 -z-10"
      >
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#E0F7FA"
            d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,144C840,139,960,149,1080,176C1200,203,1320,245,1380,266.7L1440,288L1440,320L0,320Z"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        {/* 🔹 Micro-label (anchors attention) */}
        <span className="
          inline-block
          mb-4
          px-4 py-1.5
          text-sm
          font-semibold
          tracking-wide
          rounded-full
          bg-[#5FB3A2]/15
          text-[#0A5A6A]
        ">
          Start here
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A5A6A]">
          Buy Fish With Confidence.
        </h2>

        <p className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto">
          Let AI verify freshness before you spend a single rupee.
        </p>

        {/* 🎯 Floating CTA Button with Focus Ring */}
        <div className="relative mt-16 inline-block">
          {/* Animated focus ring */}
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            className="
              absolute inset-0
              rounded-full
              border-2
              border-[#5FB3A2]
            "
          />

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => window.location.href = "/login"}
            className="
              relative
              bg-[#0A5A6A]
              hover:bg-[#084C59]
              text-white
              px-16 py-5
              rounded-full
              text-xl
              font-semibold
              shadow-2xl
            "
          >
            Check Freshness Now →
          </motion.button>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          No guesswork • AI-powered • Trusted sellers
        </p>
      </motion.div>
    </section>
  );
}
