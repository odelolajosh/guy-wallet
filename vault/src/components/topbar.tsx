import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogout, useUser } from "@/lib/auth";
import { SwitchThemeButton } from "./switch-theme";

export const Topbar = () => {
  const { data: user } = useUser();
  const logoutMutation = useLogout();

  return (
    <nav className="sticky top-0 bg-background h-16 border-b border-border">
      <div className="max-w-8xl mx-auto h-full relative flex items-center px-4 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-primary">Guypay</Link>

        <div className="ml-auto flex items-center gap-6">
          <SwitchThemeButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[8rem] w-56">
              <DropdownMenuLabel className="space-y-1">
                <h3 className="text-base font-medium leading-none">{user.name}</h3>
                <p className="text-sm font-normal leading-none text-muted-foreground">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => {
                logoutMutation.mutate();
              }}>
                {/* {logoutMutation.status === 'pending' && <Spinner className="w-4 h-4 mr-2 text-primary-foreground" />} */}
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}