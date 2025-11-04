import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [myBids, setMyBids] = useState([]);

  console.log(myBids);

  useEffect(() => {
    if (user.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyBids(data);
        })
        .catch((error) => console.error(error.message));
    }
  }, [user]);

  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingBids = myBids.filter((bid) => bid._id !== _id);

              setMyBids(remainingBids);

              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error(error.message));
      }
    });
  };

  return (
    <section className="custom-container mx-auto my-20">
      <h2 className="text-4xl font-bold text-base-content text-center mb-10">
        My Bids:{" "}
        <span className="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
          {myBids.length}
        </span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myBids.map((bid, index) => (
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
                <td>
                  <div className="badge badge-warning">{bid.status} </div>
                </td>
                <th>
                  <button
                    onClick={() => handleRemoveBid(bid._id)}
                    className="btn btn-outline btn-error btn-xs"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBids;
