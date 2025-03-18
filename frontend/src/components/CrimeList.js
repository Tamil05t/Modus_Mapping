import React, { useState } from "react";

function CrimeList({ crimes }) {
    const [currentPage, setCurrentPage] = useState(1);
    const crimesPerPage = 10;

    const indexOfLastCrime = currentPage * crimesPerPage;
    const indexOfFirstCrime = indexOfLastCrime - crimesPerPage;
    const currentCrimes = crimes.slice(indexOfFirstCrime, indexOfLastCrime);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <ul>
                {currentCrimes.map((crime) => (
                    <li key={crime.id}>
                        {crime.type} - {crime.location} - {crime.description}
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: Math.ceil(crimes.length / crimesPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CrimeList;
