import { useState } from "react";

import type { Unit } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UnitDropDown = () => {
  const [unit, setUnit] = useState<Unit>("metric");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 cursor-pointer rounded-full border-slate-200 p-0 hover:bg-slate-200 hover:text-white dark:border-slate-800 dark:hover:bg-slate-700 dark:hover:text-white"
        >
          {unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K"}
          <span className="sr-only">Temp unit</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="items-center text-xs font-bold text-gray-300">
          Weather Units
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={unit}
          onValueChange={(value) => setUnit(value as Unit)}
        >
          <DropdownMenuRadioItem value="metric">
            Metric (°C)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="imperial">
            Imperial (°F)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="standard">
            Standard (K)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnitDropDown;
