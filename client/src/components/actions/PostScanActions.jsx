export default function PostScanActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="rounded-xl bg-slate-100 py-3">
        🔪 Cleaning Guide
      </button>

      <button className="rounded-xl bg-slate-100 py-3">
        📦 Preserve Tips
      </button>

      <button className="col-span-2 rounded-xl bg-teal-600 py-3 text-white">
        🚚 Pickup / Delivery
      </button>
    </div>
  );
}
