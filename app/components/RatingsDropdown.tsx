import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface RatingsDropdownProps {
    onRatingsChange: (ratings: number[]) => void;
}

export default function RatingsDropdown({ onRatingsChange }: RatingsDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value); // Convert the value to a number
        if (event.target.checked) {
            setSelectedOptions(prevOptions => [...prevOptions, value]);
        } else {
            setSelectedOptions(prevOptions => prevOptions.filter(option => option !== value));
        }
    };

    // Trigger onRatingsChange after selectedOptions has updated
    useEffect(() => {
        onRatingsChange(selectedOptions);
    }, [selectedOptions, onRatingsChange]);

    return (
        <div className="relative inline-block text-left">
            <div className="flex justify-center items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >
                    Ratings
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-none"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className=' pt-1 pb-2 flex justify-between'>
                        <h2 className="block px-4 font-semibold py-2 text-sm text-gray-600 focus:bg-gray-100 focus:outline-none">Presets</h2>
                        <h2
                            onClick={() => {
                                setSelectedOptions([]);
                                onRatingsChange([]); // Reset ratings filter
                            }}
                            className="block cursor-pointer px-4 font-semibold py-2 text-sm text-gray-900 focus:bg-gray-100 focus:outline-none"
                        >
                            Clear All
                        </h2>
                    </div>
                    <div className="py-1">
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="checkbox"
                                name="option"
                                value="1"
                                checked={selectedOptions.includes(1)}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            1 Star
                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="checkbox"
                                name="option"
                                value="2"
                                checked={selectedOptions.includes(2)}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            2 Stars
                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="checkbox"
                                name="option"
                                value="3"
                                checked={selectedOptions.includes(3)}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            3 Stars
                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="checkbox"
                                name="option"
                                value="4"
                                checked={selectedOptions.includes(4)}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            4 Stars
                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="checkbox"
                                name="option"
                                value="5"
                                checked={selectedOptions.includes(5)}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            5 Stars
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
