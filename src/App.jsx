import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

import { login, logout } from "./services/auth";
import {
  addPantryItem,
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
} from "./services/pantry";

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

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
    if (editingItem) {
      await updatePantryItem(user.uid, editingItem.id, item);

      alert("Item updated successfully!");
    } else {
      await addPantryItem(user.uid, item);

      alert("Item saved successfully!");
    }

    await loadPantryItems(user.uid);

    setEditingItem(null);

  } catch (error) {
    console.error(error);
    alert("Failed to save item.");
  }
}
  
  async function handleDeleteItem(itemId) {
  try {
    await deletePantryItem(user.uid, itemId);

    await loadPantryItems(user.uid);

    alert("Item deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete item.");
  }
}

function handleEditItem(item) {
  setEditingItem(item);
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
        items={items}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
        editingItem={editingItem}
      />
    </>
  );
}

export default App;