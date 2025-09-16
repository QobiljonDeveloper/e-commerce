import { memo, type FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface ITitleProps {
  text: string;
  link: string;
}

const Title: FC<ITitleProps> = ({ text, link }) => {
  const words = text.split(" ");

  return (
    <div className="w-full flex justify-between items-end">
      <h2 className="text-[40px] font-medium leading-tight">
        {words.map((word, i) => (
          <span key={i} className="block">
            {word}
          </span>
        ))}
      </h2>

      <a
        href={`/${link}`}
        className="flex items-center gap-2 text-sy text-[16px] border-b"
      >
        <span>More articles</span>
        <FaArrowRightLong />
      </a>
    </div>
  );
};

export default memo(Title);
