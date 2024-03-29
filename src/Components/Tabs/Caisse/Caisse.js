import React, { useState } from "react"
import axios from 'axios';
import Menu from './Menu';
import {API_URL} from '../../../config'

export default function Caisse() {
  const [command, addCommand] = useState([]);
  const [name, setName] = useState("");
  const [tab, setTab] = useState("pizzas");
  const [error, setError] = useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Submitting Name ${name}`)
  }
  function resetCommand() {
    if (window.confirm("Attention vous allez annuler toute la commande")) {
      addCommand([]);
    }
  }
  function validateCommand(){
    if (name === ""){
      if (window.confirm("Vous n'avez pas entré de nom, voulez-vous envoyer la commande quand même?")) {
        sendCommand([]);
        setTab("pizzas")
      }
    } else{
      sendCommand()
    }
  }
  function sendCommand() {
    const toPost = {
      "name": name===""? " " : name,
      "date": (new Date()).toUTCString(),
      "content": command,
      "last_update":(new Date()).toUTCString() 
    }
    axios.post(`${API_URL}/commands/add`, toPost)
    // axios.post(`https://adr.cs-campus.fr/projet-adr/api/commands/add`, toPost)
    // axios.post(`http://localhost:8080/api/commands/add`, toPost)
      .then(res => {
        console.log("it worked!!");
        setName("");
        addCommand([]);
      })
      .catch(error => {
        setError({ errorMessage: error.message });
        console.error('There was an error!', error);
      });
  }
  return (
    <main>
      <div className="ctnr_caisse">
        <div className="left side">
          <form onSubmit={handleSubmit}>
            <h3>Nom du client:</h3>
            <div className="name_input">
              <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={e => setName(e.target.value)} />
              <div className="cross" onClick={()=>setName("")}>
                <div className="close"></div>
              </div>
            </div>
            
          </form>
          <Menu
            command={command}
            addCommand={addCommand}
            tab={tab}
            setTab={setTab}
          />
        </div>
        <div className="right side">
          <h2>Recap de la commande</h2>
          <div className="recap">
            <ul>
              {command.map(function (command, i) {
                return (
                  <li key={i}>{command.name + (command.option ? (" - " + command.option) : "")}</li>
                )
              })}
            </ul>
          </div>
          <div className="btns">
            <button className="danger" onClick={resetCommand}>Annuler</button>
            <button className="green" onClick={validateCommand}>Envoyer</button>
          </div>
        </div>
      </div>
    </main>
  );
}
