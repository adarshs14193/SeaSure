import { useState } from "react";
import DeliveryMap from "@/components/map/DeliveryMap";
import PostDeliveryModal from "@/components/modals/PostDeliveryModal";
import RatingModal from "@/components/modals/RatingModal";

export default function OrderTracking() {
  // eslint-disable-next-line no-unused-vars
  const [delivered, setDelivered] = useState(true);
  const [rate, setRate] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <DeliveryMap status="Out for delivery" />

      {delivered && (
        <PostDeliveryModal
          onClose={() => setRate(true)}
          onScan={() => alert("Open scan")}
        />
      )}

      {rate && (
        <RatingModal onSubmit={() => alert("Thanks for rating!")} />
      )}
    </div>
  );
}
