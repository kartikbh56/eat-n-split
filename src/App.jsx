import './styles.css';
import './components/Userlist'
import './components/SplitBill'
import Userlist from './components/Userlist';
import { useState } from 'react';
import { Friends } from "./friends";
import SplitBill from './components/SplitBill';
export default function App() {
  const [friends, setFriends] = useState([...Friends]);
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className='app'>
      <Userlist friends={friends} setFriends={setFriends} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      {selectedUser &&
        <SplitBill selectedUser={selectedUser} friends={friends} setFriends={setFriends} />}
    </div>
  )
}