import { useState } from "react"
import logo from '../img/logo_musee_b.png'

export default function Header({ tabs, currentTab, setTab }) {
  const [loader, reload] = useState(1)
  if (currentTab.id === "client") {
    return (
      <nav >
        <img style={{position: 'relative', zIndex: 1}} onClick={() => {
          setTab(tabs.at(0));
          localStorage.setItem('tab', JSON.stringify(tabs.at(0)));
        }} src={logo} alt="" id="logo_musee" />
      </nav>
    )
  } else {

    return (
      <nav>
        <img onClick={() => {
          setTab(tabs.at(0));
          console.log("reseted tab")
          localStorage.setItem('tab', JSON.stringify(tabs.at(0)));
        }} src={logo} alt="" id="logo_musee" />
        <ul>
          {tabs.map((tab, i) => {
            return (
              <li key={i}>
                <button className={currentTab.id === tab.id ? "selected" : ""} onClick={() => {
                  setTab(tab);
                  reload(-1 * loader);
                  localStorage.setItem('tab', JSON.stringify(tab));
                }}>{tab.title}</button>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}
