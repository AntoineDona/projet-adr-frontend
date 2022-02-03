import React, { useState } from "react"
import Header from "./Components/Header"
import Caisse from "./Components/Caisse"
import Commandes from "./Components/Commandes"
import Client from "./Components/Client"


function App() {
  const tabs = [
    {
      "id": "caisse",
      "type": "caisse",
      "title": "Caisse"
    },
    {
      "id": "enkouizine",
      "type": "enkouizine",
      "title": "En Couisine"
    },
    {
      "id": "waiting",
      "type": "waiting",
      "title": "En attente"
    },
    {
      "id": "archived",
      "type": "archived",
      "title": "Archivées"
    },
    {
      "id": "client",
      "type": "client",
      "title": "Clients"
    }
  ]

  // console.log("tab in local storage: ", localStorage.getItem('tab'))
  // console.log("value of tabs :", tabs.at(0))

  if (localStorage.getItem('tab') === null) { 
    localStorage.setItem('tab', JSON.stringify(tabs.at(0))) 
  }

  const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tab')))
  
  let toRender = <Caisse tab={tab}/>
  
  if (tab.id === "caisse") {
    toRender = <Caisse tab={tab} />
  } else if (tab.id === "client" ){
    toRender = <Client />
  } else {
    toRender = <Commandes tab={tab} />
  }

  return (
    <>
      <Header
        tabs={tabs}
        currentTab={tab}
        setTab={setTab}
      />
      {toRender}
    </>
  );
}

export default App;
