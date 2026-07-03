import "./App.css";
import { login } from "./services/auth";

function App() {
  async function handleLogin() {
    try {
      const user = await login();
      alert(`Welcome ${user.displayName}!`);
    } catch (error) {
      alert("Login cancelled or failed.");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Phoenix Pantry</h1>

        <p>
          Helping families reduce food waste.
        </p>

        <button onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default App;