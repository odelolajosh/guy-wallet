import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Theme, useTheme } from "@/hooks/use-theme";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

export const SwitchThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {theme === Theme.LIGHT ? <Sun className="w-5 h-5" /> : theme === Theme.DARK ? <Moon className="w-5 h-5" /> : <LaptopMinimal className="w-5 h-5" />}
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
}