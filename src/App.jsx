import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

import { login, logout } from "./services/auth";
import { addPantryItem, getPantryItems } from "./services/pantry";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  async function handleLogin() {
    try {
      const loggedInUser = await login();
      setUser(loggedInUser);
      await loadPantryItems(loggedInUser.uid);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadPantryItems(userId) {
    try {
      const pantryItems = await getPantryItems(userId);
      setItems(pantryItems);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveItem(item) {
    try {
      await addPantryItem(user.uid, item);
      await loadPantryItems(user.uid);

      alert("Item saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save item.");
    }
  }
  
  useEffect(() => {
  if (user) {
    loadPantryItems(user.uid);
  }
}, [user]);

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <h1>Phoenix Pantry</h1>

          <p>Helping families reduce food waste.</p>

          <button onClick={handleLogin}>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
      />

      <Dashboard
        onSave={handleSaveItem}
        items={items}
      />
    </>
  );
}

export default App;