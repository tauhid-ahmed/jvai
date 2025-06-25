import { useId, useState } from "react";
import { cn } from "../lib/utils";

type InputProps = {
  label: string;
} & React.ComponentProps<"input">;

export default function Input({ label, className, ...props }: InputProps) {
  const id = useId();
  return (
    <label className="space-y-1 block text-sm" htmlFor={id}>
      <span className="block text-grey-400">{label}</span>
      <input
        className={cn(
          "rounded border border-grey-300 shadow-2xs w-full px-3 py-1.5 text-sm",
          className
        )}
        id={id}
        {...props}
      />
    </label>
  );
}
