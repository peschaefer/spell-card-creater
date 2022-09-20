import React, {useEffect, useState} from 'react';
import spells from "./spells.json"
import type {spell} from "./types"
import './App.css';
import SpellBox from "./SpellBox";

function App() {

    const [spellName, setSpellName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [chosenSpellList, setChosenSpellList] = useState<spell[]>()
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

    useEffect(()=>{
        console.log(possibleSpellList)
    })


    useEffect(()=>{
        let spellNames : string[] = []
        spells.forEach(spell => spellNames.push(spell.name));
        setAllSpellNames(spellNames)
        console.log(allSpellNames)
    },[])

    const handleFormSubmit = (e : any) => {
        // e.preventDefault()
        // setChosenSpellList( spells.filter(spell => spell.name.toLowerCase() === spellName.toLowerCase()) )
        // setSubmitted(true)
    }

    const handleChange = (e : any) => {
        setSpellName(e.target.value)
        let spellNamedLength : string[] = []
        allSpellNames?.forEach((spell) => spellNamedLength.push(spell.substring(0,e.target.value.length)))
        setAllSpellNamesLengthTyped(spellNamedLength)

        //have a dictionary with key value pair, key being spell name, value being levenshtein number. If value is <= max distance then display with those values.

        let cutPossibleSpells = allSpellNamesLengthTyped?.filter(spell => levenshteinDistance(spell,spellName) < 1)
        let possibleSpells: spell[] = []
        console.log(cutPossibleSpells)
        cutPossibleSpells?.forEach((possibleSpellName) => {
            possibleSpells.push(spells.filter(spell => spell.name.startsWith(possibleSpellName))[0])
        })
        setPossibleSpellList(possibleSpells)
    }

    return (
    <div className="App">
        {/*<p>{allSpellNamesLengthTyped}</p>*/}
      <form onSubmit={handleFormSubmit}>
          <input onChange={handleChange}/>
          <button>Submit</button>
      </form>
        {possibleSpellList?.map((spell)=>{
            return <button>{spell.name}</button>
        })}
        { submitted && chosenSpellList?.map((spell, index) => {
            return <SpellBox spell={chosenSpellList[index]}/>
        }) }
    </div>
  );
}

export default App;
