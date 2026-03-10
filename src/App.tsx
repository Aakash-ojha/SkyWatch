import TopAppBar from "@/mainComponent/TopAppBar";
import Home from "./mainComponent/Home";
import CurrentLocation from "./mainComponent/CurrentLocation";
// import ForecastSection from "./chart/ForecastSection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <TopAppBar />
      <CurrentLocation />
      <Home />
      {/* <ForecastSection /> */}

      <Footer />
    </div>
  );
};

export default App;
