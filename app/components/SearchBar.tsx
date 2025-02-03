import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { RootState } from "../store/store";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const router = useRouter();

    // Get products from Redux store
    const products = useSelector((state: RootState) => state.products.products);

    // Function to filter products based on search query
    const fetchSuggestions = (searchTerm: string) => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }

        const filteredProducts = products
            .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => product.name);

        setSuggestions(filteredProducts);
    };

    // Debounced function to prevent excessive filtering
    const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), [products]);

    useEffect(() => {
        debouncedFetch(query);
    }, [query, debouncedFetch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            const matchedProduct = products.find(
                (product) => product.name.toLowerCase() === query.toLowerCase()
            );

            if (matchedProduct) {
                router.push(`/products/details?id=${matchedProduct.id}`);
            } else {
                alert("Product not found!");
            }
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <label
                className="flex items-center border py-2 px-4 rounded-xl shadow-lg"
                htmlFor="search-bar"
            >
                <input
                    id="search-bar"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full outline-none px-4 py-2 rounded-md"
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-black text-white rounded-lg">
                    Search
                </button>
            </label>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded-lg w-full mt-2">
                    {suggestions.map((s, index) => {
                        // Find the matched product by name
                        const matchedProduct = products.find(
                            (product) => product.name.toLowerCase() === s.toLowerCase()
                        );

                        return (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    if (matchedProduct) {
                                        // Navigate to product details page using product ID
                                        router.push(`/products/details?id=${matchedProduct.id}`);
                                    }
                                }}
                            >
                                {s}
                            </li>
                        );
                    })}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
