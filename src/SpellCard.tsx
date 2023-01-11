import React, {useEffect, useState} from 'react';
import type {spell} from "./types"
import './App.css';

type AppProps = {
    spell: spell
}

function SpellCard(props: AppProps) {

    const classList = props.spell.classes.join(", ")
    const [components,setComponents] = useState<string[]>()

    useEffect(()=>{
            let temp = []
            if (props.spell.components.verbal){
                temp.push("V")
            }
            if (props.spell.components.somatic){
                temp.push("S")
            }
            if (props.spell.components.material){
                temp.push("M")
            }
            setComponents(temp)
    },[])

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
