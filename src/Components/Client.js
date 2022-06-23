import axios from "axios"
import { useEffect, useState } from "react"

export default function Client() {

  const [commands, setCommand] = useState([])
  // let geturl = "http://localhost:8080/api/commands/";
  let geturl = "https://adr.cs-campus.fr/projet-adr/api/commands/";

  useEffect(() => {
    // console.log("running useEffect");
    const getCommands = () => {
      axios.get(geturl)
        .then(res => {
          setCommand(res.data);
        })
        .catch(error => console.error(`Error: ${error}`))
    }
    getCommands();
    const interval = setInterval(() => {
      // console.log('This will run every second!');
      console.log("running useEffect");
      const getCommands = () => {
        axios.get(geturl)
          .then(res => {
            setCommand(res.data);
          })
          .catch(error => console.error(`Error: ${error}`))
      }

      getCommands();
    }, 2000);
    return () => clearInterval(interval);
  }, [setCommand, geturl])

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  // var aDay = 24*60*60*1000;
  // console.log(timeSince(new Date(Date.now()-aDay)));
  // console.log(timeSince(new Date(Date.now()-aDay*2)));

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