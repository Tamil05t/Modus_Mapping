import React, { useState } from "react";

function CrimeFilters({ onFilter }) {
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleFilter = () => {
        onFilter({ type, startDate, endDate });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Crime Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleFilter}>Apply Filters</button>
        </div>
    );
}

export default CrimeFilters;
