import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCard, removeDetails, restore } from "../../actions/index";
import { Link, useHistory } from "react-router-dom";
import sd from "../Detail/Detail.module.css";
import s from './AddedCard.module.css';
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";

export default function AddedCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allPokemons = useSelector((state)=>state.allPokemons);
    const addedPokemons = useSelector((state)=>state.addedPokemons);

    const [loadedPokemons ] = useState(allPokemons.length ? true : false);

    useEffect(()=>{
        dispatch(removeDetails());
        dispatch(restore())
        if(!loadedPokemons || !addedPokemons){
            history.push('/pokemon');
        }
    }, [loadedPokemons, dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(removeCard(event.target.id));
        history.push('/pokemon')
        
    }

    

    return(
        <div className={sd.details}>
            <NavBar/>
            <SearchBar/>
            <div className={sd.cardContainer}>
                { addedPokemons.length ?
                addedPokemons.map((pokemon)=>{
                    return(
                        <div className={sd.detailCard} key={pokemon.id}>
                            <div className={sd.idName}>
                            <h4># {pokemon.id.length > 5 ? pokemon.id.slice(0,-31):pokemon.id}</h4>
                            <h1>{pokemon.name.toUpperCase()}</h1>
                            </div>
                            <div className={sd.imgTypes}>
                            <img src={pokemon.img} alt='img not found'/>
                            <h3>Types {pokemon.types.map(type => `${type.toUpperCase()} `)}</h3>
                            </div>
                            <div className={sd.dataPoke}>
                            <span>Hit Points: {pokemon.hp}</span>
                            <span>Attack: {pokemon.attack}</span>
                            <span>Defense: {pokemon.defense}</span>
                            <span>Speed: {pokemon.speed}</span>
                            <span>Height: {pokemon.height}</span>
                            <span>Weight: {pokemon.weight}</span>
                            </div>
                            <button className={sd.removeBtn} id={pokemon.id} onClick={handleClick}>Eliminar</button>  
                            <Link className={sd.backBtn} to='/pokemon'>Atrás</Link>
                        </div>)
                }) :
                <div className={s.loading}>
                    
                    <h4>Cargando...</h4>
                    <Link className={s.backBtnLoad} to='/pokemon'>Volver</Link>
                </div>
                }
            </div>
        </div>
    )
}