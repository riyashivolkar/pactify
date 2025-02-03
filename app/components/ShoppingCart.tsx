import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useSearchParams } from 'next/navigation';
import { fetchProducts, removeProduct, updateProductQuantity } from '../store/slices/productSlice';





const formatPrice = (price: number) => {
    if (price >= 100_000) {
        return `₹${(price / 100_000).toFixed(1)}L`;
    } else if (price >= 10_000) {
        return `₹${(price / 1_000).toFixed(1)}K`;
    } else {
        return `₹${price.toLocaleString()}`;
    }
};


interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [product, setProduct] = useState<any>(null);

    const handleRemoveProduct = (id: number) => {
        dispatch(removeProduct(id));
    };


    useEffect(() => {
        console.log("ID from URL:", id);
        console.log("Products in store:", products);

        if (products.length === 0) {
            console.log("Fetching products...");
            dispatch(fetchProducts({ page: 1, category: null }));
        }

        if (id) {
            const foundProduct = products.find((p) => p.id === Number(id));
            console.log("Found Product:", foundProduct);
            setProduct(foundProduct);
        }
    }, [id, products, dispatch]);

    if (!product) {
        console.log("Product is still loading...");
        return <p>Loading...</p>;
    }


    const subtotal = products.reduce((total, product) => {
        if (!product || typeof product.price !== "string" && typeof product.price !== "number") {
            return total; // Skip invalid entries
        }

        const priceString = product.price.toString(); // Convert to string if it's a number
        const cleanedPrice = priceString.replace(/[^\d.]/g, ""); // Remove any non-numeric characters
        const priceNumber = parseFloat(cleanedPrice) || 0; // Convert to a number safely

        return total + priceNumber * product.quantity; // Ensure quantity exists
    }, 0);

    const relatedProducts = products
        .filter((p: any) => p.id !== Number(id))
        .slice(0, 2);

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateProductQuantity({ id, quantity }));
    };
    return (

        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={onClose} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {relatedProducts.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img alt={product.image} src={`https://picsum.photos/640/480?random=${product.id}`} className="size-full object-cover" />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href={''}>{product.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">{formatPrice(product.price)}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{ }</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <select
                                                                    value={product.quantity}
                                                                    onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                                                                    className="border rounded-md p-1 text-gray-600"
                                                                >
                                                                    {[...Array(9).keys()].map((num) => (
                                                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                                    ))}
                                                                </select>
                                                                <div className="flex">
                                                                    <button type="button" onClick={() => handleRemoveProduct(product.id)}
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>{formatPrice(subtotal)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}