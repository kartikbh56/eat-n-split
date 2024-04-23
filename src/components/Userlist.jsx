/* eslint-disable react/prop-types */
import "../styles.css";
import "../friends";
import { useState } from "react";

export default function Userlist({friends, setFriends, selectedUser, setSelectedUser}) {
  const [addBtnActive, setAddBtnActive] = useState(false);
  const [newFriend, setNewFriend] = useState({ name: "", image: "" });

  function onToggle(id) {
    selectedUser === id ? setSelectedUser(null) : setSelectedUser(id);
  }

  function handleAddBtn(e) {
    e.preventDefault();
    setAddBtnActive(!addBtnActive);
  }

  function handleAddFriend(e) {
    e.preventDefault();
    newFriend.name && 
    setFriends([
      ...friends,
      { ...newFriend, id: friends[friends.length - 1].id + 1, balance: 0 },
    ]);
    setNewFriend({ name: "", image: "" });
    setAddBtnActive(!addBtnActive);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends.map((f) => (
          <User
            key={f.id}
            id={f.id}
            imgUrl={f.image}
            name={f.name}
            balance={f.balance}
            selectedState={selectedUser === f.id}
            onToggle={onToggle}
          />
        ))}

        {addBtnActive ? (
          <form className="form-add-friend">
            <label>👫 Friend name</label>
            <input
              type="text"
              value={newFriend.name}
              onChange={(e) =>
                setNewFriend({ ...newFriend, name: e.target.value, image:e.target.value && `https://api.dicebear.com/8.x/initials/svg?seed=${e.target.value}&chars=1` })
              }
            />
            <label> 🌐 Image URL</label>
            <input
              type="text"
              value={newFriend.image}
              onChange={(e) =>
                setNewFriend({ ...newFriend, image: e.target.value })
              }
            />
            <button
              className="button"
              onClick={(e) => {
                handleAddFriend(e);
              }}
            >
              Add
            </button>
            <button className="button" onClick={(e) => handleAddBtn(e)}>
              close
            </button>
          </form>
        ) : (
          <button className="button" onClick={handleAddBtn}>
            Add friend
          </button>
        )}
      </ul>
    </div>
  );
}
function User({ id, imgUrl, name, balance, onToggle, selectedState }) {
  return (
    <li className={selectedState ? "selected" : ""}>
      <img src={imgUrl} alt={name} />
      <h3>{name}</h3>
      {balance === 0 && <p>You and {name} are even</p>}
      {balance < 0 && (
        <p className="red">
          You owe {name} ₹{Math.abs(balance)}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you ₹{balance}
        </p>
      )}
      <button className="button" onClick={() => onToggle(id)}>
        {selectedState ? "close" : "select"}
      </button>
    </li>
  );
}
