import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/consumer-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-100 via-teal-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        
        {/* Logo / Title */}
        <div className="text-center mb-6">
          
          <h1 className="text-3xl font-bold text-teal-700">
            
            SeaSure
          </h1>
          <p className="text-slate-500 mt-1">
            {isSignup
              ? "Create an account to scan fish freshness"
              : "Welcome back! Login to continue"}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-3 text-sm text-slate-500"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-teal-600 py-3 text-white font-semibold hover:bg-teal-700 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </div>

        {/* Toggle */}
        <p
          className="mt-6 text-center text-sm text-slate-600 cursor-pointer hover:text-teal-600 transition"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New here? Create an account"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
