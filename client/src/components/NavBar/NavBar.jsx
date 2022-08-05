import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from "react-router-dom";
import { restore } from "../../actions";
import s from './NavBar.module.css';

export default function NavBar() {
    const dispatch = useDispatch();

    function handleClick () {
        dispatch(restore())
    }
   
    return (
        <nav className={s.navbar}>
            <NavLink to="/pokemon" className={s.navbarLink} onClick={handleClick}>INICIO</NavLink>
            <NavLink to="/" className={s.navbarLink}>VOLVER</NavLink>
        </nav>

    )
}
    