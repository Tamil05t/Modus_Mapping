import React, { useState } from "react";
import { addCrime } from "../api";

function CrimeForm({ token }) {
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const crime = { id: Date.now(), type, location, description };
        await addCrime(crime, token);
        alert("Crime added successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Crime Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Crime</button>
        </form>
    );
}

export default CrimeForm;
