import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

//button component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  //state for list of friends
  const [friends, setFriends] = useState(initialFriends);
  // state for showing friend form
  const [showAddFriend, setShowAddFriend] = useState(false);
  //selected friend
  const [selectedFriend, setSelectedFriend] = useState(null);

  //handle splitbill with friend
  //if there is already a selected friend then null, otherwise set as selected friend so that the form split bill will be rendered.
  function handleSelectedFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);

    // console.log(selectedFriend);
  }

  //setFriends function
  function addNewFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    //after adding hide the addForm
    setShowAddFriend(false);
  }

  //handleSplitBill
  function handleSplitBill(value) {
    console.log(value);
    // setFriends((friends)=>friends.map(friend)=>friend.id===selectedFriend.id?{...friend,balance:value}:friend)
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  //show friend
  function handleShowFriend() {
    setShowAddFriend((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelectedFriend}
        />
        {showAddFriend && <FormAddFriend addNewFriend={addNewFriend} />}
        <Button onClick={handleShowFriend}>
          {!showAddFriend ? `Add Friend` : `close`}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key = {selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelection }) {
  //the below gave me error..then I corrected by using ?
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h2>{friend.name}</h2>

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${friend.balance}
        </p>
      )}

      <Button
        onClick={() => {
          onSelection(friend);
          // console.log(friend);
        }}
      >
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
}

//form Component

function FormAddFriend({ addNewFriend }) {
  //controlled elements for name and image

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    // console.log(newFriend);
    addNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

//splitting bill
function FormSplitBill({ selectedFriend, onSplitBill }) {
  //controlled elements state
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidBuUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : 0;
  const [whoIspaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIspaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split Bill with {selectedFriend.name}</h2>

      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expenses</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidBuUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>Who's going to pay the bill?</label>
      <select
        value={whoIspaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
