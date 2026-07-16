import AddPantryItem from "./AddPantryItem";
import PantryList from "./PantryList";

function Dashboard({
  items,
  onSave,
  onDelete,
  onEdit,
  editingItem,
}) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  let expired = 0;
  let todayCount = 0;
  let weekCount = 0;

  items.forEach((item) => {
    const [year, month, day] = item.expiry.split("-").map(Number);
    const expiry = new Date(year, month - 1, day);

    expiry.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      expired++;
    } else if (diffDays === 0) {
      todayCount++;
    } else if (diffDays <= 7) {
      weekCount++;
    }
  });

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>📊 Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>📦 Pantry Items</h2>
          <h1>{items.length}</h1>
        </div>

        <div className="stat-card">
          <h2>⚠ Expiring Today</h2>
          <h1>{todayCount}</h1>
        </div>

        <div className="stat-card">
          <h2>🟠 Expiring This Week</h2>
          <h1>{weekCount}</h1>
        </div>

        <div className="stat-card">
          <h2>❌ Expired</h2>
          <h1>{expired}</h1>
        </div>
      </div>

      <AddPantryItem
        onSave={onSave}
        editingItem={editingItem}
      />

      <PantryList
        items={items}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Dashboard;