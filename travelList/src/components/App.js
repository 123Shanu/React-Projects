import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
//test array
//
// const initialItems = [
// { id: 1, description: "Passports", quantity: 2, packed: true },
// { id: 2, description: "Socks", quantity: 12, packed: false },
// { id: 3, description: "Charger", quantity: 5, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);

  function addItem(newItem) {
    setItems([...items, newItem]);
  }
  // delete item
  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearList() {
    const confirmed = window.confirm("Are you sure to clear all the items...");
    confirmed && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        items={items}
        deleteItem={deleteItem}
        handleToggleItem={handleToggleItem}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
