import React, { useState, useEffect } from "react";
import StarIcon from "../../assets/star.svg";
import axios from "axios";

const ProductReviews: React.FC = () => {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/1")
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {reviews.length} Reviews
        </h2>
        <div className="text-gray-600 font-medium border-2 p-1 rounded-lg cursor-pointer">
          Newest
        </div>
      </div>

      <div className="space-y-6">
        {(showAll ? reviews : reviews.slice(0, 3)).map((review: any) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex space-x-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{review.reviewerName}</h3>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <img
                        key={i}
                        src={StarIcon}
                        alt="star"
                        className={`w-4 h-4 ${
                          i < review.rating ? "opacity-100" : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mb-3">{review.comment}</p>
                <div className="flex space-x-4">
                  <button>Like</button>
                  <button>Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && reviews.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 border border-gray-300 rounded-4xl"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
