import ProductCard from "../productCard/ProductCard";

const RecentProdcuts = ({ recentProducts }) => {
  return (
    <section className="custom-container mx-auto my-20">
      <h2 className="text-4xl font-bold text-base-content text-center mb-10">
        Recent{" "}
        <span className="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
          Products
        </span>
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-20">
        {recentProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>

      <button className="btn-primary px-6 py-2 block mx-auto">Show All</button>
    </section>
  );
};

export default RecentProdcuts;
