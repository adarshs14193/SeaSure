import { useState } from "react";

export default function FishUploadForm({ onSubmit }) {
  const [data, setData] = useState({
    fishName: "",
    arrivalTime: "",
    shopLocation: "",
    storage: "ice",
    eyeImage: null,
    gillImage: null,
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-slate-700">
        🐟 List Today’s Catch
      </h2>

      {/* Eye Image */}
      <label className="block">
        <span className="text-sm text-slate-600">
          Upload fish eye image (clear & close 👁️)
        </span>
        <input
          type="file"
          className="mt-1"
          onChange={(e) =>
            setData({ ...data, eyeImage: e.target.files[0] })
          }
        />
      </label>

      {/* Gill Image */}
      <label className="block">
        <span className="text-sm text-slate-600">
          Upload fish gill image (important freshness indicator 🩸)
        </span>
        <input
          type="file"
          className="mt-1"
          onChange={(e) =>
            setData({ ...data, gillImage: e.target.files[0] })
          }
        />
      </label>

      <input
        type="text"
        placeholder="Fish Name (e.g. Pomfret)"
        className="w-full border rounded px-3 py-2"
        onChange={(e) =>
          setData({ ...data, fishName: e.target.value })
        }
      />

      <input
        type="time"
        className="w-full border rounded px-3 py-2"
        onChange={(e) =>
          setData({ ...data, arrivalTime: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Shop Location"
        className="w-full border rounded px-3 py-2"
        onChange={(e) =>
          setData({ ...data, shopLocation: e.target.value })
        }
      />

      <select
        className="w-full border rounded px-3 py-2"
        onChange={(e) =>
          setData({ ...data, storage: e.target.value })
        }
      >
        <option value="ice">Stored on Ice</option>
        <option value="chilled">Chilled</option>
        <option value="room">Room Temperature</option>
      </select>

      <button
        onClick={() => onSubmit(data)}
        className="w-full bg-[#0077B6] text-white py-2 rounded hover:bg-[#005f8a] transition"
      >
        Analyze Freshness 🌊
      </button>
    </div>
  );
}
