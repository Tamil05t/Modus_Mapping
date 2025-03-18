import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function GraphView({ crimes }) {
    const graphRef = useRef();

    useEffect(() => {
        if (!crimes.length) return;

        const svg = d3.select(graphRef.current)
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);

        const nodes = crimes.map((crime) => ({ id: crime.id, name: crime.type }));
        const links = crimes.map((crime) => ({ source: crime.id, target: crime.id + 1 }));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(250, 250));

        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "#999");

        const node = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", "#69b3a2");

        simulation.on("tick", () => {
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);
        });
    }, [crimes]);

    return <div ref={graphRef}></div>;
}

export default GraphView;
