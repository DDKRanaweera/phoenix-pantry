function PantryList({ items, onDelete, onEdit }) {
  function getExpiryStatus(expiryDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = expiryDate.split("-").map(Number);
    const expiry = new Date(year, month - 1, day);
    expiry.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return {
        text: `❌ Expired ${Math.abs(diffDays)} day(s) ago`,
        color: "#d32f2f",
      };
    }

    if (diffDays === 0) {
      return {
        text: "⚠ Expires Today",
        color: "#f57c00",
      };
    }

    if (diffDays === 1) {
      return {
        text: "🟡 Expires Tomorrow",
        color: "#f9a825",
      };
    }

    if (diffDays <= 7) {
      return {
        text: `🟠 ${diffDays} days left`,
        color: "#ef6c00",
      };
    }

    return {
      text: `🟢 ${diffDays} days left`,
      color: "#2e7d32",
    };
  }

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (items.length === 0) {
    return (
      <div className="card" style={{ marginTop: "30px" }}>
        <h2>📋 My Pantry</h2>

        <h3>No matching pantry items found.</h3>

        <p>Try searching with a different name or add a new pantry item.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h2>📋 My Pantry</h2>

      {items.map((item) => {
        const status = getExpiryStatus(item.expiry);

        return (
          <div
            key={item.id}
            className="list-item"
          >
            <h2>{item.name}</h2>

            <p>
              <strong>🏷 Category:</strong>{" "}
              {item.category || "Pantry"}
            </p>

            <p>
              <strong>📦 Quantity:</strong> {item.quantity}
            </p>

            <p>
              <strong>📅 Expiry:</strong>{" "}
              {formatDate(item.expiry)}
            </p>

            <p
              style={{
                color: status.color,
                fontWeight: "bold",
              }}
            >
              {status.text}
            </p>

            <div className="list-buttons">
              <button onClick={() => onEdit(item)}>
                ✏ Edit
              </button>

              <button
                onClick={() => onDelete(item.id)}
                style={{
                  background: "#d32f2f",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PantryList;