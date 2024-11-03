import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Theme, useTheme } from "@/hooks/use-theme";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const SwitchThemeButton = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>((props, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" ref={ref} {...props} className={cn("justify-start p-2 gap-2", props.className)}>
          {theme === Theme.LIGHT ? <Sun className="w-5 h-5" /> : theme === Theme.DARK ? <Moon className="w-5 h-5" /> : <LaptopMinimal className="w-5 h-5" />}
          {theme === Theme.LIGHT ? "Light" : theme === Theme.DARK ? "Dark" : "System"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === Theme.LIGHT}
          onCheckedChange={() => setTheme(Theme.LIGHT)}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === Theme.DARK}
          onCheckedChange={() => setTheme(Theme.DARK)}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === Theme.SYSTEM}
          onCheckedChange={() => setTheme(Theme.SYSTEM)}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})