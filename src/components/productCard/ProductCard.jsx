import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    _id: id,
    image,
    title,
    condition,
    price_min: priceMin,
    price_max: priceMax,
  } = product;

  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <div className="w-full h-60 bg-gray-300 rounded mb-4" />
      <h3 className="text-xl font-medium text-base-content mb-2">
        {title} [{condition}]
      </h3>
      <h4 className="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent text-lg font-semibold mb-4">
        $ {priceMin}-{priceMax}
      </h4>
      <Link
        to={`/product-details/${id}`}
        className="w-full block py-2 btn-secondary text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
