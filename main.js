// Expanded Sample Data with more details and types
const initialEventsData = [
    { date: '2024-07-01', type: 'ipo', country: 'korea', title: '에이비씨상사', detail: '공모가: 15,000원 / 주관사: 신한투자증권' },
    { date: '2024-07-01', type: 'holiday', country: 'usa', title: '미국 휴장', detail: '독립기념일 대체 휴무' },
    { date: '2024-07-02', type: 'dividend', country: 'korea', title: '삼성전자 배당', detail: '분기 배당금 지급 예정' },
    { date: '2024-07-04', type: 'economic', country: 'usa', title: '비농업 고용지수', detail: '예상치: 200K / 이전: 220K' },
    { date: '2024-07-10', type: 'earnings', country: 'usa', title: '델타항공 실적', detail: '개장 전 발표 예정' },
    { date: '2024-07-15', type: 'rights', country: 'korea', title: '한국테크 유상증자', detail: '신주배정기준일' },
    { date: '2024-07-20', type: 'ipo', country: 'korea', title: '지에스리테일 신규상장', detail: '코스피 시장 상장' },
    { date: '2024-07-25', type: 'economic', country: 'korea', title: 'GDP 성장률 발표', detail: '2분기 속보치 발표' },
];

let eventsData = [...initialEventsData];

