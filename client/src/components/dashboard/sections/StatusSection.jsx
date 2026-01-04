import ScanStatus from "@/components/scan/ScanStatus";

export default function StatusSection({ status }) {
  if (status === "DONE") return null;

  return (
    <section className="my-10">
      <ScanStatus status={status} />
    </section>
  );
}
