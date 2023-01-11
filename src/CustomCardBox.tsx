import React, {FormEvent, useState} from "react";
import {spell} from "./types";

interface SpellFormProps {
    onSubmit: (newSpell: spell) => void;
}

const CustomCardBox = (props: SpellFormProps) => {

    const [materialsNeeded, setMaterialsNeeded] = useState(false)

    const sendSpell = (event: FormEvent) => {
        event.preventDefault();
        const name = (event.currentTarget.querySelector("input[name='spellName']") as HTMLInputElement)?.value;
        const level = (event.currentTarget.querySelector("input[name='level']:checked") as HTMLInputElement)?.value;
        const range = (event.currentTarget.querySelector("input[name='range']") as HTMLInputElement)?.value;
        const duration = (event.currentTarget.querySelector("input[name='duration']") as HTMLInputElement)?.value;
        const casting = (event.currentTarget.querySelector("input[name='casting']") as HTMLInputElement)?.value;
        const school = (event.currentTarget.querySelector("input[name='school']") as HTMLInputElement)?.value;
        const description = (event.currentTarget.querySelector("textarea[name='description']") as HTMLInputElement)?.value;
        const spellType = (event.currentTarget.querySelector("input[name='type']") as HTMLInputElement)?.value;
        const classes = (event.currentTarget.querySelector("input[name='classes']") as HTMLInputElement)?.value.split(",");
        const materials = (event.currentTarget.querySelector("input[id='materials']") as HTMLInputElement)?.checked;
        const materialsList = (event.currentTarget.querySelector("textarea[name='materialsList']") as HTMLInputElement)?.value;
        const somatic = (event.currentTarget.querySelector("input[id='somatic']") as HTMLInputElement)?.checked;
        const verbal = (event.currentTarget.querySelector("input[id='verbal']") as HTMLInputElement)?.checked;
        const ritual = (event.currentTarget.querySelector("input[id='ritual']") as HTMLInputElement)?.checked;

        const newSpell : spell = {
            casting_time: casting,
            classes: classes,
            components: materials ? { material: materials, materials_needed: [materialsList], somatic: somatic, verbal: verbal} : { material: materials, somatic: somatic, verbal: verbal},
            description: description,
            duration: duration,
            level: level,
            name: name,
            range: range,
            ritual: ritual,
            school: school,
            type: spellType
        }
        props.onSubmit(newSpell)
    }

    return (
        <div style={{display:"block"}}>
            <form onSubmit={sendSpell}>
            <input type={"text"} placeholder={"Spell Name"} name={"spellName"}/>
            <div className={"level-div"}>
                <label>Level:</label>
                <input type={"radio"} name={"level"} id={"level 1"} value={1}/>
                <label htmlFor={"level 1"}>1</label>
                <input type={"radio"} name={"level"} id={"level 2"} value={2}/>
                <label htmlFor={"level 2"}>2</label>
                <input type={"radio"} name={"level"} id={"level 3"} value={3}/>
                <label htmlFor={"level 3"}>3</label>
                <input type={"radio"} name={"level"} id={"level 4"} value={4}/>
                <label htmlFor={"level 4"}>4</label>
                <input type={"radio"} name={"level"} id={"level 5"} value={5}/>
                <label htmlFor={"level 5"}>5</label>
                <input type={"radio"} name={"level"} id={"level 6"} value={6}/>
                <label htmlFor={"level 6"}>6</label>
                <input type={"radio"} name={"level"} id={"level 7"} value={7}/>
                <label htmlFor={"level 7"}>7</label>
                <input type={"radio"} name={"level"} id={"level 8"} value={8}/>
                <label htmlFor={"level 8"}>8</label>
                <input type={"radio"} name={"level"} id={"level 9"} value={9}/>
                <label htmlFor={"level 9"}>9</label>
            </div>
            <input placeholder={"Classes, separated by commas"} name={"classes"}/>
            <textarea placeholder={"Description"} name={"description"}/>
            <input placeholder={"Spell Type"} name={"type"}/>
            <label htmlFor={"materials"}>Materials Needed?</label>
            <input type={"checkbox"} id={"materials"} onChange={() => { setMaterialsNeeded(!materialsNeeded) }}/>
            {materialsNeeded && <textarea name={"materialsList"} placeholder={"List of Materials i.e. (one diamond worth at least 500gp)"} />}
            <label htmlFor={"verbal"}>Verbal?</label>
            <input type={"checkbox"} id={"verbal"}/>
            <label htmlFor={"somatic"}>Somatic?</label>
            <input type={"checkbox"} id={"somatic"}/>
            <label htmlFor={"ritual"}>Ritual?</label>
            <input type={"checkbox"} id={"ritual"}/>
            <input placeholder={"range"} name={"range"}/>
            <input placeholder={"casting time"} name={"casting"}/>
            <input placeholder={"duration"} name={"duration"}/>
            <input placeholder={"school"} name={"school"}/>
            <button>Submit Spell</button>
            </form>
        </div>
    )
}
//"duration": "Concentration, up to 10 minutes",
//     "level": "5",
//     "name": "Scrying",
//     "range": "Self",
//     "ritual": false,
//     "school": "divination",
export default CustomCardBox