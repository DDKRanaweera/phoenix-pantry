import { useState } from "react";

function AddPantryItem({ onSave }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      name,
      quantity,
      expiry,
    });

    setName("");
    setQuantity("");
    setExpiry("");
  }

  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h2>Add Pantry Item</h2>

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

        <button type="submit">
          Save Item
        </button>

      </form>
    </div>
  );
}

export default AddPantryItem;