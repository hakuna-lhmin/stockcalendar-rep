
// Sample Data
const events = {
    '2024-07-01': [
        { type: 'holiday', country: 'usa', title: '미국 독립기념일' },
        { type: 'economic-indicator', country: 'korea', title: '한국 소비자물가지수' },
    ],
    '2024-07-15': [
        { type: 'earnings-report', country: 'usa', title: 'A사 2분기 실적발표' },
    ],
    '2024-07-20': [
        { type: 'economic-meeting', country: 'korea', title: '한국은행 금융통화위원회' },
    ]
};

class StockCalendar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentDate = new Date();
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css">
            <div id="monthly-calendar-container"></div>
            <div id="weekly-calendar-container"></div>
        `;
        this.renderMonthlyCalendar();
        this.renderWeeklyCalendar();
    }

    renderMonthlyCalendar() {
        const container = this.shadowRoot.querySelector('#monthly-calendar-container');
        const monthYear = this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        let calendarHtml = `<h3>${monthYear}</h3><div class="calendar">`;

        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarHtml += `<div class="calendar-day"></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            calendarHtml += `
                <div class="calendar-day">
                    <div class="calendar-day-header">${i}</div>
                    ${this.getEventsForDate(dateStr)}
                </div>`;
        }

        calendarHtml += `</div>`;
        container.innerHTML = calendarHtml;
    }
    
    renderWeeklyCalendar() {
    const container = this.shadowRoot.querySelector('#weekly-calendar-container');
    const weekStart = new Date(this.currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekYear = this.currentDate.toLocaleString('default', { year: 'numeric' });
    const weekMonth = this.currentDate.toLocaleString('default', { month: 'long' });


    let calendarHtml = `<h3>${weekMonth} ${weekYear}</h3><div class="calendar">`;

    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + i);
        const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
        calendarHtml += `
            <div class="calendar-day">
                <div class="calendar-day-header">${day.getDate()}</div>
                ${this.getEventsForDate(dateStr)}
            </div>`;
    }

    calendarHtml += `</div>`;
    container.innerHTML = calendarHtml;
    }


    getEventsForDate(date) {
        const eventsForDate = events[date] || [];
        const country = document.querySelector('input[name="country"]:checked').value;
        const eventTypes = Array.from(document.querySelectorAll('input[name="event-type"]:checked')).map(el => el.value);

        return eventsForDate
            .filter(event => event.country === country && eventTypes.includes(event.type))
            .map(event => `
                <div class="event ${event.type}">
                    ${event.title}
                    <button class="impact-analysis-btn" data-date="${date}" data-title="${event.title}">영향분석</button>
                </div>
            `).join('');
    }
}


customElements.define('stock-calendar', StockCalendar);

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.createElement('stock-calendar');
    document.querySelector('#monthly-calendar').appendChild(calendar);

    document.querySelector('#apply-filters').addEventListener('click', () => {
        calendar.render(); 
    });
    
    document.querySelector('#prev-month').addEventListener('click', () => {
        const stockCalendar = document.querySelector('stock-calendar');
        stockCalendar.currentDate.setMonth(stockCalendar.currentDate.getMonth() - 1);
        stockCalendar.render();
    });

    document.querySelector('#next-month').addEventListener('click', () => {
        const stockCalendar = document.querySelector('stock-calendar');
        stockCalendar.currentDate.setMonth(stockCalendar.currentDate.getMonth() + 1);
        stockCalendar.render();
    });
    
    document.querySelector('#prev-week').addEventListener('click', () => {
    const stockCalendar = document.querySelector('stock-calendar');
    stockCalendar.currentDate.setDate(stockCalendar.currentDate.getDate() - 7);
    stockCalendar.render();
    });

    document.querySelector('#next-week').addEventListener('click', () => {
        const stockCalendar = document.querySelector('stock-calendar');
        stockCalendar.currentDate.setDate(stockCalendar.currentDate.getDate() + 7);
        stockCalendar.render();
    });


    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('impact-analysis-btn')) {
            const date = event.target.dataset.date;
            const title = event.target.dataset.title;
            openModal(date, title);
        }
    });
    
    document.querySelector('#close-modal').addEventListener('click', closeModal);
    document.querySelector('#modal-backdrop').addEventListener('click', closeModal);

});


function openModal(date, title) {
    const eventData = (events[date] || []).find(e => e.title === title);

    if (eventData) {
        // These would be more detailed in a real app
        document.querySelector('#bullish-factors').textContent = `${title} 발표 시 시장 예상치를 상회하면 주가 상승 요인으로 작용할 수 있습니다.`;
        document.querySelector('#bearish-factors').textContent = `${title} 발표 시 시장 예상치를 하회하면 주가 하락 요인으로 작용할 수 있습니다.`;
    }

    document.querySelector('#impact-analysis-modal').classList.remove('hidden');
    document.querySelector('#modal-backdrop').classList.remove('hidden');
}

function closeModal() {
    document.querySelector('#impact-analysis-modal').classList.add('hidden');
    document.querySelector('#modal-backdrop').classList.add('hidden');
}

