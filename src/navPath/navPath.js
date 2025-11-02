const navPaths = [
  { id: 1, path: "/", name: "Home", isVisible: true },
  { id: 2, path: "/all-products", name: "All Products", isVisible: true },
  { id: 3, path: "/my-products", name: "My Products", isVisible: false },
  { id: 4, path: "/my-bids", name: "My Bids", isVisible: false },
  { id: 5, path: "/create-product", name: "Create Product", isVisible: false },
];

const visibleNavPaths = navPaths.filter((navPath) => navPath.isVisible);

const hiddenNavPaths = navPaths.filter(
  (navPath) => navPath.isVisible === false,
);

export { visibleNavPaths, hiddenNavPaths };
