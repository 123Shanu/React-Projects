// Final stats
export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);
  console.log(percentage);

  return (
    <footer className="stats">
      {percentage !== 100 ? (
        <em>
          {" "}
          You have {numItems} items on your list, and you already packed{" "}
          {/* the below percentage||0 means...sometimes we may have 0 items....then 0/0 becomes NAN....So to avoid it we use percentage||0 */}
          {numPacked} ({percentage} %)
        </em>
      ) : (
        <em>Everything packed🎒,Ready to go🕺</em>
      )}
    </footer>
  );
}
