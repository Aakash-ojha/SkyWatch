import TopAppBar from "@/mainComponent/TopAppBar";
import Home from "./mainComponent/Home";
import CurrentLocation from "./mainComponent/CurrentLocation";

const App = () => {
  return (
    <div>
      <TopAppBar />
      <CurrentLocation />
      <Home />
    </div>
  );
};

export default App;
