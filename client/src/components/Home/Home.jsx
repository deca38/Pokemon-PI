import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, removeDetails, orderByName, orderByStrength, filterByOrigin, filterByType } from "../../actions/index";
import { Link } from "react-router-dom";
import s from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state)=>state.allPokemons);
    const types = useSelector((state)=>state.types);

    const [loadedPokemons ] = useState(allPokemons.length ? true : false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPage ] = useState(12);
    const indexLast = currentPage * pokemonPage;
    const indexFirst = indexLast - pokemonPage;
    const currentPokemons = allPokemons.slice(indexFirst, indexLast);
    const pagination = (pageNumber) => {setCurrentPage(pageNumber)}

    const [order, setOrder] = useState('')

    useEffect(()=>{
        dispatch(removeDetails());
        if(!loadedPokemons){
            dispatch(getPokemons());
            dispatch(getTypes());
        }
    }, [loadedPokemons, dispatch])

    useEffect(() =>{
        setCurrentPage(1);
    }, [allPokemons.length, setCurrentPage])


    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(`Alphabetical ${e.target.value} order`);
        setCurrentPage(1);
        e.target.value= 'default';
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByStrength(e.target.value));
        setOrder(`Ordered by ${e.target.value} Pokemon`);
        setCurrentPage(1);
        e.target.value= 'default';
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setOrder(`Filtrado por tipo: ${e.target.value}`);
        e.target.value= 'default';
    }

   



    function handleFilterByOrigin(e){
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
        setOrder(`Filtrado por origen: ${e.target.value}`);
        e.target.value= 'default';
    }

    return(
        <div className={s.home}>
            <NavBar/>
            <SearchBar/>
            <form className={s.filters}>
                <select className={s.homeFilters} value='default' onChange={e => handleSort(e)}>
                    <option disabled value = "default">Ordenar por nombre...</option>
                    <option value = "asc">A - Z</option>
                    <option value = "desc">Z - A</option>
                </select>
                <select className={s.homeFilters} value='default' onChange={e => handleSortAttack(e)}>
                    <option disabled value = "default">Ordenar por fuerza...</option>
                    <option value = "strongest">Mayor ataque</option>
                    <option value = "weakest">Menor ataque</option>
                </select>
                <select className={s.homeFilters} value='default' onChange={e => handleFilterType(e)}>
                    <option disabled value = "default">Filtrar por tipos...</option>
                    <option value = 'all'>Todos</option>
                    {types?.map((type) => (
                    <option value = {type.name} key={type.name}>{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</option>
                    ))}
                </select>


                


                <select className={s.homeFilters} value='default' onChange={e => handleFilterByOrigin(e)}>
                    <option disabled value = "default">Filtrar por origen...</option>
                    <option value = "all">Mostrar todos...</option>
                    <option value = "originals">Originales...</option>
                    <option value = "created by User">Creados por usuario...</option>
                </select>
                {order.length > 0 && (<span className={s.filtered}>{order}</span>)}
            </form>
            <div className={s.containerCards}>
                { currentPokemons.length ?
                currentPokemons.map((pokemon)=>{
                    return(
                        <div className={s.homeCards} key={pokemon.id}>
                            <Link to={`/pokemon/${pokemon.id}`} className={s.homeCardsLink}>
                                <Card
                                    name={pokemon.name}
                                    img={pokemon.img}
                                    hp={pokemon.hp}
                                    types={pokemon.types}
                                    id={pokemon.id}
                                    key={pokemon.id}
                                />
                            </Link>

                        </div>)    
                })
                :
                <div className={s.reloadingApp}>
                    <h1>Cargando...</h1>
                </div>
                }
            </div>
            <div>
                <Pagination
                    pokemonPage={pokemonPage}
                    Pokemons={allPokemons.length}
                    pagination={pagination}
                    page={currentPage}/>
            </div>
        </div>
    )
}