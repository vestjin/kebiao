// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const listViewContainer = document.getElementById('list-view');
    const gridViewContainer = document.getElementById('grid-view');
    const weekInput = document.getElementById('current-week');
    const viewToggleBtns = document.querySelectorAll('.toggle-btn');
    const filterCheckbox = document.getElementById('filter-current-week');

    const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    const sections = ["1-2", "3-4", "5-6", "7-8"];

    // --- 日期计算逻辑 ---

    function calculateCurrentWeek() {
        const startDateStr = (typeof CONFIG !== 'undefined' && CONFIG.startDate) ? CONFIG.startDate : '2026-03-02';
        const startDate = new Date(startDateStr);
        const today = new Date();
        
        today.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 0;
        return Math.floor(diffDays / 7) + 1;
    }

    function getCurrentDayOfWeek() {
        const day = new Date().getDay();
        return day === 0 ? 7 : day;
    }

    // --- 核心渲染逻辑 ---

    function parseWeeks(weekStr) {
        if (!weekStr) return [];
        let weeks = [];
        let parts = weekStr.split(',');
        parts.forEach(p => {
            p = p.trim();
            if (p.includes('-')) {
                let range = p.split('-').map(n => parseInt(n.trim()));
                for (let i = range[0]; i <= range[1]; i++) weeks.push(i);
            } else {
                weeks.push(parseInt(p));
            }
        });
        return weeks;
    }

    function isWeekActive(weekStr, currentWeek) {
        if (!currentWeek) return false;
        return parseWeeks(weekStr).includes(parseInt(currentWeek));
    }

    // 渲染列表视图 (移动端)
    function renderListView(currentWeek, filterCurrentWeek) {
        listViewContainer.innerHTML = '';
        const todayIndex = getCurrentDayOfWeek() - 1;
        
        days.forEach((day, index) => {
            let dayCourses = scheduleData.filter(c => c.day === day);

            if (filterCurrentWeek && currentWeek > 0) {
                dayCourses = dayCourses.filter(c => isWeekActive(c.weeks, currentWeek));
            }

            if (dayCourses.length === 0) return;

            const dayGroup = document.createElement('div');
            dayGroup.className = 'day-group';
            
            const dayTitle = document.createElement('div');
            dayTitle.className = 'day-title';
            
            if (index === todayIndex && currentWeek > 0) {
                dayTitle.innerHTML = `📅 ${day} <span style="color:#ff5722; font-size:0.8rem;">(今天)</span>`;
                dayTitle.style.background = '#fff3e0';
                dayTitle.style.borderLeftColor = '#ff5722';
            } else {
                dayTitle.innerText = day;
            }
            
            dayGroup.appendChild(dayTitle);

            dayCourses.forEach(course => {
                const card = document.createElement('div');
                card.className = `course-card type-${course.type || '理论'}`;
                
                if (isWeekActive(course.weeks, currentWeek)) {
                    card.classList.add('active-week');
                }

                // 获取时间段（调用 data.js 中的函数）
                const timeRange = typeof getSectionTime === 'function' ? getSectionTime(course.section) : '';

                card.innerHTML = `
                    <div class="time">
                        <span>${course.section}节</span>
                        ${timeRange ? `<span class="time-range">⏰ ${timeRange}</span>` : ''}
                        ${course.location ? `<span>📍 ${course.location}</span>` : ''}
                    </div>
                    <div class="name">${course.name}</div>
                    <div class="info">
                        ${course.teacher ? `<span>👨‍🏫 ${course.teacher}</span>` : ''}
                        <span class="weeks-tag">🗓️ 第${course.weeks}周</span>
                    </div>
                `;
                dayGroup.appendChild(card);
            });
            listViewContainer.appendChild(dayGroup);
        });
    }

    // 渲染网格视图 (桌面端)
    function renderGridView(currentWeek, filterCurrentWeek) {
        gridViewContainer.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'grid-table';
        
        const todayIndex = getCurrentDayOfWeek();
        let headerRow = '<tr><th>时间</th>';
        days.forEach((d, i) => {
            const isToday = (i + 1) === todayIndex && currentWeek > 0;
            const style = isToday ? 'style="background:#fff3e0; color:#ff5722;"' : '';
            const label = isToday ? `📅 ${d}` : d;
            headerRow += `<th ${style}>${label}</th>`;
        });
        headerRow += '</tr>';
        table.innerHTML = headerRow;

        sections.forEach(sec => {
            let row = document.createElement('tr');
            
            // 第一列：显示节次和具体时间
            let timeCell = document.createElement('td');
            const timeRange = typeof getSectionTime === 'function' ? getSectionTime(sec) : '';
            timeCell.innerHTML = `<div class="section-num">${sec}节</div>${timeRange ? `<div class="section-time">${timeRange}</div>` : ''}`;
            row.appendChild(timeCell);

            days.forEach((day, dayIdx) => {
                let cell = document.createElement('td');
                cell.className = 'grid-cell';
                
                if ((dayIdx + 1) === todayIndex && currentWeek > 0) {
                    cell.style.background = '#fff8e1';
                }
                
                let courses = scheduleData.filter(c => c.day === day && c.section === sec);
                
                if (filterCurrentWeek && currentWeek > 0) {
                    courses = courses.filter(c => isWeekActive(c.weeks, currentWeek));
                }

                if (courses.length > 0) {
                    cell.classList.add('has-class');
                    courses.forEach(c => {
                        let block = document.createElement('div');
                        block.className = 'sub-block type-' + (c.type || '理论');
                        
                        if (isWeekActive(c.weeks, currentWeek)) {
                            block.style.background = '#fff8e1';
                            block.style.borderLeftColor = '#ffc107';
                        }

                        let locationText = c.location ? `📍 ${c.location}` : '';
                        let weekText = `🗓️ ${c.weeks}周`;

                        if (isWeekActive(c.weeks, currentWeek)) {
                            weekText = `🔥 第${c.weeks}周`;
                        }

                        block.innerHTML = `
                            <div class="name">${c.name}</div>
                            <div class="meta">
                                ${locationText ? `<span class="loc">${locationText}</span>` : ''}
                                <span class="week">${weekText}</span>
                            </div>
                        `;

                        cell.appendChild(block);
                    });
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        gridViewContainer.appendChild(table);
    }

    // 初始化
    function init() {
        if (typeof CONFIG !== 'undefined') {
            const headerH1 = document.querySelector('header h1');
            const headerP = document.querySelector('header p');
            if (headerH1) headerH1.innerText = `📚 ${CONFIG.className}课程表`;
            if (headerP) headerP.innerText = CONFIG.semester;
            document.title = `课表查询 - ${CONFIG.className}`;
        }

        const autoWeek = calculateCurrentWeek();
        
        if (!weekInput.value) {
            weekInput.value = autoWeek > 0 ? autoWeek : '';
        }
        
        const currentWeek = weekInput.value;
        const isFilterActive = filterCheckbox ? filterCheckbox.checked : false;
        
        renderListView(currentWeek, isFilterActive);
        renderGridView(currentWeek, isFilterActive);
        
        const isWideScreen = window.innerWidth >= 768;
        
        viewToggleBtns.forEach(btn => {
            btn.classList.remove('active');
            if ((isWideScreen && btn.dataset.view === 'grid') || 
                (!isWideScreen && btn.dataset.view === 'list')) {
                btn.classList.add('active');
            }
        });

        console.log(`当前日期: ${new Date().toLocaleDateString('zh-CN')}`);
        console.log(`计算周次: 第${autoWeek}周`);
    }

    weekInput.addEventListener('change', init);

    if (filterCheckbox) {
        filterCheckbox.addEventListener('change', init);
    }

    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            
            if (view === 'list') {
                listViewContainer.style.display = 'block';
                gridViewContainer.style.display = 'none';
            } else {
                listViewContainer.style.display = 'none';
                gridViewContainer.style.display = 'block';
            }

            viewToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    init();

    // PWA Service Worker 注册
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker 注册成功:', reg.scope))
                .catch(err => console.log('Service Worker 注册失败:', err));
        });
    }
});
