import axios from "axios"
import { useEffect, useState } from "react"

export default function Commands({ tab }) {

  const [commands, setCommand] = useState([])
  // let geturl = "http://localhost:8080/api/commands/gettype/" + tab.type;
  let geturl = "https://adr.cs-campus.fr/projet-adr/server/api/commands/gettype/" + tab.type;

  useEffect(() => {
    console.log("running useEffect");
    const getCommands = () => {
      axios.get(geturl)
        .then(res => {
          setCommand(res.data);
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    getCommands();
  }, [setCommand, geturl])

  function updateCommands(id,item_id,newstatus){
    // console.log("runing updateCommands");
    let new_commands = [...commands]
    // console.log("commandes", new_commands);
    for (let command of new_commands){
      // console.log("une commande:", command)
      // console.log(id, command._id);
      if (command._id === id){
        // console.log("dans la première boucle");
        for(let item of command.content){
          if (item.id === item_id){
            item.status = newstatus;
            // console.log("value changed", item.status)
          }
        }
      }
    }
    setCommand(new_commands)
  }

  function renderButton(command,item){
    // console.log("command", command);
    if (tab.id === "waiting") {
      return(
        <button className="green" onClick={() => handleClick("enkouizine",command,item)}>En cuisine</button>
      )
    } else if (tab.id === "enkouizine") {
      return(
        <>
          <button className="green" onClick={()=>handleClick("archived",command,item)}>Prête</button>
          <button className="danger" onClick={() =>handleClick("waiting",command,item)}>Attente</button>
        </>
      )
    } else if (tab.id === "archived"){
      return(
        <>
          <button className="danger" onClick={() =>handleClick("enkouizine",command,item)}>Desarchiver</button>
        </>
      )
    }
  }

  function handleClick(newstatus,command,item) {

    // let puturl = "http://localhost:8080/api/commands/changestatus";
    let puturl = "https://adr.cs-campus.fr/projet-adr/server/api/commands/changestatus";
    const toPut = { 
      id:command._id,
      item_id:item.id,
      status: newstatus };
    console.log("toPut",toPut);
    axios.put(puturl, toPut)
        .then(() => {
          updateCommands(toPut.id, toPut.item_id, toPut.status)
        });
  }

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
              {renderButton(command,item)}
            </div>
          )
        } else {
          return (" ")
        };
      })
    )
  }

  function articleList(foodtype) {
    return (
      commands.map((command) => {
        let mappingOfCommand = mapCommand(command, foodtype);
        // console.log("contains object? ", mappingOfCommand.some(e => typeof (e) === 'object'));
        if (mappingOfCommand.some(e => typeof (e) === 'object')) {
          return (
            <div key={command._id} className="commande">
              <h3>{command.name === " " ? "Sans Nom" : command.name}</h3>
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
      <div className="ctnr_commands">
        <div className="left side ">
          <h2>Pizzas</h2>
          {articleList("pizzas")}
        </div>
        <div className="right side">
          <h2>Fritures</h2>
          {articleList("fritures")}
        </div>
      </div>

    </main>
  );
}