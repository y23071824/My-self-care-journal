
const calendar = document.getElementById("calendar");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDay = new Date(year, month, 1).getDay();

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
let html = "<div class='row header'>" + weekdays.map(day => `<div class='cell'>${day}</div>`).join('') + "</div>";

let row = "<div class='row'>";
for (let i = 0; i < firstDay; i++) {
  row += "<div class='cell'></div>";
}

for (let d = 1; d <= daysInMonth; d++) {
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  row += `<div class='cell'><a href="daily.html?date=${dateStr}">${d}</a></div>`;
  if ((firstDay + d) % 7 === 0) {
    row += "</div><div class='row'>";
  }
}
row += "</div>";
html += row;
calendar.innerHTML = html;
