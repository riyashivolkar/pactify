This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Live Demo
You can check out the live version of the project at:
https://pactify-gold.vercel.app/

Architecture Decisions

1. Next.js was chosen for SSR (Server-Side Rendering) to improve SEO and performance.
2. Redux was used for state management to maintain a global state that can be shared across components.
3. Tailwind CSS was integrated for rapid and flexible UI development, allowing for a responsive and modern design.

Trade-offs Made

1. Performance Optimization: We opted for SSR (Server-Side Rendering) to speed up the loading time and improve SEO, but it adds complexity to the server-side code.
2. State Management with Redux: Although Redux provides powerful state management capabilities, it requires careful planning to avoid unnecessary re-renders and ensure performance doesn't degrade.

Future Improvements

1. Add Cart and Checkout Features: Currently, the cart functionality and checkout process are under development.
2. Payment Gateway Integration: Integrate a payment gateway to handle real transactions.
3. Advanced Filtering and Sorting: Implement more advanced filters for products based on user preferences.
4. Mobile Optimization: Further optimize the mobile experience and performance.

Document Assumptions

1. The application assumes that users will have internet access for fetching product data.
2. The application assumes products are identified by unique IDs, and related products are fetched based on product categories.

Known Issues or Limitations

1. Product Details Page Loading: The product details page can take a bit of time to load when there is a large number of products due to SSR fetching.
2. State Persistence: The Redux state is reset on page refresh, so improvements can be made to persist state across page reloads.
3. Incomplete Cart and Checkout: The cart functionality and payment processing flow are still under development.
