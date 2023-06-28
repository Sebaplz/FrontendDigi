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
        {/* <AiOutlineArrowUp className="absolute bottom-0 right-0 rounded-full bg-slate-500 text-5xl" /> */}
      </main>
    </>
  );
}

export default App;
