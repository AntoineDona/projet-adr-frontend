import React from "react";
import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from '../config';
import useWebSocket from '../websocket/WebSocketHandler';
import {timeSince} from '../utils/time'

export default function Commands({ tab }) {
  // Composant qui affiche des commandes et les gères, correspond à : En cuisine, En attente, Archivés

  const [commands, setCommands] = useState([])

  useWebSocket(setCommands)
  // On ouvre la websocket pour l'onglet, et écoute des changements de la bdd

  let geturl = `${API_URL}/commands/gettype/${tab.type}`;
  //url défini à partir des variables d'environnement du front, dans config.js

  useEffect(() => {
    // S'execute à chaque changement de tab, fetch les données de la bdd
    const getCommands = () => {
      axios.get(geturl)
        .then(res => {
          setCommands(res.data);
        })
        .catch(error => console.error(`Error: ${error}`))
    }
    getCommands();
  },[tab, geturl])

  // Fonction qui servait à mettre à jour le front après avoir envoyé la requete vers la bdd, évitant de faire un get inutile
  // Useless maintenant car reçoit automatiquement un message via la websocket!
  //
  // function updateCommands(id, item_id, newstatus,last_update) {
  //   // console.log("runing updateCommands");
  //   let new_commands = [...commands]
  //   // On créé le nouveau state de commands
  //   for (let command of new_commands) {
  //     command.last_update = last_update;
  //     // on met à jour le last update pour toutes 
  //     if (command._id === id) {
  //       for (let item of command.content) {
  //         if (item.id === item_id) {
  //           item.status = newstatus;
  //         }
  //       }
  //     }
  //   }
  //   setCommands(new_commands)
  // }

  function renderButton(command, item) {
    // Fontion qui gère l'affichage conditionnel des boutons de décision
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

  // Fonction qui gère le click sur les boutons
  function handleClick(newstatus, command, item) {

    let last_update = (new Date()).toUTCString()
    // let puturl = "http://localhost:8080/api/commands/changestatus";
    let putUrl = `${API_URL}/commands/changestatus`;
    const toPut = {
      id: command._id,
      item_id: item.id,
      last_update: last_update,
      status: newstatus
    };
    axios.put(putUrl, toPut)
      // .then(() => { updateCommands(toPut.id, toPut.item_id, toPut.status, toPut.last_update)});
  }

  
  // Fonction qui renvoie la liste des articles d'une commande, d'un certain foodtype (pizza ou friture)
  function mapCommand(command, foodtype) {
    return (
      command.content.map(function (item) {
        if (item.status === tab.type & item.type === foodtype) {
          // Si l'article a le statut de l'onglet en cours et qu'il est du bon foodtype, on le return
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
          // Sinon on return rien
          return null
        };
      })
    )
  }

  // Fonction qui renvoie la liste des commandes d'un certain foodtype (pizza ou friture)
  function commandList(foodtype) {
    let commands_array = tab.id === "archived" ? commands.slice(0).reverse() : commands;
    return (
      commands_array.map((command) => {
        // On map sur toutes les commandes
        let mappingOfCommand = mapCommand(command, foodtype);
        // mappingOfCommand contient tous les articles d'une commande, du bon foodtype (friture ou pizza)

        if (mappingOfCommand.some(e => React.isValidElement(e))) { 
          // Si un element jsx valable est présent dans l'array, i.e s'il y a au moins un article
          // On affiche le conteneur de la commande
          return (
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
        } else { 
          // Sinon, aucun article n'est dans cette tab ou de ce foodtype
          return null
        }
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