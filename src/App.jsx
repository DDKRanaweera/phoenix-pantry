import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

import { login, logout } from "./services/auth";

function App() {
  const [user, setUser] = useState(null);

  async function handleLogin() {
    try {
      const loggedInUser = await login();
      setUser(loggedInUser);
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

      <Dashboard />
    </>
  );
}

export default App;