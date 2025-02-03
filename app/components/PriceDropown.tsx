import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface PriceDropdownProps {
    onPriceChange: (range: string) => void;
}

export default function PriceDropdown({ onPriceChange }: PriceDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);

        onPriceChange(value);

    };

    return (
        <div className="relative inline-block text-left">
            <div className="flex justify-center items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >
                    Price
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-none"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className=' pt-1 pb-2 flex justify-between'>
                        <h2 className="block px-4 font-semibold py-2 text-sm text-gray-600   focus:bg-gray-100 focus:outline-none"
                        >Presets</h2>
                        <h2
                            onClick={() => {
                                setSelectedOption(null);
                                onPriceChange(""); // Reset price filter
                            }}
                            className="block cursor-pointer px-4 font-semibold py-2 text-sm text-gray-900   focus:bg-gray-100  focus:outline-none"
                        >Clear All</h2>
                    </div>
                    <div className="py-1">
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="radio"
                                name="option"
                                value="under-50k"
                                checked={selectedOption === 'account-settings'}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            Under  ₹50K                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="radio"
                                name="option"
                                value="50k-to-50l"
                                checked={selectedOption === 'support'}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            ₹50K - ₹50L                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="radio"
                                name="option"
                                value="50l-to-100l"
                                checked={selectedOption === 'license'}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            ₹50L - ₹100L
                        </label>
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                            <input
                                type="radio"
                                name="option"
                                value="above-100l"
                                checked={selectedOption === 'sign-out'}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                            />
                            Above ₹100L                         </label>
                    </div>

                </div>
            )}
        </div>
    );
}