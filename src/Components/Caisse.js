import React, { useState } from "react"
import axios from 'axios';

export default function Caisse() {
  const [commands, addCommand] = useState([]);
  const [name, setName] = useState("")
  const [pizzas] = useState(["Marga", "Végé", "Reine", "Poulet", "PP", "Kebab", "PC", "Raclette", "3F", "Orientale", "Beouf", "Saumon", "Tartif", "CM"]);
  const [options] = useState(["Vegan","sans salade","Base tomate","Base crème" ]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Submitting Name ${name}`)
}

  function sendCommand() {
    const toPost = {
      "name": name,
      "date": (new Date()).toUTCString(),
      "content": commands,
    }
    axios.post(`https://adr.cs-campus.fr/projet-adr/server/api/commands/add`, toPost)
      .then(res => {
        console.log("it worked!!");
        addCommand([]);
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
      });
  }
  return (
    <main>
      <h1>Ecran caisse</h1>
      <div className="left_side">
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}/>
        </form>
        <div className="table_selection pizza">
          {pizzas.map(function (pizza, i) {
            return (
              <button className="item" onClick={() => {
                addCommand([
                  ...commands,
                  {
                    "id": commands.length,
                    "name": pizza,
                    "type": "pizza",
                    "status": "pas commencee",
                    "last_update": (new Date()).toUTCString(),
                    "option": (pizza === "Marga" ? "j'aime pas la marga" : undefined)
                  }
                ]);
                console.log(commands)
              }}>{pizza}</button>
            );
          })}
          <br/>
          <button>Fritures</button>
          <button>Options</button>
          <br/>
          <button className="item" onClick={() => console.log(commands,name)}>Log les nouvelles valeurs</button>
        </div>
        <div className="table_selection options">
          {options.map(function (option, i) {
            return (
              <button className="item" onClick={() => {
                console.log(commands.at(-1))
                addCommand(commands.slice(0,-1).concat( 
                  [{
                    "id": commands.at(-1).id,
                    "name": commands.at(-1).name,
                    "type": commands.at(-1).type,
                    "status": "pas commencee",
                    "last_update": commands.at(-1).last_update,
                    "option": commands.at(-1).option ? commands.at(-1).option + ", " + option : "option " + option ,
                  }
                ]));
                
              }}>{option}</button>
            );
          })}
          <br/>
          <button>Fritures</button>
          <button>Options</button>
          <br/>
          <button className="item" onClick={() => console.log(commands,name)}>Log les nouvelles valeurs</button>
        </div>
      </div>
      <div className="right_side">
        <h2>Recap de la commande</h2>
        {commands.map(function (command, i) {
          return (
            <p>{command.name + (command.option ? (" - " + command.option) : "")}</p>
          )
        })}
        <button onClick={sendCommand}>Envoyer</button>
      </div>
    </main>
  );
}
