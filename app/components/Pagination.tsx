import React, { useEffect } from "react";
import { RootState, AppDispatch } from "../store/store";
import { fetchProducts, setPage } from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
const { page, totalPages } = useSelector((state: RootState) => state.products);

const Pagination = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchProducts({ page, category: null }));
    }, [dispatch, page]);

    return (
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
        </div>)
}

export default Pagination