// AdminPanel.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.email}>
            {user.firstName} {user.lastName} - {user.email} - {user.emailVerified ? "Verified" : "Not Verified"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
