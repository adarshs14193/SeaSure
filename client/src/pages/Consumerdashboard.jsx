import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


import OceanEntry from "../components/animations/OceanEntry";
import FreshnessBadge from "../components/badges/FreshnessBadge";
import DeliveryMap from "../components/map/DeliveryMap";
import PostDeliveryModal from "../components/modals/PostDeliveryModal";
import RatingModal from "../components/modals/RatingModal";
import ScanAgainModal from "../components/modals/ScanAgainModal";

/* ---------------- MOCK DATA ---------------- */

const fishes = [
  {
    id: 1,
    name: "Pomfret",
    vendor: "Coastal Fish Mart",
    distance: 1.2,
    price: 450,
    freshness: "fresh",
    image: "/pomfret.jpg",
  },
  {
    id: 2,
    name: "Mackerel",
    vendor: "Sea Fresh Hub",
    distance: 2.8,
    price: 280,
    freshness: "moderate",
    image: "/mackarel.jpg",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Consumerdashboard() {
  const [orderedFish, setOrderedFish] = useState(null);
  const [delivered, setDelivered] = useState(false);
  const [showPostDelivery, setShowPostDelivery] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showScan, setShowScan] = useState(false);

  return (
    <OceanEntry>
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold text-slate-900">
            Fresh Fish Near You 🐟
          </h1>
          <p className="text-slate-600 font-medium mt-2">
            Order from trusted nearby vendors with AI-verified freshness
          </p>
        </motion.div>

        {/* ---------------- FISH FEED ---------------- */}
        {!orderedFish && (
          <div className="space-y-5">
            {fishes.map((fish, index) => (
              <motion.div
                key={fish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex gap-4"
              >
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800">
                    {fish.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    🏪 {fish.vendor} • 📍 {fish.distance} km away
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <FreshnessBadge status={fish.freshness} />
                    <span className="text-lg font-semibold text-slate-800">
                      ₹{fish.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setOrderedFish(fish)}
                  className="bg-[#00B4D8] text-white px-5 py-2 rounded-xl self-center font-semibold hover:bg-[#0096c7] transition"
                >
                  Order 🛒
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* ---------------- ORDER TRACKING ---------------- */}
        {orderedFish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-800">
              🚚 Tracking Your Order
            </h2>

            <DeliveryMap
              status={delivered ? "Delivered" : "Out for delivery"}
            />

            {!delivered && (
              <button
                onClick={() => {
                  setDelivered(true);
                  setShowPostDelivery(true);
                }}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
              >
                Mark as Delivered (Demo)
              </button>
            )}
          </motion.div>
        )}

        {/* ---------------- POST DELIVERY ---------------- */}
        {showPostDelivery && (
          <PostDeliveryModal
            onClose={() => {
              setShowPostDelivery(false);
              setShowRating(true);
            }}
            onScan={() => {
              setShowPostDelivery(false);
              setShowScan(true);
            }}
          />
        )}

        {/* ---------------- SCAN AGAIN ---------------- */}
        {showScan && (
          <ScanAgainModal
            onClose={() => setShowScan(false)}
            onScan={() => {
              alert("Freshness checked again! 🧪");
              setShowScan(false);
              setShowRating(true);
            }}
          />
        )}

        {/* ---------------- RATING ---------------- */}
        {showRating && (
          <RatingModal
            onSubmit={() => {
              alert("Thanks for rating! ⭐");
              setShowRating(false);
              setOrderedFish(null);
              setDelivered(false);
            }}
          />
        )}
      </div>
    </OceanEntry>
  );
}
