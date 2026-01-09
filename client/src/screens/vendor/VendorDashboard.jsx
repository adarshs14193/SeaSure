import { useState } from "react";
import OceanEntry from "@/components/animations/OceanEntry";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FishUploadForm from "@/components/forms/FishUploadForm";
import VendorFishCard from "@/components/cards/VendorFishCard";
import OrderRequestModal from "@/components/modals/OrderRequestModal";

export default function VendorDashboard() {
  const [fishes, setFishes] = useState([]);
  const [order, setOrder] = useState(null);

  const handleSubmit = (data) => {
    setFishes([
      ...fishes,
      { ...data, freshness: "fresh" }, // mock AI
    ]);
  };

  return (
    <OceanEntry>
      <DashboardLayout title="Vendor Dashboard 🌊">
        <FishUploadForm onSubmit={handleSubmit} />

        <div className="mt-6 space-y-3">
          {fishes.map((fish, i) => (
            <VendorFishCard key={i} fish={fish} />
          ))}
        </div>

        <OrderRequestModal
          order={order}
          onAccept={() => setOrder(null)}
          onDecline={() => setOrder(null)}
        />
      </DashboardLayout>
    </OceanEntry>
  );
}
