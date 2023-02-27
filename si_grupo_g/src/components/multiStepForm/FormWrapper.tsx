import { ReactNode } from "react";

type FormWrapperProps = {
  title?: string;
  hasColumn?: boolean;
  children: ReactNode;
};

export function FormWrapper({ title = "", hasColumn = true, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-center m-0 mb-4 text-xl font-semibold">{title}</h2>
      <div className={hasColumn ? "grid grid-cols-2 gap-4" : ""}>{children}</div>
    </>
  );
}
