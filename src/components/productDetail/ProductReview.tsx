import React, { useState } from "react";
import coment1 from "../../assets/coment1.jpg";
import coment2 from "../../assets/coment2.jpg";
import coment3 from "../../assets/coment3.jpg";
import coment4 from "../../assets/coment4.jpg";
import coment5 from "../../assets/coment5.jpg";
import StarIcon from "../../assets/star.svg";

interface Review {
  id: number;
  name: string;
  text: string;
  avatar: string;
}

const ProductReviews: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sofia Harvetz",
      text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.",
      avatar: coment1,
    },
    {
      id: 2,
      name: "Nicolas Jensen",
      text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.",
      avatar: coment2,
    },
    {
      id: 3,
      name: "Nicolas Jensen",
      text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.",
      avatar: coment3,
    },
    {
      id: 4,
      name: "Nicolas Jensen",
      text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.",
      avatar: coment4,
    },
    {
      id: 5,
      name: "Nicolas Jensen",
      text: "I bought it 3 weeks ago and now come back just to say 'Awesome Product'. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.",
      avatar: coment5,
    },
  ];


  return (
    <div className="w-full">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">11 Reviews</h2>
        <div className="text-gray-600 font-medium  border-2 p-1 rounded-lg cursor-pointer">
          Newest
        </div>
      </div>

        <div className="space-y-6">
          {(showAll ? reviews : reviews.slice(0, 3)).map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex space-x-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex space-x-1">
                      <img src={StarIcon} alt="star" className="w-4 h-4" />
                      <img src={StarIcon} alt="star" className="w-4 h-4" />
                      <img src={StarIcon} alt="star" className="w-4 h-4" />
                      <img src={StarIcon} alt="star" className="w-4 h-4" />
                      <img src={StarIcon} alt="star" className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="mb-3">{review.text}</p>
                  <div className="flex space-x-4">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

        {!showAll && (
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
