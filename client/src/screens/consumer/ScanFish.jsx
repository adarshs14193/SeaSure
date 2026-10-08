import { useState } from "react";
import ScanAgainModal from "@/components/modals/ScanAgainModal";
import FreshnessBadge from "@/components/badges/FreshnessBadge";

export default function ScanFish() {
  const [result, setResult] = useState(null);

  return (
    <div className="p-6">
      <ScanAgainModal
        onClose={() => {}}
        onScan={() => setResult("fresh")}
      />

      {result && (
        <div className="mt-6 flex justify-center">
          <FreshnessBadge status={result} />
        </div>
      )}
    </div>
  );
}
