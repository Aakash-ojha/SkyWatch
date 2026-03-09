import logo from "@/assets/logo.svg";

const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <img src={logo} alt="Logo" className="h-6 w-6" />
      <p className="text-lg font-bold">WeatherApp</p>
    </div>
  );
};

export default Logo;
