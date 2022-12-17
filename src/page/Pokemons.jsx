import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pilih } from "../component/Chosen";
import { ListPokemon } from "../component/PokemonList";
import {
  Button,
  Image,
  Terpilih,
  Paragraf,
  ListItem,
} from "../component/Other";

function Pokemons() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("bulbasaur");
  const [gambar, setGambar] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
  );

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (idLocation) => {
    const req = await fetch(
      `https://pokeapi.co/api/v2/location-area/${idLocation}`
    );
    const res = await req.json();

    const pokemonList = res.pokemon_encounters.map(async (el) => {
      const url = el.pokemon.url;
      const request = await fetch(url);
      const response = await request.json();
      return response;
    });

    setData(await Promise.all(pokemonList));
    setLoading(false);
    // console.log(await Promise.all(pokemonList));
  };

  const pokemons = data.map((el) => {
    return {
      name: el.name,
      imageUrl: el.sprites.other.dream_world.front_default,
    };
  });

  //   console.log({ data });
  const pilihPokemon = (name, gbr) => {
    setNama(name);
    setGambar(gbr);
    localStorage.setItem("enemy-pokemon", name);
  };

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <>
          <Pilih>
            <Terpilih url={gambar} />
            <Paragraf kalimat={nama} />
          </Pilih>

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
      )}
    </>
  );
}

export default Pokemons;
