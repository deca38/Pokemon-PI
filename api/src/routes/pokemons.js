const { Router } = require('express');
const {
  getAllPokemons, getDbPokemons, getPokemonByNameOrId, getApiType,
} = require('./calls');

const { Pokemon, Type } = require('../db');

const router = Router();


router.get('/', async (req, res) => {
  const { name } = req.query;
  // console.log(name)
  if (!name) {
    const totalPokemons = await getAllPokemons();
    totalPokemons ? res.status(200).json(totalPokemons) : res.status(404).json('No se encontraron Pokemons...');

  } else {

    try {
      const foundPokemon = await getPokemonByNameOrId(name.toLowerCase());

      if (foundPokemon) {
        return res.status(200).send([foundPokemon]);
      }
      const pokemonsDB = await getDbPokemons();
      const foundPokemonDB = await pokemonsDB.filter(
        (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase(),
      );
      return foundPokemonDB.length ? res.status(200).send(foundPokemonDB)
        : res.status(404).send('Pokemon no encontrado...');

    } catch (error) {
      console.log(error);
    }
  }
});


router.get('/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params;
  let foundPokemon;
  // si el id esta dentro del parametro del if, es porque se encuentra en la api
  if (idPokemon > 0 && idPokemon < 899 || idPokemon > 10000 && idPokemon < 10229) {
    const foundPokemon = await getPokemonByNameOrId(idPokemon);
    return foundPokemon ? res.status(200).send([foundPokemon])
      : res.status(404).send('Pokemon no encontrado...');
  }

// al no estar en la api el id entonces tendria que estar en el db
  const pokemonsDB = await getDbPokemons();
  if (!foundPokemon && idPokemon) {
    const pokemonDb = pokemonsDB.filter((pokemon) => pokemon.id === idPokemon);
    return pokemonDb.length ? res.status(200).send(pokemonDb)
      : res.status(404).send('Pokemon no encontrado...');
  }
});

router.post('/', async (req, res) => {
  const {
    name, img, hp, attack, defense, speed, height, weight, types,
  } = req.body;

 let exists = await Pokemon.findOne({
     where: {name}
 })
 if (exists) {
  return res.status(400).send('Ese pokemon ya existe...')

 }

  const newPokemon = await Pokemon.create({
    name, img, hp, attack, defense, speed, height, weight,
  });
  let typeDB = await Type.findAll({
    where: { name: types },
  });
  if (!typeDB.length) { // agrego este if para verificar y cargar los types si no están el la DB
    await getApiType();
    typeDB = await Type.findAll({
      where: { name: types },
    });
  }
  newPokemon.addType(typeDB);
  res.send('Pokemon creado');
});

module.exports = router;