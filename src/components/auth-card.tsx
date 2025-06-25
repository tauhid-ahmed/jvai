import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Logo } from "./logo";

type AuthCardProps = {
  title: string;
  subtitle: string;
  backLink: string;
  backLinkName?: string;
  backLinkMessage?: string;
  footer?: React.ReactNode;
} & React.ComponentProps<"div">;

export default function AuthCard({
  title,
  subtitle,
  backLink,
  backLinkMessage,
  className,
  children,
  backLinkName,
  footer,
}: AuthCardProps) {
  return (
    <div className={cn("space-y-6 max-w-md w-full mx-auto px-4", className)}>
      <div className="flex justify-center py-6">
        <Logo size="sm" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-4xl text-grey-900 font-bold">{title}</h2>
        <p className="text-grey-500 text-sm">{subtitle}</p>
      </div>
      {children}
      {!footer ? (
        <div className="flex items-center justify-center">
          <span className="text-sm text-grey-400">{backLinkMessage}</span>
          <Button asChild variant="link" className="text-blue-200">
            <Link to={backLink}>{backLinkName}</Link>
          </Button>
        </div>
      ) : (
        footer
      )}
    </div>
  );
}
