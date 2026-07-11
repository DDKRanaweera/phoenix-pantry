import AddPantryItem from "./AddPantryItem";
import PantryList from "./PantryList";

function Dashboard({ onSave, onDelete, items }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <h2>📦 Pantry Items</h2>
          <h1>{items.length}</h1>
        </div>

        <div className="card">
          <h2>⚠️ Expiring Today</h2>
          <h1>0</h1>
        </div>

        <div className="card">
          <h2>🟠 Expiring This Week</h2>
          <h1>0</h1>
        </div>
      </div>

      <AddPantryItem onSave={onSave} />

      <PantryList
        items={items}
        onDelete={onDelete}
      />
    </div>
  );
}

export default Dashboard;