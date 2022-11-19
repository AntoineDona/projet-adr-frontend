import axios from "axios"
import { useEffect, useState } from "react"
import {API_URL} from '../../config'
import useWebSocket from "../../websocket/WebSocketHandler"
import {timeSince} from "../../utils/time"

export default function Client() {

  const [commands, setCommands] = useState([])
  let geturl = `${API_URL}/commands/`;

  useWebSocket(setCommands)

  useEffect(() => {
    const getCommands = () => {
      axios.get(geturl)
        .then(res => {
          setCommands(res.data);
        })
        .catch(error => console.error(`Error: ${error}`))
    }
    getCommands();
  },[])

  function mapCommand(command, articlestatus) {
    return (
      command.content.map(function (item) {
        if (item.status === articlestatus) {
          return (
            <div key={item.id} className="article">
              <div className="article_infos">
                {item.name}
                <br />
                <span className="option">
                  {item.option ? item.option : ""}
                </span>
              </div>
            </div>
          )
        } else {
          return (" ")
        };
      })
    )
  }

  function commandList(articlestatus) {
    let commands_array = articlestatus==="archived" ? commands.slice(0).reverse() : commands;
    return (
      commands_array.map((command) => {
        let mappingOfCommand = mapCommand(command, articlestatus);
        // console.log("contains object? ", mappingOfCommand.some(e => typeof (e) === 'object'));
        let todisplay1 = Date.parse(command.last_update)>new Date()-10*60*1000;
        let todisplay2 = Date.parse(command.date)>new Date()-4*60*60*1000;
        if (todisplay2){
            console.log("last update",command.last_update);
            console.log("display1? ", todisplay1, Date.parse(command.last_update)-new Date()+10*60*1000);
        }
        if (mappingOfCommand.some(e => typeof (e) === 'object') && ((todisplay1 && todisplay2 &&  articlestatus === "archived" ) || articlestatus === "enkouizine" )) { //si un objet est présent dans l'array, cad il y a un article
          return ( // on affiche le conteneur de la commande
            <div key={command._id} className="commande client">
              <div className="cmd_infos">
                <h3>{command.name === " " ? "Sans Nom" : command.name}</h3>
                <span>{timeSince(Date.parse(command.date))} ago</span>
              </div>
              <div className="articles">
                {mappingOfCommand}
              </div>
            </div>
          )
        } else { return ("") }
      }))
  }

  // console.log(commands)
  return (
    <main>
      <div className="ecran_clients">
        <div className="left side ">
          <h2>Prêtes</h2>
          <div className="commands client">
            {commandList("archived")}
          </div>
        </div>
        <div className="right side">
          <h2>En cours</h2>
          <div className="commands client">
            {commandList("enkouizine")}
          </div>
        </div>
      </div>

    </main>
  );
}