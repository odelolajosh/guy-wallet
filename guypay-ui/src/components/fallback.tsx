import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

export const Fallback = (props: React.HTMLProps<HTMLDivElement>) => (
  <div {...props} className={cn("h-full w-full flex items-center justify-center", props.className)}>
    <Spinner />
  </div>
);
