import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Skeletons } from "../components/Skeletons";
import { useNavigate } from "react-router-dom";
import { nameFirstLetter } from "../utils";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 0; i < 151; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((err) => console.log(err));
  };

  const searchPokemons = (name) => {
    var nameToLower = name.toLowerCase();
    var searchedPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(nameToLower)) {
        searchedPokemons.push(pokemons[i]);
      }
    }
    setPokemons(searchedPokemons);
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  return (
    <div>
      <div>
        <Navbar searchPokemons={searchPokemons} />
        <Container maxWidth="false">
          <Grid container spacing={3}>
            {pokemons.length === 0 ? (
              <Skeletons />
            ) : (
              pokemons.map((pokemon, key) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                  <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                    <PokemonCard
                      name={nameFirstLetter(pokemon.data)}
                      image={pokemon.data.sprites.front_default}
                      types={pokemon.data.types}
                    />
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </div>
    </div>
  );
};
