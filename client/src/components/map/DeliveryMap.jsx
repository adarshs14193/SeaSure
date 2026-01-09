export default function DeliveryMap({ status }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold text-slate-700 mb-2">
        🚚 Delivery Status
      </h3>

      <div className="h-48 bg-slate-200 rounded flex items-center justify-center">
        <p className="text-slate-600">
          Map animation here (Google Maps API)
        </p>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Current status: <b>{status}</b>
      </p>
    </div>
  );
}
