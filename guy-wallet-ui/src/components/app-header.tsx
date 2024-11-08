import { forwardRef } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";

export const AppHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <header ref={ref} {...props} className={cn("px-6 py-4 bg-sidebar text-sidebar-foreground border-b", props.className)}>
    <SidebarTrigger />
  </header>
));