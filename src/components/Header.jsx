function Header({ user, onLogout }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#2E7D32",
        color: "white",
      }}
    >
      <h2>Phoenix Pantry</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        )}

        <span>{user?.displayName}</span>

        <button
          onClick={onLogout}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;