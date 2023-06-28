import "./App.css";
import Digimon from "./components/Digimon";
import Nav from "./components/Nav";
import Search from "./components/Search";
import { AiOutlineArrowUp } from "react-icons/ai";

function App() {
  return (
    <>
      <Nav />
      <Search />
      <main className="mx-auto">
        <Digimon />
      </main>
    </>
  );
}

export default App;
