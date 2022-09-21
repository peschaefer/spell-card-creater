import React, {useState} from 'react';
import spells from "./spells.json"
import type {spell} from "./types"
import './App.css';

type AppProps = {
    spell: spell
}

function SpellCard(props: AppProps) {

    const classList = props.spell.classes.join(", ")
    const components = props.spell.components.raw.split("(")[0]

    return (
        <div className={"spell-box"} style={{display: "grid"}}>
            <h1>{props.spell.name}</h1>
            <h4>{props.spell.type}</h4>
            <h2 className={"casting"}>{props.spell.casting_time}</h2>
            <h2 className={"range"}>{props.spell.range}</h2>
            <h2 className={"components"}>{components}</h2>
            <h2 className={"duration"}>{props.spell.duration}</h2>
            <div className={"class-box"}>{classList}</div>

            <p>{props.spell.description}</p>
        </div>
    );
}

export default SpellCard;
