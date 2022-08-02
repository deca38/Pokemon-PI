// import Swal from "sweetalert2";

const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    addedPokemons: [],
    types: [],
    details: [],
}

function rootReducer (state=initialState, action) {

    switch(action.type) {

        case 'GET_POKEMONS':
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }
        
        case 'ORDER_BY_NAME':
            let sortedNames = action.payload === 'asc' ?
            state.allPokemons.sort(function (a,b){
            if (a.name > b.name){
                return 1;}
            if (b.name > a.name){
                return -1;}
                return 0;
            }) : 
            state.allPokemons.sort(function (a,b){
            if (a.name > b.name){
                return -1;}
            if (b.name > a.name){
                return 1;}
                return 0; 
            })
            return{
                ...state, 
                allPokemons: sortedNames
            }
        case 'ORDER_BY_STRENGTH':
            let sortedStrength = action.payload === 'strongest' ?
            state.allPokemons.sort(function (a,b){
                if (a.attack > b.attack){
                    return -1;}
                if (b.attack > a.attack){
                    return 1;}
                    return 0;
            }) :
            state.allPokemons.sort(function (a,b){
                if (a.attack > b.attack){
                    return 1;}
                if (b.attack > a.attack){
                    return -1;}
                    return 0;
            })
            return {
                ...state,
                allPokemons: sortedStrength
            }
        case 'FILTER_BY_TYPE':
            const pokemonsByType= state.filteredPokemons;
            const filteredTypes = action.payload === 'all' ?
                pokemonsByType : pokemonsByType.filter((p)=>p.types.includes(action.payload))
            return{
                ...state,
                allPokemons: filteredTypes
            }
        case 'FILTER_BY_ORIGIN':
            const pokemonsByOrigin= state.filteredPokemons;
            const filteredOrigin = action.payload === 'created by User' ?
                pokemonsByOrigin.filter((p)=>p.createdInDb) : pokemonsByOrigin.filter((p=>!p.createdInDb))
            return{
                ...state,
                allPokemons: action.payload === 'all' ?
                    pokemonsByOrigin : filteredOrigin.length ? filteredOrigin : filteredOrigin
            }
        case 'GET_POKEMON_BY_NAME':
            const addPokemonByName = state.filteredPokemons;
            if(addPokemonByName.filter((p)=>p.name === action.payload[0].name).length > 0) {
                // console.log('El Pokemon mostrado se encuentra en la App')
            } else {
                addPokemonByName.push(action.payload[0]);
                // console.log('El Pokemon mostrado se cargó a la App')
            }
            // console.log('addPokemonByName--->', action.payload[0].name, 'Pokemons in App--->', addPokemonByName.length)
            return{
                ...state,
                addedPokemons: action.payload,
            }
        case 'GET_POKEMON_BY_ID':
            const addPokemonById = state.filteredPokemons;
            if(addPokemonById.filter((p)=>p.id === action.payload[0].id).length > 0) {
                // console.log('El Pokemon mostrado se encuentra en la App')
            } else {
                addPokemonById.push(action.payload[0]);
                // console.log('El Pokemon mostrado se cargó a la App')
            }
            // console.log('addPokemonById--->', action.payload[0].id, 'Pokemons in App--->', addPokemonById.length, 'LUCASSSS!!!!! PROBA CARGAR EL 774')
            return{
                ...state,
                addedPokemons: action.payload,
            }
        case "GET_DETAILS":
            return{
                ...state,
                details: action.payload,
            }
        case "REMOVE_DETAILS":
            return{
                ...state,
                details: []
            }
        case 'RESTORE':
            return{
                ...state,
                allPokemons: state.filteredPokemons,
                addedPokemons: [],
            }
            case 'REMOVE_CARD':
                const newFilteredPokemons = state.filteredPokemons.filter(pokemon => pokemon.id !== action.payload)
                if(newFilteredPokemons.length === state.filteredPokemons.length){
                    
                     alert("Pokemon eliminado")
                } else {
                    
                     alert("Pokemon eliminado")
                }
                return{
                    ...state,
                    filteredPokemons: newFilteredPokemons,
                    allPokemons: newFilteredPokemons
                }
        default: return state;
    }
}

export default rootReducer;
