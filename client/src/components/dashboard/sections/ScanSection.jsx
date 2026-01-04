import ScanFishCard from "@/components/scan/ScanFishCard";

export default function ScanSection({ onScan, loading }) {
  return (
    <section className="mb-6">
      <ScanFishCard onScan={onScan} loading={loading} />
    </section>
  );
}
