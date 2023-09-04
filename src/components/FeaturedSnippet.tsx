import { getCleanURL } from "../../lib/clean-url";
import { IFeaturedSnippet } from "../types";
import { FSFooter } from "./FSFooter";

interface FeaturedSnippetProps {
  snippet: IFeaturedSnippet;
  onClick: () => void;
}

export const FeaturedSnippet: React.FC<FeaturedSnippetProps> = ({
  snippet,
  onClick,
}) => {
  return (
    <div className="wrapper">
      <div className="snippet">
        <div className="snippet-content grid grid-cols-6 gap-4 pb-4">
          <p
            className={`pb-5 leading-6 text-base col-span-6
        `}
            dangerouslySetInnerHTML={{ __html: snippet?.text }}
          ></p>
        </div>
        <cite
          onClick={onClick}
          className="cursor-pointer text-gray-800 text-sm not-italic line-clamp-1"
        >
          {getCleanURL(snippet?.url)}
        </cite>
        <h3
          onClick={onClick}
          className="cursor-pointer text-xl font-normal pt-2 text-[#1a0dab] hover:underline"
          dangerouslySetInnerHTML={{ __html: snippet?.title }}
        />
      </div>
      <FSFooter />
    </div>
  );
};
