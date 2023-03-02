import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");

  // function to fetch items from server
  async function fetchItems() {
    const response = await fetch("http://localhost:8000/items");
    const data = await response.json();
    setItems(data);
  }

  // fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // function to add item to server
  async function addItem() {
    const response = await fetch("http://localhost:8000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: inputText, completed: false })
    });
    const data = await response.json();
    setItems(data);
    setInputText("");
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
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
          <iframe width="200" height="100" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;