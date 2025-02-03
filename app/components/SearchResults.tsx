"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        if (query) {
            // Mock API Call (Replace with real search logic)
            setResults([
                `Result 1 for ${query}`,
                `Result 2 for ${query}`,
                `Result 3 for ${query}`,
            ]);
        }
    }, [query]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-xl font-semibold">Search Results for "{query}"</h1>
            <ul className="mt-4">
                {results.length > 0 ? (
                    results.map((r, index) => (
                        <li key={index} className="p-2 border-b">
                            {r}
                        </li>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </ul>
        </div>
    );
};

export default SearchResults;
