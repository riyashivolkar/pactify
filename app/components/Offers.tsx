import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type OfferProps = {
    title: string;
    description: string;
    buttonText: string;
    bgColor: string;
    textColor: string;
    buttonTextColor: string;
    hoverBgColor?: string;
    onClose: () => void;
};

const Offer: React.FC<OfferProps> = ({
    title,
    description,
    buttonText,
    bgColor,
    textColor,
    buttonTextColor,
    hoverBgColor,
    onClose,
}) => {
    return (
        <div className={`mb-4 shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between ${bgColor} rounded-md`}>
            <p className={`text-sm sm:text-md ${textColor} mb-2 sm:mb-0`}>
                {title} <span className="font-bold">{description}</span>
            </p>
            <div className="flex flex-row sm:flex-row sm:justify-between items-center gap-3">
                <button className={`border border-gray-500 ${buttonTextColor} ${hoverBgColor} px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-md`}>
                    {buttonText}
                </button>
                <button className={`${textColor} hover:text-gray-700`} onClick={onClose}>
                    <XMarkIcon className="w-5 h-5 stroke-2" />
                </button>
            </div>
        </div>
    );
};

export function Offers() {
    const [isExclusiveVisible, setExclusiveVisible] = useState(true);
    const [isHurryVisible, setHurryVisible] = useState(true);

    const handleExclusiveClose = () => {
        setExclusiveVisible(false);
    };

    const handleHurryClose = () => {
        setHurryVisible(false);
    };

    return (
        <section className="py-6 container mx-auto px-4">
            {isExclusiveVisible && (
                <Offer
                    title="🚀 Exclusive Deal! Get up to"
                    description="50% OFF on our top-selling products. Limited time only!"
                    buttonText="Shop Now"
                    bgColor="bg-gray-100"
                    textColor="text-gray-900"
                    buttonTextColor="text-gray-700"
                    hoverBgColor="hover:bg-gray-200"
                    onClose={handleExclusiveClose}
                />
            )}

            {isHurryVisible && (
                <Offer
                    title="🎉 Hurry! Flash Sale is LIVE – Save big on"
                    description="electronics, fashion, and more!"
                    buttonText="Grab the Deal"
                    bgColor="bg-gray-900"
                    textColor="text-white"
                    buttonTextColor="text-gray-100"
                    hoverBgColor="hover:bg-gray-800"

                    onClose={handleHurryClose}
                />
            )}
        </section>
    );
}

export default Offers;
