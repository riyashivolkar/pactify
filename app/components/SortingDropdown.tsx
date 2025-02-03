// SortingDropdown.tsx
import React from 'react';
import PriceDropdown from './PriceDropown';

interface SortingDropdownProps {
    sortOption: string;
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({ sortOption, handleSortChange }) => {
    return (
        <div className="flex flex-row items-center justify-center space-x-4">
            <div className="mb-4 flex justify-center items-center">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="price">Price</option>
                </select>
            </div>
            <div className="mb-4 flex justify-center items-center">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className="mb-4 flex justify-center items-center">
                {/* <PriceDropdown /> */}

            </div>
        </div>
    );
};

export default SortingDropdown;
