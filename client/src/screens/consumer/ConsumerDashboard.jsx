import { useState } from "react";
import OceanEntry from "@/components/animations/OceanEntry";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FishCard from "@/components/cards/FishCard";

export default function ConsumerDashboard() {
  const [ordered, setOrdered] = useState(false);

  const fishes = [
    {
      name: "Pomfret",
      vendor: "Coastal Fish Mart",
      distance: 1.2,
      price: 450,
      freshness: "fresh",
      image: "https://via.placeholder.com/150"
    },
  ];

  return (
    <OceanEntry>
      <DashboardLayout title="Fresh Fish Near You 🐟">
        <div className="space-y-4">
          {fishes.map((fish, i) => (
            <FishCard
              key={i}
              fish={fish}
              onOrder={() => setOrdered(true)}
            />
          ))}
        </div>

        {ordered && (
          <p className="mt-6 text-center text-emerald-600 font-medium">
            Order placed! Tracking delivery 🚚
          </p>
        )}
      </DashboardLayout>
    </OceanEntry>
  );
}
