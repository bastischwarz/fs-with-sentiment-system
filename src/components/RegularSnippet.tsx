import { getCleanURL } from "../../lib/clean-url";
import { trimm } from "../../lib/trimm";
import { IRegularSnippet } from "../types";

interface RegularSnippetProps {
  snippet: IRegularSnippet;
  onClick: () => void;
}

export const RegularSnippet: React.FC<RegularSnippetProps> = ({
  snippet,
  onClick,
}) => {
  return (
    <div>
      <cite
        onClick={onClick}
        className="cursor-pointer text-gray-800 text-sm not-italic line-clamp-1"
      >
        {getCleanURL(snippet?.url)}
      </cite>
      <h3
        onClick={onClick}
        className="cursor-pointer text-xl font-normal pt-1 pb-1 text-[#1a0dab] hover:underline"
        dangerouslySetInnerHTML={{ __html: trimm(snippet?.title, 75) }}
      />
      <p
        className="leading-6 text-sm text-[#4d5156] line-clamp-2"
        dangerouslySetInnerHTML={{ __html: snippet?.text }}
      />
    </div>
  );
};
