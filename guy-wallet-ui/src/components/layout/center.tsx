import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Center = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <section ref={ref} {...props} className={cn("container mx-auto min-h-screen w-screen relative flex flex-col items-center justify-center md:justify-normal md:pt-[15%] px-4 lg:px-8", props.className)}>
      {children}
    </section>
  )
});
