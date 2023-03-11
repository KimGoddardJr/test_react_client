import React, { useState, useEffect } from "react";
import "./App.css";

const ROCKET_BASE = "http://192.168.0.11:8000";
const ITEMS_BASE = `${ROCKET_BASE}/items`;
// const cors = require('cors');

function App() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");

  // function to fetch items from server
  async function fetchItems() {
    const response = await fetch(ITEMS_BASE, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    const data = await response.json();
    //reverse Items
    setItems(data.reverse());
  }

  // fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // function to add item to server
  async function addItem() {
    const response = await fetch(ITEMS_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ title: inputText, completed: false })
    });
    const data = await response.json();
    setItems(data.reverse());
    setInputText("");
  }

  return (
    <div className="container">
      <h1>Patxis and Aras Scheduler</h1>
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <div>
          <li key={item.id}>{item.title}</li>
          {/* add a random image  */}
          <img src="https://picsum.photos/200/300" alt="random image" />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;