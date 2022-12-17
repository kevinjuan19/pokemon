import { Pilih } from "../component/Chosen";
import { ListPokemon } from "../component/PokemonList";
import {
  Button,
  Image,
  Terpilih,
  Paragraf,
  ListItem,
} from "../component/Other";
import { dataPokemon } from "../data";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Data from './data';
const Location = () => {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("bulbasaur");
  const [next, setNext] = useState(1);

  const navigate = useNavigate();

  const fetchData = async (page) => {
    const offset = (page - 1) * 20;
    const req = await fetch(
      `https://pokeapi.co/api/v2/location-area?offset=${offset}&limit=20`
    );
    const res = await req.json();
    const pokemonList = res.results.map(async (el) => {
      const listUrl = el.url;
      const request = await fetch(listUrl);
      const response = await request.json();
      return response;
    });
    setData(await Promise.all(pokemonList));
  };

  useEffect(() => {
    fetchData(next);
  }, [next]);
  // console.log(data);

  const pokemons = data.map((el) => {
    return {
      name: el.name,
    };
  });
  // useEffect(() => {
  //   console.log(pokemons);
  // }, [pokemons]);

  const moveTo = () => {
    setNext((prev) => {
      return prev + 1;
    });
  };
  return (
    <>
      <Pilih>
        <Paragraf kalimat={nama} />
      </Pilih>
      <button
        className="rounded bg-indigo-500 text-white p-4 w-full"
        onClick={moveTo}
      >
        Next
      </button>
      <ListPokemon>
        {pokemons.map((el, i) => {
          return (
            <ListItem key={el.name}>
              <Paragraf kalimat={el.name} />
              <Button
                terpilih={() => {
                  setNama(el.name);
                  navigate(`/location/${i + 1}`);
                }}
                kalimat="Pilih Location"
              />
            </ListItem>
          );
        })}
      </ListPokemon>
    </>
  );
};

export default Location;
