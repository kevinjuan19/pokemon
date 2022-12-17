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
// import Data from './data';
const Page = () => {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("bulbasaur");
  const [gambar, setGambar] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
  );
  const [next, setNext] = useState(1);

  const fetchData = async (page) => {
    const offset = (page - 1) * 20;
    const req = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
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
      imageUrl: el.sprites.other.dream_world.front_default,
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

  const pilihPokemon = (name, gbr) => {
    setNama(name);
    setGambar(gbr);
    localStorage.setItem("my-pokemon", name);
  };
  return (
    <>
      <Pilih>
        <Terpilih url={gambar} />
        <Paragraf kalimat={nama} />
      </Pilih>
      <button
        className="rounded bg-indigo-500 text-white p-4 w-full"
        onClick={moveTo}
      >
        Next
      </button>
      <ListPokemon>
        {pokemons.map((el) => {
          return (
            <ListItem key={el.name}>
              <Paragraf kalimat={el.name} />
              <Image url={el.imageUrl} />
              <Button
                terpilih={() => {
                  pilihPokemon(el.name, el.imageUrl);
                  // setNama(el.name);
                  // setGambar(el.imageUrl);
                }}
                kalimat="Pilih Pokemon"
              />
            </ListItem>
          );
        })}
      </ListPokemon>
    </>
  );
};

export default Page;
