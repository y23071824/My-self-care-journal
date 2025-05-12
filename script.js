document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  for (let i = 1; i <= 31; i++) {
    const day = document.createElement("div");
    day.textContent = `5月 ${i}日`;
    day.addEventListener("click", () => {
      window.location.href = `daily.html?date=2025-05-${String(i).padStart(2, "0")}`;
    });
    calendar.appendChild(day);
  }
});
