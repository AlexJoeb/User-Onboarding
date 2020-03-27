import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

import Form from './Form';
import UserList from './UserList';


function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      axios.get('https://reqres.in/api/users')
          .then(({data}) => {
              const userReturn = data.data;
              setUsers([...users, ...userReturn]);
          })
          .catch(err => console.error(err.message));
  }, [])
  
  const addUser = user => {
    setUsers([...users, user]);
  }

  return (
    <div className="App">
      <Form addUser={addUser} users={users} />
      <UserList users={users} />
    </div>
  );
}

export default App;
