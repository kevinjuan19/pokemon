import { Route, Routes } from "react-router-dom";
import "./App.css";
import Page from "./page/Homepage";
import Location from "./page/Location";
import Pokemons from "./page/Pokemons";
import Login from "./page/Login";
import Fight from "./page/Fight";

function App() {
  // console.log(dataPokemon);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Page />} />
        <Route path="fight" element={<Fight />} />

        <Route path="location">
          <Route index element={<Location />} />
          <Route path=":id" element={<Pokemons />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
