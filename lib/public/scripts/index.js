import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Character from './Character';

const App = () => {
    const [characterNames, setCharacterNames] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState("");
    const [obj, setObj] = useState({});
    useEffect(() => {
        if (selectedCharacter == "") return;
        fetch(`https://naruto--api.herokuapp.com/characters/${selectedCharacter}`)
            .then(body => body.json())
            .then(data => {
                setObj(data);
            })
    }, [selectedCharacter])
    useEffect(() => {
        fetch("https://naruto--api.herokuapp.com/characters")
            .then(resp => resp.json())
            .then(data => {
                setCharacterNames(data.names);
            })
    }, [])
    return (
        <>
        <header>
            <h1>Naruto API</h1>
            <label>
                Characters
                <select
                    id="name"
                    value={selectedCharacter}
                    onChange={e => {
                        setSelectedCharacter(e.target.value)
                    }
                    }
                >
                    {characterNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>

            </label>
        </header>
        <div>
            
            {obj ? (
                <div id="character">

                    {!obj.name ? (<p>Select a Character</p>) : (
                        <Character 
                            name={obj.name}
                            summary={obj.summary}
                            images={obj.images}
                            jutsus={obj.jutsu}
                            personalInfo={obj.personalInfo} 
                            />
                    )}
                </div>
            ) : ""}
        </div>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));