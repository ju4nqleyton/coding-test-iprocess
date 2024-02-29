import { useState, useEffect } from "react";
import { fetchAllUsers } from "../services/users";
import Header from "../components/Header";
import Table from "../components/Table";

export default function Home() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const data = await fetchAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header />
      {users.length === 0 ? (
        <p>Loading List Employeees...</p>
      ) : (
        <Table users={users} />
      )}
    </>
  );
}
