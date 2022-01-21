import React, { useState } from "react"
import axios from 'axios';
import Menu from './Menu';

export default function Caisse() {
  const [commands, addCommand] = useState([]);
  const [name, setName] = useState("")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Submitting Name ${name}`)
  }
  function resetCommand() {
    if (window.confirm("Attention vous allez annuler toute la commande")) {
      addCommand([]);
    }
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
      <div className="ctnr_caisse">
        <div className="left side">
          <form onSubmit={handleSubmit}>
            <h3>Nom du client:</h3>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={e => setName(e.target.value)} />
          </form>
          <Menu
            commands={commands}
            addCommand={addCommand} />
        </div>
        <div className="right side">
          <h2>Recap de la commande</h2>
          <div className="recap">
            <ul>
              {commands.map(function (command, i) {
                return (
                  <li>{command.name + (command.option ? (" - " + command.option) : "")}</li>
                )
              })}
            </ul>
          </div>
          <dib className="btns">
            <button className="danger" onClick={resetCommand}>Annuler</button>
            <button className="green" onClick={sendCommand}>Envoyer</button>
          </dib>
        </div>
      </div>
    </main>
  );
}
