import "./App.css";
import Digimones from "./components/Digimones";
import Nav from "./components/Nav";
import Search from "./components/Search";

function App() {
  return (
    <>
      <Nav />
      <Search />
      <main className="mx-auto">
        <Digimones />
      </main>
    </>
  );
}

export default App;
