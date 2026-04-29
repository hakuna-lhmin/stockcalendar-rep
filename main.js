// Expanded Sample Data with more details and types
const eventsData = [
    { date: '2024-07-01', type: 'ipo', country: 'korea', title: '에이비씨상사', detail: '공모가: 15,000원 / 주관사: 신한투자증권' },
    { date: '2024-07-01', type: 'holiday', country: 'usa', title: '미국 휴장', detail: '독립기념일 대체 휴무' },
    { date: '2024-07-02', type: 'dividend', country: 'korea', title: '삼성전자 배당', detail: '분기 배당금 지급 예정' },
    { date: '2024-07-04', type: 'economic', country: 'usa', title: '비농업 고용지수', detail: '예상치: 200K / 이전: 220K' },
    { date: '2024-07-10', type: 'earnings', country: 'usa', title: '델타항공 실적', detail: '개장 전 발표 예정' },
    { date: '2024-07-15', type: 'rights', country: 'korea', title: '한국테크 유상증자', detail: '신주배정기준일' },
    { date: '2024-07-20', type: 'ipo', country: 'korea', title: '지에스리테일 신규상장', detail: '코스피 시장 상장' },
    { date: '2024-07-25', type: 'economic', country: 'korea', title: 'GDP 성장률 발표', detail: '2분기 속보치 발표' },
];

const badgeMap = {
    ipo: '공',
    dividend: '배',
    earnings: '실',
    economic: '경',
    rights: '증',
    holiday: '휴'
};

class CalendarManager {
    constructor() {
        this.currentDate = new Date(2024, 6, 1); // Fixed to July 2024 for demo consistency
        this.currentView = 'monthly';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        document.querySelector('#btn-monthly').onclick = () => this.switchView('monthly');
        document.querySelector('#btn-weekly').onclick = () => this.switchView('weekly');
        document.querySelector('#btn-list').onclick = () => this.switchView('list');

        document.querySelector('#prev-period').onclick = () => this.movePeriod(-1);
        document.querySelector('#next-period').onclick = () => this.movePeriod(1);
        document.querySelector('#today-btn').onclick = () => {
            this.currentDate = new Date();
            this.render();
        };

        document.querySelector('#apply-filters').onclick = () => this.render();
        
        // Modal events
        document.querySelector('#close-modal').onclick = () => this.toggleModal(false);
        document.querySelector('#modal-backdrop').onclick = () => this.toggleModal(false);
    }

