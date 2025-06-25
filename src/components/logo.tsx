import { cn } from "../lib/utils";

function LogoContainer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="absolute inset-0" viewBox="0 0 100 100" {...props}>
      <path
        d="M20 40c0-15 20-25 30-25s30 10 30 25c0 10-10 20-20 25 10 5 20 15 20 25 0 15-20 25-30 25s-30-10-30-25c0-10 10-20 20-25-10-5-20-15-20-25z"
        fill="none"
        stroke="#60a5fa"
        strokeWidth={2}
      />
    </svg>
  );
}

function LogoLines(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="absolute inset-0 animate-glow"
      viewBox="0 0 100 100"
      {...props}
    >
      <path
        d="M35 40h30m-15 0v40M35 60h30M25 50h50"
        stroke="#93c5fd"
        strokeWidth={1.5}
        fill="none"
      />
      <circle cx={35} cy={80} r={2} fill="#93c5fd" />
      <circle cx={65} cy={80} r={2} fill="#93c5fd" />
    </svg>
  );
}

export function Logo({ size }: { size: "sm" | "lg" }) {
  return (
    <div
      className={cn(
        "relative",
        size === "sm" && "size-8.5",
        size === "lg" && "size-30"
      )}
    >
      <LogoContainer />
      <LogoLines />
    </div>
  );
}
