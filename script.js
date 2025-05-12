document.addEventListener('DOMContentLoaded', () => {
  const calendarView = document.getElementById('calendar-view');
  const detailView = document.getElementById('detail-view');
  const calendar = document.getElementById('calendar');
  const selectedDateElem = document.getElementById('selected-date');
  const entryForm = document.getElementById('entry-form');
  const backButton = document.getElementById('back-button');

  let currentDate = new Date();
  let selectedDate = null;

  function generateCalendar(date) {
    calendar.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    for (let i = 0; i < startDay; i++) {
      const blank = document.createElement('div');
      calendar.appendChild(blank);
    }

    for (let i = 1; i <= totalDays; i++) {
      const day = document.createElement('div');
      day.classList.add('day');
      day.textContent = i;
      day.addEventListener('click', () => {
        selectedDate = new Date(year, month, i);
        showDetailView();
      });
      calendar.appendChild(day);
    }
  }

  function showDetailView() {
    calendarView.classList.add('hidden');
    detailView.classList.remove('hidden');
    const dateStr = selectedDate.toISOString().split('T')[0];
    selectedDateElem.textContent = dateStr;

    const data = JSON.parse(localStorage.getItem(dateStr)) || {};
    entryForm.activity.value = data.activity || '';
    entryForm.mood.value = data.mood || 'green';
    entryForm.money.value = data.money || '';
    entryForm.querySelectorAll('input[name="tags"]').forEach(checkbox => {
      checkbox.checked = (data.tags || []).includes(checkbox.value);
    });
  }

  function showCalendarView() {
    detailView.classList.add('hidden');
    calendarView.classList.remove('hidden');
  }

  entryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateStr = selectedDate.toISOString().split('T')[0];
    const activity = entryForm.activity.value;
    const mood = entryForm.mood.value;
    const money = entryForm.money.value;
    const tags = Array.from(entryForm.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value);

    const data = { activity, mood, money, tags };
    localStorage.setItem(dateStr, JSON.stringify(data));
    alert('資料已儲存！');
    showCalendarView();
  });

  backButton.addEventListener('click', () => {
    showCalendarView();
  });

  generateCalendar(currentDate);
});
