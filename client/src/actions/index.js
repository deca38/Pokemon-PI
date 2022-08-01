import axios from 'axios';
// import Swal from "sweetalert2";

export function getPokemons(){
    return async function(dispatch){
        const pokemons = await axios.get('http://localhost:3001/pokemons');
        // console.log('Action getPokemons (API + DB)--->', pokemons.data)
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        const types = await axios.get('http://localhost:3001/types');
        // console.log('Action getTypes (API o DB)--->', types.data)
        return dispatch({
            type: 'GET_TYPES',
            payload: types.data
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        try{
            await axios.post('http://localhost:3001/pokemons', payload);
            return dispatch({
                type: 'POST_POKEMON',
            })
        } catch(error) {
            console.log(error)
        }
    }
}


export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByStrength(payload){
    return{
        type: 'ORDER_BY_STRENGTH',
        payload
    }
}

export function filterByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterByOrigin(payload){
    return{
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function getPokemonByName(name){
    return async function(dispatch){
        try{
            let pokemon = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch({
                type: 'GET_POKEMON_BY_NAME',
                payload: pokemon.data
            })
        } catch (error) {
           
            alert('No hay un pokemon con ese nombre')
            console.log(error);
        }
    }
}

export function getPokemonBySearchId(searchId){
    return async function(dispatch){
        try{
            let pokemonById = await axios.get('http://localhost:3001/pokemons/' + searchId);
            return dispatch({
                type: 'GET_POKEMON_BY_ID',
                payload: pokemonById.data
            })
        } catch (error) {
            
            alert('No hay un pokemon con ese ID')
            console.log(error);
        }
    }
}

export function getDetails(id){
    return async function(dispatch){
        try{
            let pokemon = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function removeDetails(){
    return{
        type: 'REMOVE_DETAILS',
    }
}

export function restore(){
    return{
        type: 'RESTORE',
    }
}

export function removeCard(payload){
    return{
        type: 'REMOVE_CARD',
        payload
    }
}
