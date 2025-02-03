import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSelectedCategory } from "../store/slices/productSlice";
import { AppDispatch, RootState } from "../store/store";

const CategoryFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const categories = useSelector((state: RootState) => state.products.categories);
    const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory);

    useEffect(() => {
        // Fetch products and categories when component mounts
        dispatch(fetchProducts({ page: 1, category: selectedCategory }));
    }, [dispatch, selectedCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value ? Number(e.target.value) : null;
        dispatch(setSelectedCategory(selected));
    };

    return (
        <div>
            <label htmlFor="category-select">Select Category: </label>
            {/* <select id="category-select" value={selectedCategory ?? ""} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select> */}
        </div>
    );
};

export default CategoryFilter;
