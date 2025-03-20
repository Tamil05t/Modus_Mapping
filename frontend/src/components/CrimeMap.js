import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function CrimeMap({ crimes }) {
    useEffect(() => {
        const map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        crimes.forEach((crime) => {
            const marker = L.marker([crime.latitude, crime.longitude]).addTo(map);
            marker.bindPopup(`
                <b>${crime.type}</b><br>
                ${crime.location}<br>
                ${crime.description}<br>
                ${crime.image_url ? `<img src="${crime.image_url}" width="100">` : ""}
            `);
        });

        return () => {
            map.remove();
        };
    }, [crimes]);

    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}

export default CrimeMap;
