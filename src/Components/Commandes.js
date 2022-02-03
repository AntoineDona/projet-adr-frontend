import axios from "axios"
import { useEffect, useState } from "react"

export default function Commands({ tab }) {

  const [commands, setCommand] = useState([])
  // let geturl = "http://localhost:8080/api/commands/gettype/" + tab.type;
  let geturl = "https://adr.cs-campus.fr/projet-adr/server/api/commands/gettype/" + tab.type;

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

  function updateCommands(id, item_id, newstatus,last_update) {
    // console.log("runing updateCommands");
    let new_commands = [...commands]
    // console.log("commandes", new_commands);
    for (let command of new_commands) {
      command.last_update = last_update;
      // console.log("une commande:", command)
      // console.log(id, command._id);
      if (command._id === id) {
        // console.log("dans la première boucle");
        for (let item of command.content) {
          if (item.id === item_id) {
            item.status = newstatus;
            // console.log("value changed", item.status)
          }
        }
      }
    }
    setCommand(new_commands)
  }

  function renderButton(command, item) {
    // console.log("command", command);
    if (tab.id === "waiting") {
      return (
        <button className="green" onClick={() => handleClick("enkouizine", command, item)}>En cuisine</button>
      )
    } else if (tab.id === "enkouizine") {
      return (
        <>
          <button className="green" onClick={() => handleClick("archived", command, item)}>Prête</button>
          <button className="danger" onClick={() => handleClick("waiting", command, item)}>Attente</button>
        </>
      )
    } else if (tab.id === "archived") {
      return (
        <>
          <button className="danger" onClick={() => handleClick("enkouizine", command, item)}>Desarchiver</button>
        </>
      )
    }
  }

  function handleClick(newstatus, command, item) {

    let last_update = (new Date()).toUTCString()
    // let puturl = "http://localhost:8080/api/commands/changestatus";
    let puturl = "https://adr.cs-campus.fr/projet-adr/server/api/commands/changestatus";
    const toPut = {
      id: command._id,
      item_id: item.id,
      last_update: last_update,
      status: newstatus
    };
    console.log("toPut", toPut);
    axios.put(puturl, toPut)
      .then(() => {
        updateCommands(toPut.id, toPut.item_id, toPut.status, toPut.last_update)
      });
  }

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

  function mapCommand(command, foodtype) {
    return (
      command.content.map(function (item) {
        if (item.status === tab.type & item.type === foodtype) {
          return (
            <div key={item.id} className="article">
              <div className="article_infos">
                {item.name}
                <br />
                <span className="option">
                  {item.option ? item.option : ""}
                </span>
              </div>
              {renderButton(command, item)}
            </div>
          )
        } else {
          return (" ")
        };
      })
    )
  }

  function commandList(foodtype) {
    let commands_array = tab.id === "archived" ? commands.slice(0).reverse() : commands;
    return (
      commands_array.map((command) => {
        let mappingOfCommand = mapCommand(command, foodtype);
        // console.log("contains object? ", mappingOfCommand.some(e => typeof (e) === 'object'));
        if (mappingOfCommand.some(e => typeof (e) === 'object')) { //si un objet est présent dans l'array, cad il y a un article
          return ( // on affiche le conteneur de la commande
            <div key={command._id} className="commande">
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
      <div className="ecran_commands">
        <div className="left side ">
          <h2>Pizzas</h2>
          <div className="commands">
            {commandList("pizzas")}
          </div>
        </div>
        <div className="right side">
          <h2>Fritures</h2>
          <div className="commands">
            {commandList("fritures")}
          </div>
        </div>
      </div>

    </main>
  );
}