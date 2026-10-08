import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import OceanEntry from "@/components/animations/OceanEntry";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FishUploadForm from "@/components/forms/FishUploadForm";
import VendorFishCard from "@/components/cards/VendorFishCard";
import OrderRequestModal from "@/components/modals/OrderRequestModal";

export default function VendorDashboard() {
  const [fishes, setFishes] = useState([]);
  const [order, setOrder] = useState(null);

  const handleSubmit = (data) => {
    setFishes((prev) => [
      ...prev,
      { ...data, freshness: "fresh" }, // mock AI
    ]);
  };

  return (
    <OceanEntry>
      <DashboardLayout title="">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Vendor Dashboard
          </h1>
          <p className="text-base font-medium text-slate-700 mt-2 max-w-2xl">
            Upload your daily catch, analyze fish freshness using AI, and
            manage incoming customer orders — all in one place.
          </p>
        </motion.div>

        {/* UPLOAD SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/85 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-cyan-100"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            🐟 Upload Today’s Fish
          </h2>
          <p className="text-sm font-medium text-slate-600 mb-6">
            Provide clear images of the fish eye and gills along with arrival
            details. Our AI will instantly assign a freshness badge.
          </p>

          <FishUploadForm onSubmit={handleSubmit} />
        </motion.div>

        {/* LISTED FISH */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Listed Fish Inventory
          </h2>
          <p className="text-sm font-medium text-slate-600 mb-6">
            These fish are currently visible to nearby customers.
          </p>

          {fishes.length === 0 && (
            <p className="text-slate-500 font-medium text-sm">
              No fish listed yet. Upload your first catch to start receiving orders.
            </p>
          )}

          <div className="space-y-4">
            {fishes.map((fish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <VendorFishCard fish={fish} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ORDER MODAL */}
        <OrderRequestModal
          order={order}
          onAccept={() => setOrder(null)}
          onDecline={() => setOrder(null)}
        />
      </DashboardLayout>
    </OceanEntry>
  );
}
