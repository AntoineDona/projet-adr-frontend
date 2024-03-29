import React, { useState } from "react"

export default function Menu({command, addCommand, tab, setTab}) {
    let complementary_tab = "fritures";

    const [contenu] = useState({
        pizzas: ["Marga", "Végé", "Reine", "Poulet", "PP", "Kebab", "PC", "Raclette", "3F", "Orientale", "Beouf", "Saumon", "Tartif", "CM"],
        fritures: ["Frites", "Onion Rings", "Calamar", "Wings", "Nems", "Nuggets"," "," "," "," "," "," "," "],
        options: ["Vegan", "sans salade", "Base tomate", "Base crème"," "," "," "," "," "," "," "," "," "]
    })

    if (tab === "options") {
        return (
            <div className={"table_selection"}>
                {
                    contenu.options.map(function (option,i) {
                        return (
                            <button key={i} className="item" onClick={() => {
                                console.log(command.at(-1))
                                addCommand(command.slice(0, -1).concat(
                                    [{
                                        "id": command.at(-1).id,
                                        "name": command.at(-1).name,
                                        "type": command.at(-1).type,
                                        "status": "waiting",
                                        "last_update": command.at(-1).last_update,
                                        "option": command.at(-1).option ? command.at(-1).option + ", " + option : "option " + option,
                                    }
                                    ]));

                            }}>{option}</button>
                        )
                    })
                }
                <button className="special_btn" onClick={() => setTab("pizzas")}>Pizzas</button>
                <button className="special_btn" onClick={() => setTab("fritures")}>Fritures</button>
                <button className="special_btn selected">Options</button>
            </div>
        )
    } else {
        let toAdd = <></>
        if (tab === "pizzas"){
            complementary_tab="fritures";
        } else if (tab === "fritures") {
            complementary_tab="pizzas";
            toAdd= <button className="special_btn selected">Fritures</button>
        }
        return (
            <div className={"table_selection"}>
                {
                    contenu[tab].map(function (item,i) {
                        return (
                            <button key={i} className="item" onClick={() => {
                                addCommand([
                                    ...command,
                                    {
                                        "id": command.length,
                                        "name": item,
                                        "type": tab,
                                        "status": "waiting",
                                        "last_update": (new Date()).toUTCString(),
                                        "option": undefined
                                    }
                                ]);
                                console.log(command)
                            }}>{item}</button>
                        )
                    })
                }
                <button className="special_btn" onClick={() => setTab(complementary_tab)}>{complementary_tab.charAt(0).toUpperCase() + complementary_tab.slice(1)}</button>
                {toAdd}
                <button className="special_btn" onClick={() => setTab("options")}>Options</button>
                </div>
        )
    }
}

