import { useContext, useEffect, useRef, useState } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { Link, useLoaderData, useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const bidModalRef = useRef(null);
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);

  console.log(product);

  const {
    condition,
    usage,
    description,
    title,
    category,
    price_min: priceMin,
    price_max: priceMax,
    _id: id,
    created_at: createdAt,
    seller_image: sellerImage,
    seller_name: sellerName,
    email,
    location,
    status,
    seller_contact: sellerContact,
  } = product;

  useEffect(() => {
    fetch(`http://localhost:3000/bids/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBids(data);
      })
      .catch((error) => console.error(error.message));
  }, [id]);

  const handleBuyProduct = () => {
    console.log(user);
    if (isLoading) {
      // TODO: Show spinner
      return;
    }

    if (user) {
      bidModalRef.current.showModal();
      return;
    }

    navigate("/login");
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const buyerName = form.buyerName.value.trim();
    const buyerEmail = form.buyerEmail.value.trim();
    const buyerImage = form.buyerImageURL.value.trim();
    const bidAmount = parseInt(form.price.value.trim());
    const buyerContact = form.contact.value.trim();

    console.log(
      "Buyer:",
      id,
      buyerName,
      buyerEmail,
      buyerImage,
      bidAmount,
      buyerContact,
    );

    const newBid = {
      product: id,
      buyer_image: buyerImage,
      buyer_name: buyerName,
      buyer_contact: buyerContact,
      buyer_email: buyerEmail,
      bid_price: bidAmount,
      status: "pending",
    };

    console.log(newBid);

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After placing bid", data);

        if (data.insertedId) {
          bidModalRef.current.close();

          Swal.fire({
            text: "Your bid has been placed",
            icon: "success",
          });

          const placedBid = { _id: data.insertedId, ...newBid };

          const newBids = [...bids, placedBid];

          newBids.sort((a, b) => b.bid_price - a.bid_price);

          setBids(newBids);
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <section className="custom-container mx-auto my-20 flex items-start gap-8">
        <div className="w-[35%]">
          <div className="w-full aspect-square bg-gray-300 rounded-lg mb-8"></div>

          <div className="bg-base-200 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-base-content mb-6">
              Product Description
            </h3>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
                Condition:{" "}
                <span className="text-base-content">{condition}</span>
              </h4>

              <h4 className="font-semibold bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
                Usage Time: <span className="text-base-content">{usage}</span>
              </h4>
            </div>

            <hr className="mb-6" />

            <p className="font-medium text-[#969A9D]">{description}</p>
          </div>
        </div>
        <div className="w-[65%]">
          <Link className="flex items-center gap-2 mb-4">
            <HiMiniArrowLongLeft size={24}></HiMiniArrowLongLeft> Back to
            Products
          </Link>
          <h1 className="text-4xl font-bold text-base-content mb-4">{title}</h1>
          <div className="w-max px-3 py-1 rounded-full bg-linear-to-br from-primary/15 to-secondary/15 mb-6">
            <h5 className="text-xs font-medium bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
              {category}
            </h5>
          </div>
          <div className="p-6 bg-base-200 rounded-lg mb-6">
            <h3 className="text-2xl font-bold text-[#4CAF50] mb-2">
              ${priceMin} - {priceMax}
            </h3>
            <p className="text-base font-normal text-base-content">
              Price starts from
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-lg mb-6">
            <h3 className="text-2xl font-semibold text-base-content mb-6">
              Product Details
            </h3>
            <p className="text-base font-semibold text-base-content">
              Product ID: <span className="font-normal">{id}</span>
            </p>
            <p className="text-base font-semibold text-base-content">
              Posted:{" "}
              <span className="font-normal">
                {new Date(createdAt).toLocaleDateString("en-gb")}
              </span>
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-lg mb-6">
            <h3 className="text-2xl font-semibold text-base-content mb-6">
              Seller Information
            </h3>
            <div>
              <div className="flex items-start gap-8 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-base-content">
                    {sellerName}
                  </h4>
                  <h5 className="text-sm text-base-content">{email}</h5>
                </div>
              </div>
              <p className="text-base font-semibold text-base-content mb-3">
                Location: <span className="font-normal">{location}</span>
              </p>
              <p className="text-base font-semibold text-base-content mb-3">
                Contact: <span className="font-normal">{sellerContact}</span>
              </p>
              <p className="text-base font-semibold text-base-content flex items-center gap-3">
                Status:
                <span className="p-3 py-1 bg-[#FFC107] rounded-full text-xs font-normal">
                  {status}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={handleBuyProduct}
            className="btn-primary w-full py-4"
          >
            I Want to Buy this Product
          </button>
        </div>

        <dialog
          ref={bidModalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-base-content mb-6">
              Give Seller Your Offered Price
            </h3>
            <form onSubmit={handleBidSubmit} className="">
              <fieldset className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label
                      className="text-sm font-medium text-base-content"
                      htmlFor="buyerName"
                    >
                      Buyer Name
                    </label>
                    <input
                      type="text"
                      name="buyerName"
                      id="buyerName"
                      defaultValue={user?.displayName ?? ""}
                      placeholder="Your Name"
                      autoComplete="on"
                      required
                      readOnly
                      className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <label
                      className="text-sm font-medium text-base-content"
                      htmlFor="buyerEmail"
                    >
                      Buyer Email
                    </label>
                    <input
                      type="email"
                      name="buyerEmail"
                      id="buyerEmail"
                      defaultValue={user?.email ?? ""}
                      placeholder="Your Email"
                      autoComplete="on"
                      required
                      readOnly
                      className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium text-base-content"
                    htmlFor="buyerImageURL"
                  >
                    Buyer Image URL
                  </label>
                  <input
                    type="text"
                    name="buyerImageURL"
                    id="buyerImageURL"
                    placeholder="https://example.com/picture.png"
                    defaultValue={user?.photoURL ?? ""}
                    autoComplete="on"
                    readOnly
                    className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium text-base-content"
                    htmlFor="price"
                  >
                    Place your Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Your Price"
                    autoComplete="on"
                    required
                    className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium text-base-content"
                    htmlFor="contact"
                  >
                    Contact Info
                  </label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="Your Contact"
                    autoComplete="on"
                    required
                    className="px-3 py-2 border border-[#E9E9E9] rounded focus:outline-[#E9E9E9]"
                  />
                </div>
              </fieldset>
              <button className="w-full px-8 py-2 btn-primary">
                Submit Bid
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </section>

      <section className="custom-container mx-auto my-20">
        <h2 className="text-4xl font-bold text-base-content mb-10">
          Bids For This Product:{" "}
          <span className="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
            {bids.length}
          </span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={bid.buyer_image} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>${bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
