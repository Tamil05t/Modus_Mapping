import React, { useState } from "react";
import { addCrime } from "../api";

function CrimeForm({ token }) {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setType("");
    setLocation("");
    setDescription("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Validation
    if (!type || !location || !description) {
      setError("All fields are required!");
      return;
    }

    const crime = {
      id: Date.now(),
      type,
      location,
      description,
    };

    setLoading(true);

    try {
      await addCrime(crime, token);
      alert("✅ Crime added successfully!");
      resetForm();
    } catch (err) {
      console.error("Failed to add crime:", err);
      setError("❌ Failed to add crime. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="crime-form">
      <h2>Add Crime</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Crime Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Crime"}
      </button>
    </form>
  );
}

export default CrimeForm;
