import { cn } from "../../../lib/utils";

type ContainerProps = {
  size?: "sm" | "default";
} & React.ComponentProps<"div">;

export default function Container({
  size = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-gutter mx-auto",
        size === "sm" && "max-w-5xl",
        size === "default" && "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
