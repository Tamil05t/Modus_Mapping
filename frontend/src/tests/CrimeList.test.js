import React from "react";
import { render, screen } from "@testing-library/react";
import CrimeList from "../components/CrimeList";

test("renders crime list", () => {
    const crimes = [
        { id: 1, type: "Burglary", location: "123 Main St", description: "Stole jewelry" },
    ];
    render(<CrimeList crimes={crimes} />);
    expect(screen.getByText("Burglary - 123 Main St - Stole jewelry")).toBeInTheDocument();
});
