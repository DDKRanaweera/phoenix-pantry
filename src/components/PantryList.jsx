function PantryList({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="card" style={{ marginTop: "30px" }}>
        <h2>My Pantry</h2>
        <p>No pantry items yet.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h2>My Pantry</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>{item.name}</h3>

          <p>Quantity: {item.quantity}</p>

          <p>Expiry: {item.expiry}</p>

          <button
            onClick={() => onDelete(item.id)}

            style={{
                  marginTop: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
             borderRadius: "6px",
             cursor: "pointer",
             }}
            >
           🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PantryList;