import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import ScanSection from "./sections/ScanSection";
import StatusSection from "./sections/StatusSection";
import ResultSection from "./sections/ResultSection";
import ActionSection from "./sections/ActionSection";

// mock hook – replace with your real firestore hook
import { useScanListener } from "@/hooks/useScanListener";
import { useScanUpload } from "@/hooks/useScanUpload";

export default function ConsumerDashboard() {
  const [scanId, setScanId] = useState(null);

  const { uploadAndScan, loading: uploading } = useScanUpload();
  const { scan } = useScanListener(scanId);

  async function handleScan(file) {
    const id = await uploadAndScan(file);
    setScanId(id);
  }

  return (
    <DashboardLayout>
      <ScanSection onScan={handleScan} loading={uploading} />

      {scan && (
        <>
          <StatusSection status={scan.analysisStatus} />
          <ResultSection scan={scan} />
          <ActionSection scan={scan} />
        </>
      )}
    </DashboardLayout>
  );
}
