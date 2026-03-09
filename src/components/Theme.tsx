import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { SunIcon, MoonIcon } from "lucide-react";

const Theme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 cursor-pointer rounded-full border-slate-200 p-0 hover:bg-slate-200 hover:text-white dark:border-slate-800 dark:hover:bg-slate-700 dark:hover:text-white"
        >
          <SunIcon className="scale-100 rotate-0 transition-all hover:text-slate-900 dark:scale-0 dark:-rotate-90" />

          <MoonIcon className="absolute scale-0 rotate-90 transition-all hover:text-slate-900 dark:scale-100 dark:rotate-0" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="items-center text-xs font-bold text-gray-300">
          Select Theme
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;
