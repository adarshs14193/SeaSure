export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#B2EBF2]">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
