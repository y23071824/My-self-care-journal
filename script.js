
document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const summary = document.getElementById("summary");
  const title = document.getElementById("date-title");
  const text = document.getElementById("text");
  const emotion = document.getElementById("emotion");
  const categoryEmotion = document.getElementById("categoryEmotion");
  const categoryLearning = document.getElementById("categoryLearning");
  const categoryMoney = document.getElementById("categoryMoney");
  const money = document.getElementById("money");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = "";
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = document.createElement("div");
    d.className = "day";
    d.textContent = i;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const saved = JSON.parse(localStorage.getItem(dateStr) || "{}");
    if (saved.emotion) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.textContent = saved.emotion;
      d.appendChild(dot);
    }
    d.addEventListener("click", () => {
      title.textContent = `${dateStr} 的記錄`;
      text.value = saved.text || "";
      emotion.value = saved.emotion || "green";
      categoryEmotion.checked = saved.categoryEmotion || false;
      categoryLearning.checked = saved.categoryLearning || false;
      categoryMoney.checked = saved.categoryMoney || false;
      money.value = saved.money || "";

      summary.innerHTML = `
        <strong>摘要：</strong><br>
        情緒：${emotion.options[emotion.selectedIndex].text}<br>
        分類：${[
          categoryEmotion.checked ? "情緒日記" : "",
          categoryLearning.checked ? "學習進度" : "",
          categoryMoney.checked ? "金錢照顧自己" : ""
        ].filter(Boolean).join(" / ")}<br>
        金錢：${money.value} 元<br>
        內容：${text.value}
      `;
      summary.style.display = "block";
      currentDate = dateStr;
    });
    calendar.appendChild(d);
  }
});

let currentDate = "";

function saveData() {
  if (!currentDate) return alert("請先點選日期");
  const data = {
    text: document.getElementById("text").value,
    emotion: document.getElementById("emotion").value,
    categoryEmotion: document.getElementById("categoryEmotion").checked,
    categoryLearning: document.getElementById("categoryLearning").checked,
    categoryMoney: document.getElementById("categoryMoney").checked,
    money: document.getElementById("money").value
  };
  localStorage.setItem(currentDate, JSON.stringify(data));
  alert("已儲存");
  location.reload();
}