// Real-world 2026 Data for Gemini AI Search Simulation
const aiSearchData = [
    // Korea 2026 Holidays
    { date: '2026-05-01', type: 'holiday', country: 'korea', title: '근로자의 날', detail: '증시 휴장' },
    { date: '2026-05-05', type: 'holiday', country: 'korea', title: '어린이날', detail: '증시 휴장' },
    { date: '2026-05-25', type: 'holiday', country: 'korea', title: '부처님오신날 대체공휴일', detail: '증시 휴장' },
    { date: '2026-06-03', type: 'holiday', country: 'korea', title: '지방선거일', detail: '임시공휴일 휴장' },
    { date: '2026-08-17', type: 'holiday', country: 'korea', title: '광복절 대체공휴일', detail: '증시 휴장' },
    { date: '2026-09-24', type: 'holiday', country: 'korea', title: '추석 연휴', detail: '증시 휴장' },
    { date: '2026-09-25', type: 'holiday', country: 'korea', title: '추석 연휴', detail: '증시 휴장' },
    { date: '2026-09-28', type: 'holiday', country: 'korea', title: '추석 대체공휴일', detail: '증시 휴장' },
    { date: '2026-10-05', type: 'holiday', country: 'korea', title: '개천절 대체공휴일', detail: '증시 휴장' },
    { date: '2026-10-09', type: 'holiday', country: 'korea', title: '한글날', detail: '증시 휴장' },
    { date: '2026-12-25', type: 'holiday', country: 'korea', title: '성탄절', detail: '증시 휴장' },
    { date: '2026-12-31', type: 'holiday', country: 'korea', title: '연말 휴장일', detail: '증시 휴장' },

    // Korea 2026 IPOs (Sample)
    { date: '2026-05-04', type: 'ipo', country: 'korea', title: '폴레드 청약', detail: '주관사: NH투자증권 / 공모가 미정' },
    { date: '2026-05-11', type: 'ipo', country: 'korea', title: '마키나락스 청약', detail: '주관사: 미래에셋, 현대차증권' },
    { date: '2026-05-20', type: 'ipo', country: 'korea', title: '피스피스스튜디오', detail: '주관사: NH투자, 미래에셋' },
    { date: '2026-05-29', type: 'ipo', country: 'korea', title: '져스텍 청약', detail: '주관사: 삼성증권' },

    // Korea 2026 Economic (BOK Interest Rate)
    { date: '2026-05-28', type: 'economic', country: 'korea', title: '한은 금리결정', detail: '한국은행 통화정책방향 결정회의' },
    { date: '2026-07-16', type: 'economic', country: 'korea', title: '한은 금리결정', detail: '한국은행 통화정책방향 결정회의' },
    { date: '2026-07-23', type: 'economic', country: 'korea', title: 'GDP 속보치(2Q)', detail: '2분기 경제성장률 발표' },

    // USA 2026 Holidays
    { date: '2026-01-01', type: 'holiday', country: 'usa', title: 'New Year Day', detail: 'Market Closed' },
    { date: '2026-01-19', type: 'holiday', country: 'usa', title: 'MLK Jr. Day', detail: 'Market Closed' },
    { date: '2026-02-16', type: 'holiday', country: 'usa', title: 'Presidents Day', detail: 'Market Closed' },
    { date: '2026-04-03', type: 'holiday', country: 'usa', title: 'Good Friday', detail: 'Market Closed' },
    { date: '2026-05-25', type: 'holiday', country: 'usa', title: 'Memorial Day', detail: 'Market Closed' },
    { date: '2026-06-19', type: 'holiday', country: 'usa', title: 'Juneteenth', detail: 'Market Closed' },
    { date: '2026-07-03', type: 'holiday', country: 'usa', title: 'Independence Day', detail: 'Observed / Market Closed' },
    { date: '2026-09-07', type: 'holiday', country: 'usa', title: 'Labor Day', detail: 'Market Closed' },
    { date: '2026-11-26', type: 'holiday', country: 'usa', title: 'Thanksgiving', detail: 'Market Closed' },
    { date: '2026-12-25', type: 'holiday', country: 'usa', title: 'Christmas Day', detail: 'Market Closed' },

    // USA 2026 Economic (FOMC)
    { date: '2026-05-01', type: 'economic', country: 'usa', title: '고용보고서', detail: 'Non-Farm Payrolls 발표' },
    { date: '2026-06-17', type: 'economic', country: 'usa', title: 'FOMC 금리결정', detail: 'Fed Interest Rate Decision & SEP' },
    { date: '2026-07-29', type: 'economic', country: 'usa', title: 'FOMC 금리결정', detail: 'Fed Interest Rate Decision' },
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
        this.today = new Date();
        this.currentDate = new Date(); 
        this.currentView = 'monthly';
        this.isSearching = false;
        this.init();
    }

    init() {
        this.initTheme();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        document.querySelector('#btn-monthly').onclick = () => this.switchView('monthly');
        document.querySelector('#btn-weekly').onclick = () => this.switchView('weekly');
        document.querySelector('#btn-list').onclick = () => this.switchView('list');
        document.querySelector('#theme-toggle').onclick = () => this.toggleTheme();

        document.querySelector('#prev-period').onclick = () => this.movePeriod(-1);
        document.querySelector('#next-period').onclick = () => this.movePeriod(1);
        document.querySelector('#today-btn').onclick = () => {
            this.currentDate = new Date();
            this.render();
        };

        document.querySelector('#apply-filters').onclick = () => this.handleAiSearch();
        document.querySelector('#reset-filters').onclick = () => this.resetFilters();
        
        // Modal events
        document.querySelector('#close-modal').onclick = () => this.toggleModal(false);
        document.querySelector('#modal-backdrop').onclick = () => this.toggleModal(false);
    }

    initTheme() {
        const savedTheme = localStorage.getItem('stockcalendar-theme') || 'light';
        this.applyTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
        localStorage.setItem('stockcalendar-theme', nextTheme);
    }

    applyTheme(theme) {
        const isDark = theme === 'dark';
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
async handleAiSearch() {
    if (this.isSearching) return;
    console.log('Gemini AI Search triggered');

    const btn = document.querySelector('#apply-filters');
    const originalText = btn.innerHTML;

    try {
        this.isSearching = true;
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Gemini AI 검색 중...`;

        // Simulate AI Search Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const addedCount = this.mergeAiData();

        this.render();
        this.showToast(`Gemini AI: ${addedCount}개의 새로운 일정을 찾았습니다.`);
    } finally {
        this.isSearching = false;
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}


    mergeAiData() {
        const country = document.querySelector('input[name="country"]:checked').value;
        const types = Array.from(document.querySelectorAll('input[name="event-type"]:checked')).map(el => el.value);
        
        // Filter AI data by selected country and types
        const matchedAiEvents = aiSearchData.filter(ev => 
            ev.country === country && types.includes(ev.type)
        );

        let addedCount = 0;
        matchedAiEvents.forEach(aiEv => {
            const exists = eventsData.some(ev => ev.date === aiEv.date && ev.title === aiEv.title);
            if (!exists) {
                eventsData.push(aiEv);
                addedCount++;
            }
        });
        return addedCount;
    }

    resetFilters() {
        // Reset Checkboxes
        document.querySelectorAll('input[name="event-type"]').forEach(cb => {
            cb.checked = true; // Default all checked
        });
        
        // Reset to initial data
        eventsData = [...initialEventsData];
        this.render();
        this.showToast('일정 필터가 초기화되었습니다.', 'info');
    }

    showToast(message, type = 'success') {
        const container = document.querySelector('#toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
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
        container.className = `calendar-view ${this.currentView}-view`;
        
        if (this.currentView === 'monthly') {
            title.textContent = `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월`;
            this.renderMonthly(container);
        } else if (this.currentView === 'weekly') {
            const start = this.getWeekStart(this.currentDate);
            const end = new Date(start);
            end.setDate(end.getDate() + 6);
            title.textContent = `${start.getFullYear()}년 ${start.getMonth() + 1}/${start.getDate()} ~ ${end.getMonth() + 1}/${end.getDate()}`;
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
            
            const isToday = d === this.today.getDate() && 
                            month === this.today.getMonth() && 
                            year === this.today.getFullYear();
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = filtered.filter(ev => ev.date === dateStr);
            
            html += `<td class="${isToday ? 'today' : ''}">
                <div class="calendar-day-header">${d}</div>
                <div class="day-events">
                    ${dayEvents.map(ev => `
                        <div class="event-item" onclick="window.calendar.showDetail('${ev.title}', '${ev.detail}')">
                            <span class="badge ${ev.type}">${badgeMap[ev.type]}</span>
                            ${ev.title}
                        </div>
                    `).join('')}
                </div>
            </td>`;
        }
        
        const usedCells = firstDay + lastDate;
        const trailingCells = (7 - (usedCells % 7)) % 7;
        for (let i = 0; i < trailingCells; i++) html += '<td class="empty-day"></td>';

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
            
            const isToday = current.getDate() === this.today.getDate() && 
                            current.getMonth() === this.today.getMonth() && 
                            current.getFullYear() === this.today.getFullYear();

            const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
            const dayEvents = filtered.filter(ev => ev.date === dateStr);

            html += `<td class="${isToday ? 'today' : ''}">
                <div class="calendar-day-header">
                    <span>${current.getDate()}</span>
                    <small>${current.getMonth() + 1}월</small>
                </div>
                <div class="day-events">
                    ${dayEvents.map(ev => `
                        <div class="event-item" onclick="window.calendar.showDetail('${ev.title}', '${ev.detail}')">
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
            container.innerHTML = '<div class="empty-state">해당 월에 일정이 없습니다.</div>';
            return;
        }

        let html = '<div class="event-list">';
        monthEvents.forEach(ev => {
            const evDate = new Date(ev.date);
            const isToday = evDate.getDate() === this.today.getDate() && 
                            evDate.getMonth() === this.today.getMonth() && 
                            evDate.getFullYear() === this.today.getFullYear();

            html += `
                <div class="event-card ${isToday ? 'today-highlight' : ''}" onclick="window.calendar.showDetail('${ev.title}', '${ev.detail}')">
                    <div class="event-date">${ev.date.split('-')[2]}일</div>
                    <span class="badge ${ev.type}">${badgeMap[ev.type]}</span>
                    <div class="event-info">
                        <div class="event-title">${ev.title}</div>
                        <div class="event-detail">${ev.detail}</div>
                    </div>
                    ${isToday ? '<div class="today-label">오늘</div>' : ''}
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
        document.querySelector('#modal-content').innerHTML = `
            <div style="padding: 10px 0;">
                <p style="color: var(--text-muted); margin-bottom: 8px;">상세 내용:</p>
                <p style="font-size: 1.1rem; font-weight: 600;">${detail}</p>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                <button class="primary-btn" style="width: 100%;" onclick="window.calendar.toggleModal(false)">확인</button>
            </div>
        `;
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

document.addEventListener('DOMContentLoaded', () => {
    window.calendar = new CalendarManager();
});
