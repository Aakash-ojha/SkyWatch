import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import Theme from "@/components/Theme";
import UnitDropDown from "@/components/UnitDropDown";

const TopAppBar = () => {
  return (
    <div className="flex h-16 flex-row items-center justify-between border-b border-slate-700 px-8 lg:my-4">
      <div className="flex flex-row items-center justify-center gap-5 md:gap-15">
        <Logo />
        <SearchBar />
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <UnitDropDown />
        <Theme />
      </div>
    </div>
  );
};

export default TopAppBar;
