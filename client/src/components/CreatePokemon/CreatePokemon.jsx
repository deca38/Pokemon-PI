import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { postPokemon, getTypes, getPokemonByName } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./CreatePokemon.module.css";
import NavBar from "../NavBar/NavBar";
import validations from "./CreatePokemonValidations";
import Swal from "sweetalert2";

export default function CreatePokemon() {

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const pokemonNames = useSelector((state)=>state.allPokemons.map((pokemon)=>pokemon.name));
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        img: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    });

    useEffect(()=>{
        dispatch(getTypes());
    }, [dispatch])

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name] : event.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        });
        setErrors(validations({...input, [event.target.name] : event.target.value}, pokemonNames));
    }

    function handleSelect(event) {
        if(input.types.filter(type=> type === event.target.value).length) {
            input.types.pop();
             alert('No puede tener 2 tipos iguales');
        }
        setInput({
            ...input,
            types: [...input.types, event.target.value]
        })
        event.target.value= 'default';
    }

    function handleClick(event) {
        event.preventDefault();
        setInput({
            ...input,
            types: input.types.filter(type=> type !== event.target.id)
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        setInput({...input.name=input.name.toLowerCase()});
        !input.img ? setInput({...input.img='https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png'}) : setInput(input);
        if(Object.keys(errors).length === 0 && input.name.length && input.types.length > 0) {
            dispatch(postPokemon(input));
            dispatch(getPokemonByName(input.name));
            history.push("/pokemonaddedcards")
            alert('Pokemon creado con éxito!')
        } else {
            
             alert('Por favor completa todos los campos...')
            setInput(input)
        }
    }

    return(
        <div className={s.createPokemon}>
            <NavBar/>
            <div className={s.createCard}>
            <h1 className={s.title}>CREA TU POKEMON</h1>
            <form className={s.createForm} onSubmit={(event)=>handleSubmit(event)}>
                <div className={s.createName}>
                    <label>NOMBRE</label>
                    <input
                        type='text'
                        value={input.name.toUpperCase()}
                        name= 'name'
                        autoComplete='off'
                        spellCheck="false"
                        className={s.inputName}
                        onChange={handleChange}/>
                    </div>
                    {errors.name && (<p className={s.errorName}>{errors.name}</p>)}
                <div className={s.createStats}>
                    <label>Hit Points (HP) </label>
                    <input
                        type='range'
                        min='1'
                        max='140'
                        value={input.hp}
                        name= 'hp'
                        onChange={handleChange}/>
                        <span className={s.inputStats}> {input.hp}</span>
                {errors.hp && (<p className={s.errors}>{errors.hp}</p>)}
                </div>
                <div className={s.createStats}>
                    <label>Attack </label>
                    <input
                        type='range'
                        value={input.attack}
                        min='1'
                        max='150'
                        name= 'attack'
                        onChange={handleChange}/>
                        <span className={s.inputStats}> {input.attack}</span>
                {errors.attack && (<p className={s.errors}>{errors.attack}</p>)}
                </div>
                <div className={s.createStats}>
                    <label>Defense </label>
                    <input
                        type='range'
                        value={input.defense}
                        min='1'
                        max='150'
                        name= 'defense'
                        onChange={handleChange}/>
                        <span className={s.inputStats}> {input.defense}</span>
                {errors.defense && (<p className={s.errors}>{errors.defense}</p>)}
                </div>
                <div className={s.createStats}>
                    <label>Speed </label>
                    <input
                        type='range'
                        value={input.speed}
                        min='1'
                        max='100'
                        name= 'speed'
                        onChange={handleChange}/>
                        <span className={s.inputStats}> {input.speed}</span>
                {errors.speed && (<p className={s.errors}>{errors.speed}</p>)}
                </div>
                <div className={s.createStats}>
                    <label>Height </label>
                    <input
                        type='range'
                        value={input.height}
                        min='1'
                        max='80'
                        name= 'height'
                        onChange={handleChange}/>
                        <span className={s.inputStats}> {input.height}</span>
                {errors.height && (<p className={s.errors}>{errors.height}</p>)}
                </div>
                <div className={s.createStats}>
                    <label>Weight </label>
                    <input
                        type='range'
                        value={input.weight}
                        min='1'
                        max='3000'
                        name= 'weight'
                        onChange={handleChange}/>
                        <span className={s.inputStats}> {input.weight}</span>
                {errors.weight && (<p className={s.errors}>{errors.weight}</p>)}
                </div>
                <div className={s.createTypes}>
                    <select className={s.selectValues} value='default' onChange={(event)=>handleSelect(event)}>
                        <option disabled value='default'>Selecciona el tipo</option>
                        {
                            input.types.length < 2 ?
                            types.map((type)=>(<option className={s.optionType} value ={type.name} key={type.name}>{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</option>)) :
                            <option value ='full' disabled>{`There are two chosen`}</option>
                        }
                    </select>
                </div>
                <div className={s.createTypesSel}>
                    {input.types.map((selected)=>(
                        <div className={s.selectedType} key={selected}>
                            <p>{selected.charAt(0).toUpperCase()+selected.slice(1)}</p>
                            <button  className={s.deleteType} id={selected} onClick={handleClick}>x</button>
                        </div>
                        ))
                    }
                {errors.types && (<p className={s.errors}>{errors.types}</p>)}
                </div>
                {input.img && (<div className={s.imgContainer}><img className={s.urlImg} src={input.img} alt='img not found'/></div>)}
                <div className={s.createImg}>
                    <label>URL Image:</label>
                    <input
                        alt='image not found'
                        value={input.img}
                        name= 'img'
                        pattern="https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$"
                        title="image URL"
                        placeholder=' ...'
                        autoComplete='off'
                        spellCheck="false"
                        className={s.inputImg}
                        onChange={handleChange}/>
                </div>
                <button type='submit' className={s.createBtn}>Crear Pokemon</button>
            </form>
            </div>
        </div>
    )
}