import { useState, useEffect } from "react";

function AddPantryItem({ onSave, editingItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("Pantry");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setExpiry(editingItem.expiry);
      setCategory(editingItem.category || "Pantry");
    } else {
      setName("");
      setQuantity("");
      setExpiry("");
      setCategory("Pantry");
    }
  }, [editingItem]);

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      name,
      quantity: Number(quantity),
      expiry,
      category,
    });

    setName("");
    setQuantity("");
    setExpiry("");
    setCategory("Pantry");
  }

  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h2>
        {editingItem ? "Edit Pantry Item" : "Add Pantry Item"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="Pantry">🥫 Pantry</option>
          <option value="Dairy">🥛 Dairy</option>
          <option value="Fruit">🍎 Fruit</option>
          <option value="Vegetables">🥦 Vegetables</option>
          <option value="Meat">🥩 Meat</option>
          <option value="Frozen">🧊 Frozen</option>
          <option value="Drinks">🥤 Drinks</option>
          <option value="Snacks">🍪 Snacks</option>
          <option value="Bakery">🍞 Bakery</option>
          <option value="Other">📦 Other</option>
        </select>

        <br /><br />

        <button type="submit">
          {editingItem ? "Save Changes" : "Save Item"}
        </button>

      </form>
    </div>
  );
}

export default AddPantryItem;