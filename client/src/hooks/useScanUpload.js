import { useState } from "react";

export function useScanUpload() {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  async function uploadAndScan(file) {
    setLoading(true);

    // simulate upload + backend processing
    await new Promise((res) => setTimeout(res, 1200));

    setLoading(false);

    // return fake scanId
    return "demo-scan-id";
  }

  return { uploadAndScan, loading };
}
