export default function ScanFishCard({ onScan, loading }) {
  function handleFile(e) {
    const file = e.target.files[0];
    if (file) onScan(file);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-slate-800">
        Scan your fish 🐟
      </h2>

      <p className="text-slate-500 mt-1">
        AI checks freshness, health, and safety
      </p>

      <label className="mt-6 block cursor-pointer rounded-xl bg-teal-600 py-3 text-center text-white font-medium">
        {loading ? "Uploading..." : "Take Photo"}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
        />
      </label>
    </div>
  );
}
