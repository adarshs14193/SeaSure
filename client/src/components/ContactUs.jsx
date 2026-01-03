// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="w-full bg-[#FFF8E1]">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-[#0F3057] mb-6"
        >
          Contact SeaSure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-[#455A64] max-w-2xl mx-auto"
        >
          Questions about fish freshness, deliveries, or local sellers?  
          Reach out to us we’re here to make your seafood experience safe,
          transparent and worry-free.
        </motion.p>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-8 bg-[#3B8F9E] text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
          {[
            {
              icon: FaPhoneAlt,
              title: "Phone",
              text: "+91 91489 55541",
            },
            {
              icon: FaEnvelope,
              title: "Email",
              text: "support@seasure.ai",
            },
            {
              icon: FaMapMarkerAlt,
              title: "Location",
              text: "Serving coastal & inland cities across India",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <item.icon className="w-10 h-10 text-[#E1F5FE] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-[#E1F5FE]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 ">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-center text-[#0F3057] mb-10"
        >
          Send Us a Message
        </motion.h2>

        <form className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label className="block text-[#455A64] font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A69A]"
            />
          </div>

          <div>
            <label className="block text-[#455A64] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A69A]"
            />
          </div>

          <div>
            <label className="block text-[#455A64] font-medium mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Ask about freshness checks, orders, or sellers..."
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26A69A]"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0288D1] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#0277BD] transition-colors"
          >
            Send Message
          </motion.button>
        </form>
      </section>
    </div>
  );
}
