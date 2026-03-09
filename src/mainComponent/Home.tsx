import MapCard from "@/components/MapCard";
import WeatherCard from "@/components/WeatherCard";

const Home = () => {
  return (
    <div className="grid h-full gap-5 p-4 text-white lg:grid-cols-2">
      <WeatherCard />
      <MapCard />
    </div>
  );
};

export default Home;
