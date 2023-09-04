import { useScroll } from "../hooks/useScroll";
import { SearchLogo } from "./SearchLogo";

interface SearchHeaderProps {
  query: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ query }) => {
  const scroll = useScroll();
  const isScrolled = scroll >= 30;

  return (
    // create google search header
    <div
      className={` transition-all border px-6 flex items-center w-full gap-16 top-[44px] bg-white z-10 ${
        isScrolled ? "shadow-lg py-2 fixed" : "py-4 sticky"
      }`}
    >
      <SearchLogo />
      <div
        className={`input-wrapper rounded-3xl max-w-[652px] w-full overflow-hidden flex items-center ${
          isScrolled ? "border py-0" : "p-2 shadow-md"
        }`}
      >
        <input
          type="text"
          defaultValue={query}
          className="border-0 flex items-center w-full rounded-full"
          disabled
        />
      </div>
    </div>
  );
};