    switchView(view) {
        this.currentView = view;
        document.querySelectorAll('.view-controls button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`#btn-${view}`).classList.add('active');
        this.render();
    }

    movePeriod(direction) {
        if (this.currentView === 'monthly' || this.currentView === 'list') {
            this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        } else {
            this.currentDate.setDate(this.currentDate.getDate() + (direction * 7));
        }
        this.render();
    }

    getFilteredEvents() {
        const countryEl = document.querySelector('input[name="country"]:checked');
        if (!countryEl) return [];
        const country = countryEl.value;
        const types = Array.from(document.querySelectorAll('input[name="event-type"]:checked')).map(el => el.value);
        
        return eventsData.filter(ev => {
            const isCountryMatch = ev.country === country;
            const isTypeMatch = types.includes(ev.type);
            return isCountryMatch && isTypeMatch;
        });
    }

    render() {
        const container = document.querySelector('#calendar-container');
        const title = document.querySelector('#view-title');
        
        if (this.currentView === 'monthly') {
            title.textContent = `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월`;
            this.renderMonthly(container);
        } else if (this.currentView === 'weekly') {
            const start = this.getWeekStart(this.currentDate);
            const end = new Date(start);
            end.setDate(end.getDate() + 6);
            title.textContent = `${start.getMonth()+1}/${start.getDate()} ~ ${end.getMonth()+1}/${end.getDate()}`;
            this.renderWeekly(container);
        } else {
            title.textContent = `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월 일정`;
            this.renderList(container);
        }
    }

    renderMonthly(container) {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        let html = '<table class="calendar-table"><thead><tr>';
        ['일','월','화','수','목','금','토'].forEach(d => html += `<th>${d}</th>`);
        html += '</tr></thead><tbody><tr>';

        for (let i = 0; i < firstDay; i++) html += '<td></td>';

        const filtered = this.getFilteredEvents();

        for (let d = 1; d <= lastDate; d++) {
            if ((d + firstDay - 1) % 7 === 0 && d !== 1) html += '</tr><tr>';
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = filtered.filter(ev => ev.date === dateStr);
            
            html += `<td>
                <div class="calendar-day-header">${d}</div>
                <div class="day-events">
                    ${dayEvents.map(ev => `
                        <div class="event-item" onclick="window.calendar.showDetail(\'${ev.title}\', \'${ev.detail}\')">
                            <span class="badge ${ev.type}">${badgeMap[ev.type]}</span>
                            ${ev.title}
                        </div>
                    `).join('')}
                </div>
            </td>`;
        }
        
        html += '</tr></tbody></table>';
        container.innerHTML = html;
    }

    renderWeekly(container) {
        const start = this.getWeekStart(this.currentDate);
        const filtered = this.getFilteredEvents();
        
        let html = '<table class="calendar-table"><thead><tr>';
        ['일','월','화','수','목','금','토'].forEach(d => html += `<th>${d}</th>`);
        html += '</tr></thead><tbody><tr>';

        for (let i = 0; i < 7; i++) {
            const current = new Date(start);
            current.setDate(current.getDate() + i);
            const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
            const dayEvents = filtered.filter(ev => ev.date === dateStr);

            html += `<td>
                <div class="calendar-day-header">${current.getDate()}</div>
                <div class="day-events">
                    ${dayEvents.map(ev => `
                        <div class="event-item" onclick="window.calendar.showDetail(\'${ev.title}\', \'${ev.detail}\')">
                            <span class="badge ${ev.type}">${badgeMap[ev.type]}</span>
                            ${ev.title}
                        </div>
                    `).join('')}
                </div>
            </td>`;
        }

        html += '</tr></tbody></table>';
        container.innerHTML = html;
    }

    renderList(container) {
        const filtered = this.getFilteredEvents();
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const monthEvents = filtered.filter(ev => {
            const evDate = new Date(ev.date);
            return evDate.getFullYear() === year && evDate.getMonth() === month;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));

        if (monthEvents.length === 0) {
            container.innerHTML = '<div style="padding: 40px; text-align: center; color: #94a3b8;">해당 월에 일정이 없습니다.</div>';
            return;
        }

        let html = '<div class="list-view" style="display: flex; flex-direction: column; gap: 12px;">';
        monthEvents.forEach(ev => {
            html += `
                <div class="event-card" style="padding: 16px; border: 1px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; gap: 16px; cursor: pointer;" onclick="window.calendar.showDetail(\'${ev.title}\', \'${ev.detail}\')">
                    <div class="event-date" style="min-width: 60px; font-weight: 800; color: var(--primary-color);">${ev.date.split('-')[2]}일</div>
                    <span class="badge ${ev.type}" style="width: 24px; height: 24px; font-size: 13px;">${badgeMap[ev.type]}</span>
                    <div class="event-info">
                        <div style="font-weight: 700;">${ev.title}</div>
                        <div style="font-size: 12px; color: var(--text-muted);">${ev.detail}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    }

    showDetail(title, detail) {
        document.querySelector('#modal-title').textContent = title;
        document.querySelector('#modal-content').innerHTML = \`
            <div style="padding: 10px 0;">
                <p style="color: var(--text-muted); margin-bottom: 8px;">상세 내용:</p>
                <p style="font-size: 1.1rem; font-weight: 600;">\${detail}</p>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                <button class="primary-btn" style="width: 100%;" onclick="window.calendar.toggleModal(false)">확인</button>
            </div>
        \`;
        this.toggleModal(true);
    }

    toggleModal(show) {
        const modal = document.querySelector('#event-modal');
        const backdrop = document.querySelector('#modal-backdrop');
        if (show) {
            modal.classList.remove('hidden');
            backdrop.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
            backdrop.classList.add('hidden');
        }
    }
}

window.calendar = new CalendarManager();
