interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${className} max-w-4xl py-20 mx-auto text-slate-700 px-2`}>
      {children}
    </div>
  );
};
