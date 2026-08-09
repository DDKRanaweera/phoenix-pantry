export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function formatDate(dateString) {
  const date = parseLocalDate(dateString);

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getExpiryStatus(expiryDate) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const expiry = parseLocalDate(expiryDate);

  expiry.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return {
      text: `❌ Expired ${Math.abs(diffDays)} day(s) ago`,
      color: "#d32f2f",
      diffDays,
    };
  }

  if (diffDays === 0) {
    return {
      text: "⚠ Expires Today",
      color: "#f57c00",
      diffDays,
    };
  }

  if (diffDays === 1) {
    return {
      text: "🟡 Expires Tomorrow",
      color: "#f9a825",
      diffDays,
    };
  }

  if (diffDays <= 7) {
    return {
      text: `🟠 ${diffDays} days left`,
      color: "#ef6c00",
      diffDays,
    };
  }

  return {
    text: `🟢 ${diffDays} days left`,
    color: "#2e7d32",
    diffDays,
  };
}

export function getExpiryCategory(expiryDate) {
  const { diffDays } = getExpiryStatus(expiryDate);

  if (diffDays < 0) {
    return "expired";
  }

  if (diffDays === 0) {
    return "today";
  }

  if (diffDays <= 3) {
    return "within3Days";
  }

  if (diffDays <= 7) {
    return "within7Days";
  }

  return "healthy";
}