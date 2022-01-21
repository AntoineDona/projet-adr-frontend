import React, { useState } from "react"

export default function Menu({commands, addCommand }) {
    const [tab, setTab] = useState("pizzas");
    let complementary_tab = "fritures";

    const [contenu] = useState({
        pizzas: ["Marga", "Végé", "Reine", "Poulet", "PP", "Kebab", "PC", "Raclette", "3F", "Orientale", "Beouf", "Saumon", "Tartif", "CM"],
        fritures: ["Frites", "Onion Rings", "Calamar", "Wings", "Nems", "Nuggets"," "," "," "," "," "," "," "," "],
        options: ["Vegan", "sans salade", "Base tomate", "Base crème"," "," "," "," "," "," "," "," "," "," "]
    })

    if (tab === "options") {
        return (
            <div className={"table_selection"}>
                {
                    contenu.options.map(function (option) {
                        return (
                            <button className="item" onClick={() => {
                                console.log(commands.at(-1))
                                addCommand(commands.slice(0, -1).concat(
                                    [{
                                        "id": commands.at(-1).id,
                                        "name": commands.at(-1).name,
                                        "type": commands.at(-1).type,
                                        "status": "pas commencee",
                                        "last_update": commands.at(-1).last_update,
                                        "option": commands.at(-1).option ? commands.at(-1).option + ", " + option : "option " + option,
                                    }
                                    ]));

                            }}>{option}</button>
                        )
                    })
                }
                <button className="special_btn" onClick={() => setTab("pizzas")}>Pizzas</button>
                <button className="special_btn" onClick={() => setTab("fritures")}>Fritures</button>
            </div>
        )
    } else {
        if (tab === "pizzas"){
            complementary_tab="fritures";
        } else if (tab === "fritures") {
            complementary_tab="pizzas";
        }
        return (
            <div className={"table_selection"}>
                {
                    contenu[tab].map(function (item) {
                        return (
                            <button className="item" onClick={() => {
                                addCommand([
                                    ...commands,
                                    {
                                        "id": commands.length,
                                        "name": item,
                                        "type": tab,
                                        "status": "pas commencee",
                                        "last_update": (new Date()).toUTCString(),
                                        "option": undefined
                                    }
                                ]);
                                console.log(commands)
                            }}>{item}</button>
                        )
                    })
                }
                <button className="special_btn" onClick={() => setTab(complementary_tab)}>{complementary_tab.charAt(0).toUpperCase() + complementary_tab.slice(1)}</button>
                <button className="special_btn" onClick={() => setTab("options")}>Options</button>
                </div>
        )
    }
}

