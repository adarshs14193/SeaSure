import { Routes, Route, Navigate } from "react-router-dom";

/* ---------- EXISTING PAGES (UNCHANGED) ---------- */
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Consumerdashboard from "./pages/Consumerdashboard";

/* ---------- NEW SCREENS ---------- */
import RoleSelection from "./screens/role/RoleSelection";
import VendorDashboard from "./screens/vendor/VendorDashboard";

/* ---------- OPTIONAL EXTRA SCREENS ---------- */
import ScanFish from "./screens/consumer/ScanFish";
import Recipes from "./screens/consumer/Recipes";
import Health from "./screens/consumer/Health";

export default function App() {
  // 🔹 Mock auth for hackathon demo
  // Replace with real auth state later
  const isLoggedIn = true;

  return (
    <Routes>
      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<Auth />} />

      {/* ---------- ROLE SELECTION ---------- */}
      <Route
        path="/role"
        element={isLoggedIn ? <RoleSelection /> : <Navigate to="/auth" />}
      />

      {/* ---------- VENDOR ---------- */}
      <Route
        path="/vendor"
        element={isLoggedIn ? <VendorDashboard /> : <Navigate to="/auth" />}
      />

      {/* ---------- CONSUMER (UPDATED OLD COMPONENT) ---------- */}
      <Route
        path="/consumer-dashboard"
        element={isLoggedIn ? <Consumerdashboard /> : <Navigate to="/auth" />}
      />

      {/* ---------- OPTIONAL CONSUMER SUB FLOWS ---------- */}
      <Route path="/consumer/scan" element={<ScanFish />} />
      <Route path="/consumer/recipes" element={<Recipes />} />
      <Route path="/consumer/health" element={<Health />} />

      {/* ---------- FALLBACK ---------- */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-slate-600">
            Page not found 🌊
          </div>
        }
      />
     

    </Routes>
  );
}

