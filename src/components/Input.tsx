interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: (e: any) => void;
}

export const Input: React.FC<InputProps> = ({ label, ...restProps }) => {
  const { required, name, value } = restProps;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-slate-600" htmlFor={name}>
          {label}
          {required && <span className="ml-2 text-red-600">*</span>}
        </label>
      )}
      <input
        id={name}
        className="p-3 shadow-sm  sm:text-sm border-slate-300 border rounded-md"
        {...restProps}
      />
    </div>
  );
};
