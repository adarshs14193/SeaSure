// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SeaSureHero() {
  return (
    <section className="relative w-screen overflow-hidden bg-[#B2EBF2]">
      <motion.img
        src="/seasure-hero.png"
        alt="SeaSure – Fresh fish delivered with AI freshness check"
        draggable="false"
        className="
          w-full
          select-none

          /* MOBILE */
          h-[70svh]
          object-contain
          px-4

          /* DESKTOP */
          md:h-svh
          md:object-cover
          md:px-0
        "
        initial={{ opacity: 0, y: 40, scale: 1.03 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </section>
  );
}
