// Packing List component
import { useState } from "react";
import Item from "./Item.js";
export default function PackingList({
  items,
  deleteItem,
  handleToggleItem,
  clearList,
}) {
  // controlled elements

  const [sortBy, setSortBy] = useState("input");

  function handleChange(e) {
    console.log(e.target.value);
    setSortBy(e.target.value);
    // setSortBy(e.target.value);
  }

  // function sortByPacked(items){
  //   return [...items.filter((item)=>item.packed),...items.filter((item)=>!item.packed)]
  // const sortByPackedItemsT =items.filter((item)=>item.packed);
  // const sortByPackedItemsF =items.filter((item)=>!item.packed);

  // return [...sortByPackedItemsT,...sortByPackedItemsF];
  // }

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            deleteItem={deleteItem}
            key={item.id}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      {/* sorting , clearing */}
      <div className="actions">
        <select value={sortBy} onChange={handleChange}>
          <option value="input">Sort by input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}
