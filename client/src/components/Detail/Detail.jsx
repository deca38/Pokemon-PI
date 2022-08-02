import React, {useEffect} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, removeCard } from '../../actions/index';
import NavBar from "../NavBar/NavBar";
import SearchBar from '../SearchBar/SearchBar';
import s from './Detail.module.css';

export default function Details() {
    const dispatch = useDispatch();
    const {id} = useParams();
    let history = useHistory();

    useEffect(() =>{
        dispatch(getDetails(id));
    }, [dispatch, id])

    const myPokemon = useSelector((state) => state.details);

    function handleClick(event){
        event.preventDefault();
        dispatch(removeCard(event.target.id));
        history.push('/pokemon')
       
    }


    return(
        <div className={s.details}>
            <NavBar/>
            <SearchBar/>
            <div className={s.cardContainer}>
            {
                myPokemon.length > 0 ?
                <div className={s.detailCard}>
                    <div className={s.idName}>
                    <h4># {myPokemon[0].id.length > 5 ? myPokemon[0].id.slice(0,-31):myPokemon[0].id}</h4>
                    <h1>{myPokemon[0].name.toUpperCase()}</h1>
                    </div>
                    <div className={s.imgTypes}>
                    <img src={myPokemon[0].img} alt='img not found'/>
                    <h3>TIPO: {myPokemon[0].types.map(type => `${type.toUpperCase()} `)}</h3>
                    </div>
                    <div className={s.dataPoke}>
                    <span>Hit Points: {myPokemon[0].hp}</span>
                    <span>Attack: {myPokemon[0].attack}</span>
                    <span>Defense: {myPokemon[0].defense}</span>
                    <span>Speed: {myPokemon[0].speed}</span>
                    <span>Height: {myPokemon[0].height}</span>
                    <span>Weight: {myPokemon[0].weight}</span>
                    </div>
                    <button className={s.removeBtn} id={myPokemon[0].id} onClick={handleClick}>Eliminar</button>
                    <Link className={s.backBtn} to='/pokemon'>Volver</Link>
                </div>
                :
                <div className={s.loading}>
                    <h1>Cargando...</h1>
                </div>
            }
            </div>
        </div>
    )
}