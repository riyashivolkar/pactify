'use client'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setPage } from "../store/slices/productSlice";
import { RootState, AppDispatch } from "../store/store";
import ProductListCard from "./ProductListCard";
import Offers from "./Offers";
import PriceDropdown from "./PriceDropown";
import RatingsDropdown from "./RatingsDropdown";
import CategoryFilter from "./CategoryFilter";

export function ProductListSection() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error, page, totalPages } = useSelector((state: RootState) => state.products);

    // Local state for sorting and filtering
    const [sortOption, setSortOption] = useState("price");
    const [priceRange, setPriceRange] = useState("");
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

    // Fetch products when the page changes
    useEffect(() => {
        dispatch(fetchProducts({ page, category: null }));
    }, [dispatch, page]);

    // Function to filter products by price range
    const filterProductsByPrice = (products: any[], range: string) => {
        switch (range) {
            case 'under-50k':
                return products.filter(product => product.price < 50000);
            case '50k-to-50l':
                return products.filter(product => product.price >= 50000 && product.price <= 5000000);
            case '50l-to-100l':
                return products.filter(product => product.price > 5000000 && product.price <= 10000000);
            case 'above-100l':
                return products.filter(product => product.price > 10000000);
            default:
                return products;
        }
    };

    // Function to filter products by rating
    const filterProductsByRating = (products: any[], ratings: string[]) => {
        if (ratings.length === 0) return products; // If no rating is selected, return all products
        return products.filter(product => ratings.includes(product.rating.toString()));
    };

    // Function to sort products based on selected option
    const sortProducts = (products: any[], sortOption: string) => {
        return [...products].sort((a, b) => {
            if (sortOption === "price") return a.price - b.price;
            return 0;
        });
    };

    // Handle sorting change
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    // Handle price range change
    const handlePriceChange = (range: string) => {
        setPriceRange(range);
        console.log("Selected Price Range:", range);
    };

    // Handle rating selection change
    const handleRatingsChange = (ratings: number[]) => {
        setSelectedRatings(ratings);
        console.log("Selected Ratings:", ratings);
    };


    // Apply sorting and filtering
    const filteredByPrice = filterProductsByPrice(products, priceRange);
    const filteredByPriceAndRating = filterProductsByRating(filteredByPrice, selectedRatings.map(String));
    const sortedAndFilteredProducts = sortProducts(filteredByPriceAndRating, sortOption);

    return (
        <section className="py-10 sm:px-8 px-4">
            <div className="mx-auto text-center mb-5">
                <p className="font-medium text-lg">Tailored Product Search</p>
                <h1 className="my-4 text-4xl">Find What You Need</h1>
                <p className="text-gray-500 mx-auto max-w-2xl">
                    Simplify your shopping experience with our intuitive filter system.
                </p>
            </div>

            <Offers />

            {/* Filters & Sorting */}
            <div className="flex flex-row items-center justify-center space-x-4">
                {/* Ratings Dropdown */}
                <div className="mb-4 flex justify-center items-center">
                    <PriceDropdown onPriceChange={handlePriceChange} />

                </div>

                {/* Price Filter Dropdown */}
                <div className="mb-4 flex justify-center items-center">
                    <RatingsDropdown onRatingsChange={handleRatingsChange} />

                </div>
                {/* <div className="mb-4 flex justify-center items-center">
                    <CategoryFilter />
                </div> */}
            </div>

            {/* Product Display */}
            {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : sortedAndFilteredProducts.length === 0 ? (
                <p className="text-center text-gray-500">No products match the selected filters.</p>
            ) : (
                <div className="grid grid-cols-2 sm:gap-8 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {sortedAndFilteredProducts.slice(0, 12).map((product) => (
                        <ProductListCard
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            images={product.images}
                            quantity={product.quantity}

                        />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center gap-4">
                <button
                    className="px-4 py-2 cursor-pointer bg-gray-300 rounded-lg disabled:opacity-50"
                    onClick={() => dispatch(setPage(page - 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-lg font-medium">{page} / {totalPages}</span>
                <button
                    className="px-4 py-2 cursor-pointer bg-gray-300 rounded-lg disabled:opacity-50"
                    onClick={() => dispatch(setPage(page + 1))}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default ProductListSection;
