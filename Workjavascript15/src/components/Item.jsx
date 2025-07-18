import React from "react";
import "./ItemList.css";

const items = [
  { name: "Хурма", color: "#e91e63" },
  { name: "Чеснок", color: "#e91e63" },
  { name: "Шампиньоны", color: "#e91e63" },
  { name: "Яблоки", color: "#e91e63" },
  { name: "Ягоды", color: "#e91e63" },
  { name: "Батарейки", color: "#0097a7" },
  { name: "Бумажные полотенца", color: "#0097a7" },
  { name: "Ватные диски", color: "#0097a7" },
  { name: "Ватные палочки", color: "#0097a7" },
  { name: "Влажные салфетки", color: "#0097a7" },
  { name: "Гель для душа", color: "#0097a7" },
  { name: "Губки", color: "#0097a7" },
];

function ItemList() {
  return (
    <div className="item-list-container">
      <div className="header">
        <span className="abc-title">ABC</span>
        <div className="colors">
          <div className="color-box" style={{ background: "#e91e63" }}></div>
          <div className="color-box" style={{ background: "#0097a7" }}></div>
          <div className="color-box" style={{ background: "#8bc34a" }}></div>
        </div>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            <div className="dot" style={{ background: item.color }}></div>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
