import React, {useEffect, useState} from 'react';
import spells from "./spells.json"
import type {spell} from "./types"
import './App.css';
import SpellCard from "./SpellCard";
import dragonHeadImg from "./Assets/dragon-head.png"
import dragonTailImg from "./Assets/dragon-tail.png"

function App() {

    const [spellName, setSpellName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [chosenSpellList, setChosenSpellList] = useState<spell[]>([])
    const [possibleSpellList, setPossibleSpellList] = useState<spell[]>()
    const [allSpellNames, setAllSpellNames] = useState<string[]>()
    const [allSpellNamesLengthTyped, setAllSpellNamesLengthTyped] = useState<string[]>()

    const levenshteinDistance = (str1 = '', str2 = '') => {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator, // substitution
                );
            }
        }
        return track[str2.length][str1.length];
    };

    //fires when the user-inout changes
    //this function fills an array with possible spells based on the user input
    useEffect(() => {
        if (spellName === '') {
            return
        }
        setPossibleSpellList([])
        let spellNamedLength: string[] = []
        allSpellNames?.forEach((spell_name) => spellNamedLength.push(spell_name.substring(0, spellName.length)))
        console.log(spellNamedLength)

        let possibleSpells: spell[] = []
        //have a dictionary with key value pair, key being spell name, value being levenshtein number. If value is <= max distance then display with those values.
        if (spellNamedLength.length > 3) {
            for (let index = 0; index < 3; index++) {
                for (let choppedSpell of spellNamedLength) {
                    let correspondingSpell = spells[spellNamedLength.indexOf(choppedSpell)]
                    if (levenshteinDistance(choppedSpell.toLowerCase(), spellName.toLowerCase()) <= index && possibleSpells.length < 5 && !possibleSpells.includes(correspondingSpell)) {
                        possibleSpells.push(correspondingSpell)
                        console.log(correspondingSpell.name)
                        console.log(levenshteinDistance(choppedSpell.toLowerCase(), spellName.toLowerCase()))
                        spellNamedLength[spellNamedLength.indexOf(choppedSpell)] = "zzzzzzzz"
                    }
                }
                setPossibleSpellList(possibleSpells)
            }
        }
    }, [spellName, allSpellNames])

    useEffect(() => {
        let spellNames: string[] = []
        spells.forEach(spell => spellNames.push(spell.name));
        setAllSpellNames(spellNames)
    }, [])

    const handleFormSubmit = (e: any) => {
        // e.preventDefault()
        // setChosenSpellList( spells.filter(spell => spell.name.toLowerCase() === spellName.toLowerCase()) )
        // setSubmitted(true)
    }

    const handleChange = (e: any) => {
        setSpellName(e.target.value)
    }

    const handleSpellButton = (selectedSpell: spell) =>{
        if(chosenSpellList.includes(selectedSpell)){
            setChosenSpellList(chosenSpellList.filter(filterSpell => filterSpell !== selectedSpell))
        } else {
            setChosenSpellList([...chosenSpellList, selectedSpell])
        }
    }

    const isChosen = (selectedSpell: spell) => {
        return chosenSpellList.includes(selectedSpell)
    }

    return (
        <div className="App">
            {/*<p>{allSpellNamesLengthTyped}</p>*/}
            <div className={"deck-builder"}>
                <h1 className={"test-font"}>SPELL CARD CREATOR</h1>
                <div className={"search-box"}>
                    <img className={"dragon-head"} alt={"dragon"} src={dragonHeadImg}/>
                    <input className={"search-bar"} onChange={handleChange}/>
                    <img className={"dragon-tail"} alt={"dragon-tail"} src={dragonTailImg}/>
                    {spellName !== "" && possibleSpellList?.map((spell) => {
                        return (
                            <div className={"search-box-choice"}>
                                <p>{spell.name}</p>
                                <button className={isChosen(spell) ? "chosen-spell" : "spell-choice"} onClick={() => {handleSpellButton(spell)}}>select spell</button>
                            </div>
                        )
                    })}
                    {chosenSpellList.map((chosenSpell) => {
                        return <SpellCard spell={chosenSpell}/>
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
