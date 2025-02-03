"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // useRouter replaced with useSearchParams
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import { AppDispatch, RootState } from "../../store/store";

import { Radio, RadioGroup } from '@headlessui/react';
import { FaRegStar, FaStar } from "react-icons/fa";
import RelatedProducts from "@/app/components/RelatedProducts";
import ShoppingCart from "@/app/components/ShoppingCart";


type Product9 = {
    name: string;
    price: string;
    href: string;
    breadcrumbs: { id: number; name: string; href: string }[];
    colors: { name: string; class: string; selectedClass: string }[];
    sizes: { name: string; inStock: boolean }[];
    description: string;
    highlights: string[];
    details: string;
};

interface Sizes {
    name: string; inStock: boolean
}
interface Breadcrumb {
    id: number;
    name: string;
    href: string;
}
interface Colors {
    name: string; class: string; selectedClass: string
}
type Review = {
    href: string;
    average: number;
    totalCount: number;
};
const product9: Product9 = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Product', href: '#' },
        { id: 2, name: 'Category', href: '#' },
    ],

    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}; function classNames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
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



const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState(product9.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product9.sizes[2]);
    const [isCartOpen, setIsCartOpen] = useState(false); // Add this line

    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Get id from URL
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

    const [product, setProduct] = useState<any>(null);

    const handleAddToCart = (event: React.FormEvent) => {
        event.preventDefault();
        setIsCartOpen(true);
    };

    useEffect(() => {
        console.log("ID from URL:", id);
        console.log("Products in store:", products);

        if (!id) return; // Exit early if no ID is available

        // Fetch products only if they are not in store
        if (products.length === 0) {
            console.log("Fetching products...");
            dispatch(fetchProducts({ page: 1, category: null }));
        } else {
            // Find product in store
            const foundProduct = products.find((p) => p.id === Number(id));
            if (foundProduct) {
                console.log("Found Product:", foundProduct);
                setProduct(foundProduct);
            } else {
                console.log("Product not found in store!");
                setProduct(null); // Optional: Handle missing product case
            }
        }
    }, [id, products]); // Removed dispatch from dependency array

    if (!product) {
        console.log("Product is still loading...");
        return <p>Loading...</p>;
    }




    console.log("Rendering product details:", product);


    return (
        // 
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product9.breadcrumbs.map((breadcrumb: Breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <img
                        src={`https://picsum.photos/640/480?random=${id}`}
                        className="hidden size-full rounded-lg object-cover lg:block"
                    />
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <img
                            src={`https://picsum.photos/640/480?random=${id}`}
                            className="aspect-3/2 w-full rounded-lg object-cover"
                        />
                        <img
                            src={`https://picsum.photos/640/480?random=${id}`}
                            className="aspect-3/2 w-full rounded-lg object-cover"
                        />
                    </div>
                    <img
                        src={`https://picsum.photos/640/480?random=${id}`}
                        className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
                    />
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{formatPrice(product.price)}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <span key={index}>
                                            {index < product.rating ? (
                                                <FaStar className="text-yellow-500" />
                                            ) : (
                                                <FaRegStar className="text-yellow-500" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                            </div>
                        </div>


                        <form className="mt-10">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                <fieldset aria-label="Choose a color" className="mt-4">
                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center gap-x-3">
                                        {product9.colors.map((color: Colors) => (
                                            <Radio
                                                key={color.name}
                                                value={color}
                                                aria-label={color.name}
                                                className={classNames(
                                                    color.selectedClass,
                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1',
                                                )}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(color.class, 'size-8 rounded-full border border-black/10')}
                                                />
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </a>
                                </div>

                                <fieldset aria-label="Choose a size" className="mt-4">
                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                    >
                                        {product9.sizes.map((size: Sizes) => (
                                            <Radio
                                                key={size.name}
                                                value={size}
                                                disabled={!size.inStock}
                                                className={classNames(
                                                    size.inStock
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6',
                                                )}
                                            >
                                                <span>{size.name}</span>
                                                {size.inStock ? (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            stroke="currentColor"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                        >
                                                            <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            <button
                                onClick={handleAddToCart}

                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                            >
                                Add to cart
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {product9.highlights.map((highlight: string) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product9.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedProducts />
            {isCartOpen && <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
        </div>
    );
};

export default ProductDetails;


