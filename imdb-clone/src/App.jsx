import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";

function App() {
  return (
    <>
      <Navbar />

      <Movies />

      <WatchList />
    </>
  );
}

export default App;
