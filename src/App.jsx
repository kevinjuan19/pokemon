import { Route, Routes } from "react-router-dom";
import "./App.css";
import Page from "./page/Homepage";
import Location from "./page/Location";
import Pokemons from "./page/Pokemons";

function App() {
  // console.log(dataPokemon);

  return (
    <>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="location">
          <Route index element={<Location />} />
          <Route path=":id" element={<Pokemons />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
