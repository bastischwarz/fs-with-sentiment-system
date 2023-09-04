import { ReactNode } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: any) => void;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
  isLoading,
  ...restProps
}) => {
  return (
    <button
      className={`cursor-pointer inline-flex items-center bg-orange-200 hover:bg-orange-300 text-black font-normal py-2 px-4 rounded ${className} ${
        disabled && "cursor-not-allowed bg-slate-400"
      }`}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {isLoading ? (
        <>
          <Spinner /> Loading...{" "}
        </>
      ) : (
        children
      )}
    </button>
  );
};
