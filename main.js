
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
    }

    static get observedAttributes() {
        return ['view'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const view = this.getAttribute('view') || 'monthly';
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css">
            <div id="calendar-container"></div>
        `;
        if (view === 'monthly') {
            this.renderMonthlyCalendar();
        } else {
            this.renderWeeklyCalendar();
        }
    }

    renderMonthlyCalendar() {
        const container = this.shadowRoot.querySelector('#calendar-container');
        const monthYear = this.currentDate.toLocaleString('ko-KR', { month: 'long', year: 'numeric' });
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

        let calendarHtml = `<table class="calendar-table"><thead><tr>`;
        weekdays.forEach(day => {
            calendarHtml += `<th>${day}</th>`;
        });
        calendarHtml += `</tr></thead><tbody><tr>`;

        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarHtml += `<td></td>`;
        }

        let dayCounter = firstDayOfMonth;
        for (let i = 1; i <= daysInMonth; i++) {
            if (dayCounter % 7 === 0 && i !== 1) {
                calendarHtml += `</tr><tr>`;
            }
            const dateStr = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            calendarHtml += `
                <td class="calendar-day">
                    <div class="calendar-day-header">${i}</div>
                    ${this.getEventsForDate(dateStr)}
                </td>`;
            dayCounter++;
        }

        while (dayCounter % 7 !== 0) {
            calendarHtml += `<td></td>`;
            dayCounter++;
        }

        calendarHtml += `</tr></tbody></table>`;
        container.innerHTML = calendarHtml;
        
        // Update title in parent document if it exists
        const titleEl = document.querySelector('#monthly-view-title');
        if (titleEl) titleEl.textContent = monthYear;
    }
    
    renderWeeklyCalendar() {
        const container = this.shadowRoot.querySelector('#calendar-container');
        const weekStart = new Date(this.currentDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        
        const weekYear = this.currentDate.getFullYear();
        const weekMonth = this.currentDate.toLocaleString('ko-KR', { month: 'long' });
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

        let calendarHtml = `<table class="calendar-table"><thead><tr>`;
        weekdays.forEach(day => {
            calendarHtml += `<th>${day}</th>`;
        });
        calendarHtml += `</tr></thead><tbody><tr>`;

        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(day.getDate() + i);
            const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            calendarHtml += `
                <td class="calendar-day">
                    <div class="calendar-day-header">${day.getDate()}</div>
                    ${this.getEventsForDate(dateStr)}
                </td>`;
        }

        calendarHtml += `</tr></tbody></table>`;
        container.innerHTML = calendarHtml;

        // Update title in parent document
        const titleEl = document.querySelector('#weekly-view-title');
        if (titleEl) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            titleEl.textContent = `${weekStart.toLocaleDateString('ko-KR')} ~ ${weekEnd.toLocaleDateString('ko-KR')}`;
        }
    }


    getEventsForDate(date) {
        const eventsForDate = events[date] || [];
        const countryEl = document.querySelector('input[name="country"]:checked');
        if (!countryEl) return '';
        const country = countryEl.value;
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
    const monthlyCalendar = document.createElement('stock-calendar');
    monthlyCalendar.setAttribute('view', 'monthly');
    document.querySelector('#monthly-calendar').appendChild(monthlyCalendar);

    const weeklyCalendar = document.createElement('stock-calendar');
    weeklyCalendar.setAttribute('view', 'weekly');
    document.querySelector('#weekly-calendar').appendChild(weeklyCalendar);

    document.querySelector('#apply-filters').addEventListener('click', () => {
        monthlyCalendar.render(); 
        weeklyCalendar.render();
    });
    
    document.querySelector('#prev-month').addEventListener('click', () => {
        monthlyCalendar.currentDate.setMonth(monthlyCalendar.currentDate.getMonth() - 1);
        monthlyCalendar.render();
    });

    document.querySelector('#next-month').addEventListener('click', () => {
        monthlyCalendar.currentDate.setMonth(monthlyCalendar.currentDate.getMonth() + 1);
        monthlyCalendar.render();
    });
    
    document.querySelector('#prev-week').addEventListener('click', () => {
        weeklyCalendar.currentDate.setDate(weeklyCalendar.currentDate.getDate() - 7);
        weeklyCalendar.render();
    });

    document.querySelector('#next-week').addEventListener('click', () => {
        weeklyCalendar.currentDate.setDate(weeklyCalendar.currentDate.getDate() + 7);
        weeklyCalendar.render();
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

