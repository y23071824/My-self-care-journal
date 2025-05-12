document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");

  if (!calendar) return;

  // 取得今天日期
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0 = 一月
  const monthName = `${year} 年 ${month + 1} 月`;

  // 取得本月總天數
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 標題
  const title = document.createElement("h2");
  title.textContent = monthName;
  title.style.marginTop = "1rem";
  title.style.marginBottom = "1rem";
  calendar.appendChild(title);

  // 動態產生每一天
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.textContent = `${month + 1} 月 ${i} 日`;
    day.style.marginBottom = "8px";
    day.style.cursor = "pointer";
    day.style.color = "#2a3f4f";
    day.addEventListener("click", () => {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      window.location.href = `daily.html?date=${dateStr}`;
    });
    calendar.appendChild(day);
  }
});
