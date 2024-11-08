import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { forwardRef } from "react";

export const Fallback = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} className={cn("h-full w-full flex items-center justify-center", props.className)}>
    <Spinner />
  </div>
));
