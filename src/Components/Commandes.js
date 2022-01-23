import axios from "axios"
import { useEffect, useState } from "react"

export default function Commands({ tab }) {

  const [commands, setCommand] = useState([])
  // let url = "http://localhost:8080/api/commands/gettype/" + tab.type;
  let url = "https://adr.cs-campus.fr/projet-adr/server/api/commands/gettype/" + tab.type;
  console.log(url)

  let buttonToRender = <></>
  if (tab.id === "waiting") {
    console.log("on est attend");
    buttonToRender =
      <button className="green" onClick={handleClick}>En cuisine</button>
  } else if (tab.id === "enkouizine") {
    console.log("on est en kouizine");
    buttonToRender =
      <>
        <button className="green" onClick={handleClick}>Prête</button>
        <button className="danger" onClick={handleClick}>Attente</button>
      </>
  }

  useEffect(() => {
    const getCommands = () => {
      axios.get(url)
        .then(res => {
          setCommand(res.data);
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    getCommands();
  }, [setCommand, url])

  function handleClick() {

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
              {buttonToRender}
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
        console.log("contains object? ", mappingOfCommand.some(e => typeof (e) === 'object'));
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

  console.log(commands)
  return (
    <main>
      <h1>{tab.title}</h1>
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