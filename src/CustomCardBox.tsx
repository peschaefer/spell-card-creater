import React, {useState} from "react";
import {spell} from "./types";

type CardProps = {
    parentCallback: spell
}

const CustomCardBox = ( props : CardProps) => {

    const [materialsNeeded, setMaterialsNeeded] = useState(false)

    // const sendSpell = () => {
    //     // this.props.parentCallback()
    //     this.
    // }

    return (
        <div style={{display:"block"}}>
            <input type={"text"} placeholder={"Spell Name"}/>
            <div className={"level-div"}>
                <label>Level:</label>
                <input type={"radio"} name={"level"} id={"level 1"}/>
                <label htmlFor={"level 1"}>1</label>
                <input type={"radio"} name={"level"} id={"level 2"}/>
                <label htmlFor={"level 2"}>2</label>
                <input type={"radio"} name={"level"} id={"level 3"}/>
                <label htmlFor={"level 3"}>3</label>
                <input type={"radio"} name={"level"} id={"level 4"}/>
                <label htmlFor={"level 4"}>4</label>
                <input type={"radio"} name={"level"} id={"level 5"}/>
                <label htmlFor={"level 5"}>5</label>
                <input type={"radio"} name={"level"} id={"level 6"}/>
                <label htmlFor={"level 6"}>6</label>
                <input type={"radio"} name={"level"} id={"level 7"}/>
                <label htmlFor={"level 7"}>7</label>
                <input type={"radio"} name={"level"} id={"level 8"}/>
                <label htmlFor={"level 8"}>8</label>
                <input type={"radio"} name={"level"} id={"level 9"}/>
                <label htmlFor={"level 9"}>9</label>
            </div>
            <input placeholder={"Classes, separated by commas"}/>
            <textarea placeholder={"Description"}/>
            <input placeholder={"Spell Type"}/>
            <label htmlFor={"materials"}>Materials Needed?</label>
            <input type={"checkbox"} id={"materials"} onChange={() => { setMaterialsNeeded(!materialsNeeded) }}/>
            {materialsNeeded && <textarea placeholder={"List of Materials i.e. (one diamond worth at least 500gp)"} />}
            <label htmlFor={"verbal"}>Verbal?</label>
            <input type={"checkbox"} id={"verbal"}/>
            <label htmlFor={"somatic"}>Somatic?</label>
            <input type={"checkbox"} id={"somatic"}/>
            <label htmlFor={"ritual"}>Ritual?</label>
            <input type={"checkbox"} id={"ritual"}/>
            <input type={"range"} placeholder={"range"}/>
            <input type={"school"} placeholder={"school"}/>
            {/*<button onClick{sendSpell}>Submit Spell</button>*/}
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