export default function DashboardLayout({ title, children }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        {title}
      </h1>
      {children}
    </div>
  );
}
