import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import OceanEntry from "@/components/animations/OceanEntry";
import FreshnessBadge from "@/components/badges/FreshnessBadge";
import DeliveryMap from "@/components/map/DeliveryMap";
import PostDeliveryModal from "@/components/modals/PostDeliveryModal";
import RatingModal from "@/components/modals/RatingModal";
import ScanAgainModal from "@/components/modals/ScanAgainModal";

/* ---------------- MOCK DATA ---------------- */

const fishes = [
  {
    id: 1,
    name: "Pomfret",
    vendor: "Coastal Fish Mart",
    distance: 1.2,
    price: 450,
    freshness: "fresh",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Mackerel",
    vendor: "Sea Fresh Hub",
    distance: 2.8,
    price: 280,
    freshness: "moderate",
    image: "https://via.placeholder.com/150",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Consumerdashboard() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [orderedFish, setOrderedFish] = useState(null);
  const [delivered, setDelivered] = useState(false);
  const [showPostDelivery, setShowPostDelivery] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showScan, setShowScan] = useState(false);

  return (
    <OceanEntry>
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Fresh Fish Near You 🐟
        </h1>

        {/* ---------------- FISH FEED ---------------- */}
        {!orderedFish && (
          <div className="space-y-4">
            {fishes.map((fish) => (
              <motion.div
                key={fish.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow p-4 flex gap-4"
              >
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {fish.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {fish.vendor} • {fish.distance} km away
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <FreshnessBadge status={fish.freshness} />
                    <span className="font-medium">₹{fish.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => setOrderedFish(fish)}
                  className="bg-[#00B4D8] text-white px-4 py-2 rounded-lg self-center hover:bg-[#0096c7]"
                >
                  Order
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* ---------------- ORDER TRACKING ---------------- */}
        {orderedFish && (
          <div className="space-y-6">
            <DeliveryMap status={delivered ? "Delivered" : "Out for delivery"} />

            {!delivered && (
              <button
                onClick={() => {
                  setDelivered(true);
                  setShowPostDelivery(true);
                }}
                className="w-full bg-emerald-500 text-white py-2 rounded-lg"
              >
                Mark as Delivered (Demo)
              </button>
            )}
          </div>
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
              alert("Freshness checked again!");
              setShowScan(false);
              setShowRating(true);
            }}
          />
        )}

        {/* ---------------- RATING ---------------- */}
        {showRating && (
          <RatingModal
            onSubmit={() => {
              alert("Thanks for rating!");
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
