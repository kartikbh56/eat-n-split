/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles.css";
export default function SplitBill({ selectedUser, friends, setFriends }) {
  const [billValue, setBillValue] = useState();
  const [yourExpense, setYourExpense] = useState();
  const [selectedUserExpense, setSelectedUserExpense] = useState();
  const [whoIsPaying, setWhoIsPaying] = useState("You");
  const user = friends.find((f) => f.id === selectedUser);
  function splitBill() {
    let balance =
      whoIsPaying === "You"
        ? user.balance + selectedUserExpense
        : user.balance - yourExpense;
    setFriends(
      friends.map((f) =>
        f.id === selectedUser ? { ...f, balance: balance } : f
      )
    );
    setBillValue(0);
    setYourExpense(0);
    setSelectedUserExpense(0);
  }
  return (
    <div>
      <form className="form-split-bill">
        <h2>SPLIT A BILL WITH WITH {user?.name}</h2>
        <label>💰 Bill value</label>
        <input
          type="number"
          value={billValue}
          onChange={(e) => {
            setBillValue((value) => Number(e.target.value));
            setSelectedUserExpense(
              (value) => Number(e.target.value) - yourExpense
            );
          }}
        />
        <label>🧍‍♀️ Your expense</label>
        <input
          type="number"
          min={0}
          value={yourExpense}
          onChange={(e) => {
            if (billValue > e.target.value) {
              setYourExpense(Number(e.target.value));
              setSelectedUserExpense(billValue - Number(e.target.value));
            }
          }}
        />
        <label>👫 {user?.name} expense</label>
        <input
          type="text"
          value={selectedUserExpense}
          onChange={(e) => setSelectedUserExpense(e.target.value)}
          disabled
        />
        <label>🤑 Who is playing the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option>You</option>
          <option>{user.name}</option>
        </select>
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            splitBill();
          }}
        >
          Split Bill
        </button>
      </form>
    </div>
  );
}
