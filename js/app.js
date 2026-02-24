// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const listViewContainer = document.getElementById('list-view');
    const gridViewContainer = document.getElementById('grid-view');
    const weekInput = document.getElementById('current-week');
    const viewToggleBtns = document.querySelectorAll('.toggle-btn');

    const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    const sections = ["1-2", "3-4", "5-6", "7-8"];

    // 解析周数字符串 "1-5,7" -> [1,2,3,4,5,7]
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

    // 检查某周是否有课
    function isWeekActive(weekStr, currentWeek) {
        if (!currentWeek) return false;
        return parseWeeks(weekStr).includes(parseInt(currentWeek));
    }

    // 渲染列表视图 (移动端)
    function renderListView(currentWeek) {
        listViewContainer.innerHTML = '';
        days.forEach(day => {
            const dayCourses = scheduleData.filter(c => c.day === day);
            if (dayCourses.length === 0) return;

            const dayGroup = document.createElement('div');
            dayGroup.className = 'day-group';
            
            const dayTitle = document.createElement('div');
            dayTitle.className = 'day-title';
            dayTitle.innerText = day;
            dayGroup.appendChild(dayTitle);

            dayCourses.forEach(course => {
                const card = document.createElement('div');
                card.className = `course-card type-${course.type || '理论'}`;
                
                // 检查当前周是否高亮
                if (isWeekActive(course.weeks, currentWeek)) {
                    card.classList.add('active-week');
                }

                card.innerHTML = `
                    <div class="time">
                        <span>${course.section}节</span>
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
    function renderGridView(currentWeek) {
        gridViewContainer.innerHTML = '';
        const table = document.createElement('table');
        table.className = 'grid-table';
        
        // 表头
        let headerRow = '<tr><th>时间</th>';
        days.forEach(d => headerRow += `<th>${d}</th>`);
        headerRow += '</tr>';
        table.innerHTML = headerRow;

        // 内容行
        sections.forEach(sec => {
            let row = document.createElement('tr');
            let timeCell = document.createElement('td');
            timeCell.innerText = sec + "节";
            row.appendChild(timeCell);

            days.forEach(day => {
                let cell = document.createElement('td');
                cell.className = 'grid-cell';
                
                const courses = scheduleData.filter(c => c.day === day && c.section === sec);
                
                if (courses.length > 0) {
                    cell.classList.add('has-class');
                    courses.forEach(c => {
                        let block = document.createElement('div');
                        block.className = 'sub-block type-' + (c.type || '理论');
                        
                        // 高亮逻辑
                        if (isWeekActive(c.weeks, currentWeek)) {
                            block.style.background = '#fff8e1';
                            block.style.borderLeftColor = '#ffc107';
                        }

                        block.innerHTML = `
                            <div class="name">${c.name}</div>
                            <div class="meta">${c.location || ''} (${c.weeks}周)</div>
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
        renderListView(weekInput.value);
        renderGridView(weekInput.value);
    }

    // 事件监听
    weekInput.addEventListener('change', init);

    // 视图切换逻辑 (虽然CSS通过媒体查询处理了显示，这里可以添加额外的手动切换逻辑)
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
});
