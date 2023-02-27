import Link from "next/link";
import clsx from "clsx";
import Button from "@/models/Button";
import ButtonLink from "@/models/ButtonLink";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solidSlate:
    "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
  solidBlue:
    "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
  solidWhite:
    "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
  outlineSlate:
    "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
  outlineWhite:
    "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
};

export function Button({ variant = "solid", color = "solidSlate", className, ...props }: Button) {
  return (
    <button
      className={clsx(
        baseStyles[variant as keyof typeof baseStyles],
        variantStyles[color as keyof typeof variantStyles],
        className
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "solid",
  color = "solidSlate",
  href,
  className,
  ...props
}: ButtonLink) {
  return (
    <Link href={href} legacyBehavior>
      <a
        className={clsx(
          baseStyles[variant as keyof typeof baseStyles],
          variantStyles[color as keyof typeof variantStyles],
          className
        )}
        {...props}
      />
    </Link>
  );
}
