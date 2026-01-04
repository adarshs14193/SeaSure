export default function ScanStatus({ status }) {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin h-10 w-10 rounded-full border-4 border-teal-500 border-t-transparent" />

      <p className="mt-4 text-slate-600">
        {status === "QUEUED" && "Queued for AI analysis..."}
        {status === "PROCESSING" && "Analyzing freshness..."}
        {status === "FAILED" && "Analysis failed. Try again."}
      </p>
    </div>
  );
}
