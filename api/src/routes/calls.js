const axios = require('axios');
const { Pokemon, Type } = require('../db');

const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=40';
const URL_API_NAME_OR_ID = 'https://pokeapi.co/api/v2/pokemon/';
const URL_API_TYPE = 'https://pokeapi.co/api/v2/type';


// Llamada a la api
const getApiPokemons = async () => {
    try {
      const apiPokemons = [];
      const pokemonRequest = await axios.get(URL_API_POKEMON);
      const urlPokemonSubrequest = pokemonRequest.data.results.map((p) =>p.url);
      // console.log(urlPokemonSubrequest);
      const infoApiPokemons = await axios.all(urlPokemonSubrequest.map(urlPokemonSubrequest => axios.get(urlPokemonSubrequest)))
      for (let i = 0; i < urlPokemonSubrequest.length; i++){
        const foundPokemons = infoApiPokemons[i].data;
        apiPokemons.push({
          id: foundPokemons.id,
          name: foundPokemons.name,
          img: foundPokemons.sprites.other.dream_world.front_default,
          hp: foundPokemons.stats[0].base_stat,
          attack: foundPokemons.stats[1].base_stat,
          defense: foundPokemons.stats[2].base_stat,
          speed: foundPokemons.stats[5].base_stat,
          height: foundPokemons.height,
          weight: foundPokemons.weight,
          createdInDb: false,
          types: foundPokemons.types.map((t) => t.type.name)
        })
      }
      return apiPokemons;
    } catch (error) {
      console.log(error);
    }
    
    
}  


//Llamada a la db de pokemons
const getDbPokemons = async () => {
  const pokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
    },
  });
  const pokemonDb = pokemonsDb.map((pokemon) => {
    const result = pokemon.toJSON();
    return {
      ...result,
      types: result.types.map((type) => type.name),
    };
  });
  return pokemonDb;
};


//todos los pokemons (api+db)

const getAllPokemons = async () => {
  try {
    const apiPokemons = await getApiPokemons();
    const dbPokemons = await getDbPokemons();
    return [...apiPokemons, ...dbPokemons];
  } catch (error) {
    console.log(error);
  }
};



//en el caso de no tener nombre o id
const getPokemonByNameOrId = async (id, name) => {
  if (id && !name) {
    try {
      const apiPokemon = await axios.get(`${URL_API_NAME_OR_ID}${id}`);
      const foundPokemon = apiPokemon.data;
      const pokemon = {
        id: foundPokemon.id,
        name: foundPokemon.name,
        img: foundPokemon.sprites.other.dream_world.front_default,
        hp: foundPokemon.stats[0].base_stat,
        attack: foundPokemon.stats[1].base_stat,
        defense: foundPokemon.stats[2].base_stat,
        speed: foundPokemon.stats[5].base_stat,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        types: foundPokemon.types.map((t) => t.type.name),
      };
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
  if (!id && name) {
    try {
      const apiPokemon = await axios.get(`${URL_API_NAME_OR_ID}${name}`);
      const foundPokemon = apiPokemon.data;
      const pokemon = {
        id: foundPokemon.id,
        name: foundPokemon.name,
        img: foundPokemon.sprites.other.dream_world.front_default,
        hp: foundPokemon.stats[0].base_stat,
        attack: foundPokemon.stats[1].base_stat,
        defense: foundPokemon.stats[2].base_stat,
        speed: foundPokemon.stats[5].base_stat,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        types: foundPokemon.types.map((t) => t.type.name),
      };
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
};
//llamada a tipos en api

const getApiType = async () => {
  const typeApi = await axios.get(URL_API_TYPE);
  const types = typeApi.data.results;
  types.forEach((type) => {
    Type.findOrCreate({
      where: { name: type.name },
    });
  });
  const allTypes = await Type.findAll();
  return allTypes;
};



module.exports = {
  getAllPokemons,
  getDbPokemons,
  getPokemonByNameOrId,
  getApiType,
};
