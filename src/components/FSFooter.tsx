import SearchIcon from "../assets/search-icon.svg";
import FeedbackIcon from "../assets/feedback-icon.svg";

export const FSFooter = () => {
  return (
    <div className="text-[12px] text-[#70757a] gap-4 flex relative items-center justify-between mt-4">
      <div className="h-1 w-full border-b-[1px] borer-[#dadce0]"></div>
      <div className="buttons flex w-[450px] gap-3">
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 inline-block">
            <SearchIcon />
          </span>{" "}
          About featured snippets
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 inline-block">
            <FeedbackIcon />
          </span>{" "}
          Feedback
        </div>
      </div>
    </div>
  );
};
