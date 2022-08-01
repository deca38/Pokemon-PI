import React from "react";
import s from './Card.module.css';

export default function Card({name, img, id, types}){

    return(
        <div className={s.card}>
            {/* <h6 className={s.cardId}># {id.length > 5 ? id.slice(0,-31):id}</h6> */}
            <img className={s.cardImg} src={img} alt="Img not found"/>
            <h3 className={s.cardName}>{name.toUpperCase()}</h3>
            <div className={`${s.containerCardTypes} cardWater`}>
                {/* <h6>Types</h6> */}
                {types?.map((e)=>{
                    return (
                        <div className={s.cardTypes} key={e}>
                            <span>{e.toUpperCase()} </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}