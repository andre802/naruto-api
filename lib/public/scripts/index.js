import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        fetch("https://naruto--api.herokuapp.com/characters")
        .then(resp => resp.json())
        .then(data => {
            data.names.forEach(name => {
                fetch(`https://naruto--api.herokuapp.com/characters/${name}`)
                .then(resp => resp.json())
                .then(data=> {
                    setCharacters(...characters, data);
                })
                
            })
        })
    },[])
    return (
        <div>
            <h1>Naruto API</h1>
            <div>
                {characters.map((char) => {
                    return char.name;
                })}
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));