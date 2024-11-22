// Item component

export default function Item({ item, deleteItem, handleToggleItem }) {
  function handleDelete(e) {
    e.preventDefault();
    deleteItem(item.id);
  }
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {/* {item.name} */}
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}
