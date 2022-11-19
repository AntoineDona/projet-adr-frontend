import React, { useState } from "react"
import Header from "./Components/Header"
import Caisse from "./Components/Tabs/Caisse/Caisse"
import Commandes from "./Components/Tabs/Commandes"
import Client from "./Components/Tabs/Client"
import {tabs} from "./data/tabs"


function App() {

  // Si on pas encore de tab stockée en local
  if (localStorage.getItem('tab') === null) { 
    // On stock la tab d'accueil: tabs[0]
    localStorage.setItem('tab', JSON.stringify(tabs.at(0))) 
  }

  // Si on refresh la page, on récupère la tab enregistrée en local
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tab')))
  
  //Affichage confitionnel du contenu de la tab
  let TabContent = <Caisse tab={tab}/>
  if (tab.id === "caisse") {
    TabContent = <Caisse tab={tab} />
  } else if (tab.id === "client" ){
    TabContent = <Client/>
  } else {
    TabContent = <Commandes tab={tab} />
  }

  return (
    <>
      <Header
        tabs={tabs}
        currentTab={tab}
        setTab={setTab}
      />
      {TabContent}
    </>
  );
}

export default App;
