import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "quiet";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  quiet: "btn-quiet",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Props) {
  const classes = cn("btn", variants[variant], size === "lg" && "btn-lg", className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export function Tag({
  tone = "inc",
  children,
  className,
}: {
  tone?: "free" | "inc";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("tag", tone === "free" ? "tag-free" : "tag-inc", className)}>
      {children}
    </span>
  );
}
