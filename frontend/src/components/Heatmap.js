import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Heatmap({ crimes }) {
    useEffect(() => {
        const map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        crimes.forEach((crime) => {
            L.circleMarker([crime.lat, crime.lng], {
                radius: 5,
                fillColor: "#ff4444",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
            }).addTo(map);
        });

        return () => {
            map.remove();
        };
    }, [crimes]);

    return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}

export default Heatmap;
