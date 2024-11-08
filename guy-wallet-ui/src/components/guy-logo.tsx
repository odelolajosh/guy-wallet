import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const logoVariants = cva(
  "flex items-center gap-2",
  {
    variants: {
      size: {
        default: "[&_svg]:h-6 [&_svg]:w-6 [&_span]:text-base",
        lg: "[&_svg]:h-8 [&_svg]:w-8 [&_span]:text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    }
  }
)

interface GuyLogoProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof logoVariants> {
  showText?: boolean
}

export const GuyLogo = forwardRef<HTMLDivElement, GuyLogoProps>(
  ({ className, showText, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn(logoVariants({ className }))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* // A simple smiley emoji but this one smirks */}
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" transform="rotate(10 12 12)" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        {showText && <span>Guy</span>}
      </div>
    );
  }
);
