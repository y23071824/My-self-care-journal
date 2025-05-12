document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");

  if (!calendar) return;

  // 顯示本月1～31號作為示意日曆（簡易版）
  for (let i = 1; i <= 31; i++) {
    const day = document.createElement("div");
    day.textContent = `5月 ${i}日`;
    day.style.marginBottom = "8px";
    day.style.cursor = "pointer";
    day.style.color = "#2a3f4f";
    day.addEventListener("click", () => {
      window.location.href = `daily.html?date=2025-05-${String(i).padStart(2, "0")}`;
    });
    calendar.appendChild(day);
  }
});
