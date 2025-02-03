import { useRouter } from "next/navigation";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ProductListCardProps {
    id: number;
    image: string;
    name: string;
    price: number;
    images: Array<{ title: string; description: string; url: string }>;
    rating: number; // Rating is now passed as a prop
    quantity: number

}

const formatPrice = (price: number) => {
    if (price >= 100_000) {
        return `₹${(price / 100_000).toFixed(1)}L`; // For lakhs
    } else if (price >= 10_000) {
        return `₹${(price / 1_000).toFixed(1)}K`; // For thousands
    } else {
        return `₹${price.toLocaleString()}`; // For smaller prices
    }
};



const ProductListCard: React.FC<ProductListCardProps> = ({ image, name, price, id, rating, quantity }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/products/details?id=${id}`); // Pass `id` as a query parameter
    };
    return (
        <div className="bg-white   shadow-lg rounded-lg sm:p-6 p-2 cursor-pointer" onClick={handleClick}
        >
            {/* Product Image */}
            <img
                src={`https://picsum.photos/640/480?random=${id}`}
                alt={name}
                className="w-full h-48 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="mt-2 flex flex-col">
                {/* Product Name (Ensures space is maintained) */}
                <h2 className="text-sm sm:text-base font-semibold min-h-[40px]">{name}</h2>

                {/* Price & Rating Row */}
                <div className="flex items-center justify-between w-full">
                    {/* Price */}
                    <p className="text-gray-600">{formatPrice(price)}</p>

                    {/* Ratings */}
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <span key={index}>
                                {index < rating ? (
                                    <FaStar className="text-yellow-500" />
                                ) : (
                                    <FaRegStar className="text-yellow-500" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListCard;
