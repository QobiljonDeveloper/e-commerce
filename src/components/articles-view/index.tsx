import { memo } from "react";
import Title from "../title";
import article1 from "../../assets/article1.png";
import article2 from "../../assets/article2.png";
import article3 from "../../assets/article3.png";
import { FaArrowRightLong } from "react-icons/fa6";

const articles = [
  {
    id: 1,
    title: "7 ways to decor your home",
    image: article1,
    link: "/blog/1",
  },
  {
    id: 2,
    title: "Kitchen organization",
    image: article2,
    link: "/blog/2",
  },
  {
    id: 3,
    title: "Decor your bedroom",
    image: article3,
    link: "/blog/3",
  },
];

const ArticlesView = () => {
  return (
    <div className=" container w-full py-20">
      <div className="mb-10">
        <Title text="Articles" link="blog" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <a
            href={article.link}
            key={article.id}
            className="w-full flex flex-col overflow-hidden"
          >
            <div className="w-full h-[325px] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition"
              />
            </div>

            <div className="py-6 flex flex-col gap-3 flex-1">
              <h5 className="text-lg font-semibold text-[#121212] line-clamp-2">
                {article.title}
              </h5>
              <div className="flex items-center gap-2 text-sy font-medium text-sm">
                <span>Read More</span>
                <FaArrowRightLong />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default memo(ArticlesView);
