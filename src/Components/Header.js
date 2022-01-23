import { useState } from "react"
import logo from '../img/logo_musee_b.png'

export default function Header({ tabs, setTab }) {
  const [loader, reload] = useState(1)
  return (
    <nav>
      <img src={logo} alt="" id="logo_musee" />
      <ul>
        {tabs.map((tab, i) => {
          return (
            <li key={i}>
              <button onClick={() => {
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
