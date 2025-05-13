
let currentDate = "";
let selectedYear, selectedMonth;

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

  const yearSelect = document.createElement("select");
  for (let y = 2020; y <= 2035; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }

  const monthSelect = document.createElement("select");
  for (let m = 0; m < 12; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m + 1;
    monthSelect.appendChild(opt);
  }

  const controls = document.getElementById("calendar-controls");
  controls.appendChild(yearSelect);
  controls.appendChild(monthSelect);

  const today = new Date();
  selectedYear = today.getFullYear();
  selectedMonth = today.getMonth();
  yearSelect.value = selectedYear;
  monthSelect.value = selectedMonth;

  yearSelect.addEventListener("change", () => {
    selectedYear = parseInt(yearSelect.value);
    renderCalendar();
  });
  monthSelect.addEventListener("change", () => {
    selectedMonth = parseInt(monthSelect.value);
    renderCalendar();
  });

  function renderCalendar() {
    calendar.innerHTML = "";
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendar.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const d = document.createElement("div");
      d.className = "day";
      d.textContent = i;
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const saved = JSON.parse(localStorage.getItem(dateStr) || "{}");
      if (saved.emotion) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.textContent = saved.emotion;
        d.appendChild(dot);
      }
      d.addEventListener("click", () => {
        currentDate = dateStr;
        title.textContent = `${dateStr} 的記錄`;
        text.value = saved.text || "";
        emotion.value = saved.emotion || "";
        categoryEmotion.checked = saved.categoryEmotion || false;
        categoryLearning.checked = saved.categoryLearning || false;
        categoryMoney.checked = saved.categoryMoney || false;
        money.value = saved.money || "";
        summary.innerHTML = `
          <strong>摘要：</strong><br>
          情緒：${emotion.value}<br>
          分類：${[
            categoryEmotion.checked ? "情緒日記" : "",
            categoryLearning.checked ? "學習進度" : "",
            categoryMoney.checked ? "金錢照顧自己" : ""
          ].filter(Boolean).join(" / ")}<br>
          金錢：${money.value} 元<br>
          內容：${text.value}
        `;
        summary.style.display = "block";
      });
      calendar.appendChild(d);
    }
  }

  renderCalendar();
});

function saveData() {
  if (!currentDate) {
    alert("請先點選日期");
    return;
  }
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
