import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MapPinnedIcon, Search } from "lucide-react";

import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogSeparator,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getCityCoordinates, getCityWeather } from "@/api/weatherService";
import { useWeather } from "@/hooks/useWeather";

const SearchBar = () => {
  const { setCurrentWeather } = useWeather();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    // Implement search functionality here, e.g., fetch weather data based on searchQuery
    const fetchWeather = async () => {
      try {
        const response = await getCityCoordinates(searchQuery);
        console.log(response);
        setWeather(response);
      } catch (error) {
        console.error("Error fetching city coordinates:", error);
      }
    };

    if (searchQuery) {
      fetchWeather();
    }
  }, [searchQuery]);

  const handleLocationSelect = async (lat: number, lon: number) => {
    try {
      // Implement logic to fetch and display weather data for the selected location, e.g., using the lat and lon to fetch weather data from an API

      const response = await getCityWeather(lat, lon);

      setCurrentWeather(response);

      setSearchDialogOpen(false);
      setSearchQuery(" ");
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  useEffect(() => {
    const handleControlK = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleControlK);

    return () => {
      window.removeEventListener("keydown", handleControlK);
    };
  });

  return (
    <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <DialogTrigger asChild>
        <div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <InputGroup className="hidden md:flex md:max-w-xs">
            <InputGroupInput placeholder="Search..." />

            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </DialogTrigger>

      <DialogContent
        className="flex h-100 flex-col overflow-hidden sm:max-w-sm"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search Weather</DialogTitle>
        <div className="relative flex flex-row items-center justify-center gap-4">
          <InputGroupInput
            placeholder="Search Places..."
            className="relative rounded-md border-2 px-4 py-2 pl-8 text-sm text-slate-300 dark:border-0 dark:bg-slate-500/50"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <InputGroupAddon className="absolute left-0">
            <Search className="h-5 w-5 text-slate-300" />
          </InputGroupAddon>
        </div>

        <DialogSeparator className="my-1" />

        <DialogDescription asChild className="overflow-y-auto">
          <div className="flex flex-col">
            {!weather.length ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-400">
                  {searchQuery
                    ? "No results found"
                    : "Start typing to search..."}
                </p>
              </div>
            ) : (
              weather.map(({ name, lat, lon, country, state }) => (
                <button
                  onClick={() => handleLocationSelect(lat, lon)}
                  key={lat + lon}
                  className="flex w-full flex-row items-center justify-between px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-slate-400">
                      {state ? `${state}, ` : ""}
                      {country}
                    </span>
                  </div>

                  <MapPinnedIcon className="h-4 w-4 text-slate-400" />
                </button>
              ))
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
