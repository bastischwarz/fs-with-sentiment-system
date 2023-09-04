interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  onChange?: (e: any) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  children,
  ...restProps
}) => {
  const { value, name, required } = restProps;

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-slate-600" htmlFor={name}>
        {label}
        {required && <span className="ml-2 text-red-600">*</span>}
      </label>
      <select
        id={name}
        className="p-3 shadow-sm pr-12 sm:text-sm border-slate-300 rounded-md"
        value={value}
        {...restProps}
      >
        {children}
      </select>
    </div>
  );
};
