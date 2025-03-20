import React from "react";
import CrimeMap from "./CrimeMap";
import ImageUpload from "./ImageUpload";

function Dashboard({ crimes }) {
    return (
        <div>
            <h1>Dashboard</h1>
            <ImageUpload />
            <CrimeMap crimes={crimes} />
        </div>
    );
}

export default Dashboard;
