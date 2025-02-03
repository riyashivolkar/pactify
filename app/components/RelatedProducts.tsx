import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from '../store/slices/productSlice';
import { useSearchParams } from 'next/navigation';
import { AppDispatch, RootState } from '../store/store';
import { useRouter } from 'next/navigation';

const formatPrice = (price: number) => {
    if (price >= 100_000) {
        return `₹${(price / 100_000).toFixed(1)}L`;
    } else if (price >= 10_000) {
        return `₹${(price / 1_000).toFixed(1)}K`;
    } else {
        return `₹${price.toLocaleString()}`;
    }
};

export default function RelatedProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [product, setProduct] = useState<any>(null);
    const router = useRouter();

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

    const relatedProducts = products
        .filter((p: any) => p.id !== Number(id))
        .slice(0, 4);



    const handleClick = () => {
        router.push(`/products/details?id=${id}`); // Pass `id` as a query parameter
    };

    return (
        <div className="bg-white" onClick={handleClick} >
            <div className="mx-auto max-w-2xl px-4  pb-8 sm:pb-10  sm:px-6  lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {relatedProducts.map((product: any) => (
                        <div key={product.id} className="group relative">
                            <img
                                alt={product.imageAlt}
                                src={`https://picsum.photos/640/480?random=${product.id}`}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={`/products/details?id=${id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
