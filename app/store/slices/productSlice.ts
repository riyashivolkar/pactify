import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images: {
    title: string;
    description: string;
    url: string;
  }[];
  price: number;
  quantity: number;
  // Store the available categories
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  //   categories: Category[]; // Store the available categories
  selectedCategory: number | null; // Store the selected category
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  //   categories: [], // Initialize categories
  selectedCategory: null, // No category selected by default
};

const formatPrice = (price: number) => {
  if (price >= 100_000) {
    return `₹${(price / 100_000).toFixed(1)}L`; // For lakhs
  } else if (price >= 10_000) {
    return `₹${(price / 1_000).toFixed(1)}K`; // For thousands
  } else {
    return `₹${price.toLocaleString()}`; // For smaller prices
  }
};

// Async Thunk for fetching products with pagination
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { page, category }: { page: number; category: number | null },
    { rejectWithValue }
  ) => {
    try {
      let url = `https://fakerapi.it/api/v2/products?_quantity=12&_locale=en&page=${page}`;

      if (category !== null) {
        url += `&category=${category}`; // If API supports category filtering
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log("Fetched Products Response:", data); // Debugging

      // Extract unique categories from the product list
      //   const categories: Category[] = Array.from(
      //     new Set(
      //       data?.data?.map(
      //         (product: { category: Category }) => product.category.id
      //       )
      //     )
      //   ).map((id) => ({
      //     id: id as number, // Type assertion to 'number'
      //     name:
      //       data?.data?.find((p: { category: Category }) => p.category.id === id)
      //         ?.category.name || "Unknown",
      //   }));

      const totalPages = 5; // Fake pagination value

      const duplicatedProducts = data?.data?.map((product: { id: number }) => ({
        ...product,
        id: product.id + (page - 1) * 100, // Ensure unique product IDs
        rating: Math.floor(Math.random() * 5) + 1, // Simulate random rating
        quantity: Math.floor(Math.random() * 9) + 1, // Random quantity between 1 and 9
      }));

      return {
        products: duplicatedProducts ?? [],
        // categories, // Return categories here
        totalPages,
      };
    } catch (error) {
      console.error("API Fetch Error:", error);
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setSelectedCategory,
  updateProductQuantity,
  removeProduct,
} = productSlice.actions;
export default productSlice.reducer;
