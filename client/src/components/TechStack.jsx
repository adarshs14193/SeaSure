// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function TechStack() {
  return (
    <section className="w-full py-16 px-4 sm:px-6">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="text-center text-sm sm:text-base md:text-lg text-[#0A5A6A] font-medium"
      >
        Powered by Google Vision API • Vertex AI • Firebase • Maps API
      </motion.p>
    </section>
  );
}
