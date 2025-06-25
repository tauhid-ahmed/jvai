import { cn } from "../../../lib/utils";

type SectionProps = {} & React.ComponentProps<"section">;

export default function Section({
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative py-10 md:py-14 lg:py-20 w-full", className)}
      {...props}
    >
      {children}
    </section>
  );
}
