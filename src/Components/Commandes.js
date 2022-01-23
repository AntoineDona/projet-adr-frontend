import axios from "axios"
import { useEffect, useState } from "react"

export default function Commands({ tab }) {

  const [commands, setCommand] = useState([])
  // let url = "http://localhost:8080/api/commands/gettype/" + tab.type;
  let url = "https://adr.cs-campus.fr/projet-adr/server/api/commands/gettype/" + tab.type;
  console.log(url)

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

  function mapCommand(command, foodtype) {
    return (
      command.content.map(function (item) {
        if (item.status === tab.type & item.type === foodtype) {
          return (
            <div key={item.id} className="article">{item.name}{item.option ? " - " + item.option : ""}</div>
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
              <h3>{command.name === " " ? "Command sans nom" : "Commande de " + command.name}</h3>
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