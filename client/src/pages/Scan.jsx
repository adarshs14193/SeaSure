import { useState } from "react";
import { auth } from "../lib/firebase";

const Scan = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select an image");

    const token = await auth.currentUser.getIdToken();
    const formData = new FormData();
    formData.append("image", file);

    await fetch("http://localhost:5001/consumer/scan", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("Scan uploaded");
  };

  return (
    <div>
      <h2>Check Fish Freshness</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Scan;
