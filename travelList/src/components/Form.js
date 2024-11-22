import { useState } from "react";

// Form component
export default function Form({ addItem }) {
  //controlled elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // event handled for submit event
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      alert("Please enter a description!");
      return;
    }

    const newItem = { description, quantity, packed: false, id: Date.now() };
    addItem(newItem);
    setDescription("");
    setQuantity(1);
    console.log(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <button>Add</button>
    </form>
  );
}
