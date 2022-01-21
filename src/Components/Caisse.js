import React, { useState } from "react"
import axios from 'axios';

export default function Caisse() {
  const [commands, addCommand] = useState([]);
  const [pizzas] = useState(["Marga","Reine","Pepe"]);

  function sendCommand(){
    const toPost = {
      "name": "Antoine",
      "date": (new Date()).toUTCString(),
      "content": commands,
    }
    axios.post(`https://adr.cs-campus.fr/projet-adr/server/api/commands/add` , toPost)
    .then(res => {
      console.log("it worked!!")
      console.log(toPost)
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
        <div className="table_selection">
        {pizzas.map(function(pizza, i){
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
                "comment" : (pizza === "Marga" ? "j'aime pas la marga" : undefined)
              }
            ]);
            console.log(commands)
          }}>{pizza}</button>
        );
        })}
          
          <button className="item" onClick={() => console.log(commands)}>Console log new values</button>
          <div className="item">VG</div>
          <div className="item">PP</div>
          <div className="item">Saumon</div>
          <div className="item">Raclette</div>
        </div>
      </div>
      <div className="right_side">
        <h2>Recap de la commande</h2>
        {commands.map(function(command, i){
        return (
          <p>{command.name + (command.comment ? (" - " + command.comment) : "" )}</p>
        )
        })}
        <button onClick={sendCommand}>Envoyer</button>
      </div>
    </main>
  );
}
