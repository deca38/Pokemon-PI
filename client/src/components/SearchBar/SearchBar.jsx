import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from "react-router-dom";
import {getPokemonByName, getPokemonBySearchId, restore} from "../../actions/index";
import { useHistory } from 'react-router-dom';
import s from "./SearchBar.module.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [searchId, setSearchId] = useState("");

    function handleInputChangeName(e) {
        e.preventDefault();
        setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "));
        setSearchId("")
    }

    function handleInputChangeId(e) {
        e.preventDefault();
        setSearchId(e.target.value);
        setName("")
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(restore());
        if(!name && !searchId){
            alert ("Debes ingresar un ID o un Nombre")
        }
        if(name !== ''){
            dispatch(getPokemonByName(name));
            setName("");
        } else {
            history.push('/pokemonaddedcards')
        }
        if(searchId !== ''){
            dispatch(getPokemonBySearchId(searchId));
        } else {
            history.push('/pokemonaddedcards')
        }
    }

    return(
        <div className={s.searchBox}>
            <div className={s.searchAdd}>
                <form className={s.searchAddForm} onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className={s.searchInput}
                        type="text"
                        placeholder="Pokemon name..."
                        value={name}
                        onChange={(e) => handleInputChangeName(e)}
                    />
                    <input
                        className={s.searchInput}
                        type="number"
                        placeholder="Pokemon ID..."
                        value={searchId}
                        onChange={(e) => handleInputChangeId(e)}
                    />
                    <button type='submit' className={s.searchBarBtns}>
                        Buscar Pokemon
                    </button>
                </form>
                <div className={s.btnCreaate}>
                    <NavLink to="/create" className={s.btnCreate}>Crear Pokemon!</NavLink>
                </div>
            </div>
        </div>
    )
}