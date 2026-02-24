// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const listViewContainer = document.getElementById('list-view');
    const gridViewContainer = document.getElementById('grid-view');
    const weekInput = document.getElementById('current-week');
    const viewToggleBtns = document.querySelectorAll('.toggle-btn');

    const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    const sections = ["1-2", "3-4", "5-6", "7-8"];

    // --- 新增：日期计算逻辑 ---
    
    /**
     * 计算当前是第几周
     * 基准日期：2026年3月2日（第1周周一）
     */
    function calculateCurrentWeek() {
        const startDate = new Date('2026-03-02'); // 第1周周一
        const today = new Date();
        
        // 重置时间部分，只比较日期
        today.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        
        // 计算相差的天数
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // 如果在开学前，返回0或提示
        if (diffDays < 0) {
            return 0; // 还没开学
        }
        
        // 计算周次 (天数除以7，向上取整或+1)
        const currentWeek = Math.floor(diffDays / 7) + 1;
        
        return currentWeek;
    }

    /**
     * 获取今天是星期几 (1-7, 周一为1)
     */
    function getCurrentDayOfWeek() {
        const day = new Date().getDay();
        // getDay() 返回 0(周日) 到 6(周六)
        // 转换为：1(周一) 到 7(周日)
        return day === 0 ? 7 : day;
    }

    // --- 核心渲染逻辑 ---

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
        
        // 获取今天是周几
        const todayIndex = getCurrentDayOfWeek() - 1; // 0-6 对应 days数组索引
        
        days.forEach((day, index) => {
            const dayCourses = scheduleData.filter(c => c.day === day);
            if (dayCourses.length === 0) return;

            const dayGroup = document.createElement('div');
            dayGroup.className = 'day-group';
            
            const dayTitle = document.createElement('div');
            dayTitle.className = 'day-title';
            
            // 如果是今天，添加特殊标识
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

        // 内容行
        sections.forEach(sec => {
            let row = document.createElement('tr');
            let timeCell = document.createElement('td');
            timeCell.innerText = sec + "节";
            row.appendChild(timeCell);

            days.forEach((day, dayIdx) => {
                let cell = document.createElement('td');
                cell.className = 'grid-cell';
                
                // 如果是今天的列，添加背景提示
                if ((dayIdx + 1) === todayIndex && currentWeek > 0) {
                    cell.style.background = '#fff8e1';
                }
                
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

                        // 构建位置显示文本
                        let locationText = c.location ? `📍 ${c.location}` : '';
                        let weekText = `🗓️ ${c.weeks}周`;

                        // 检查是否是当前周，如果是高亮周数
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
        // 自动计算并填充当前周
        const autoWeek = calculateCurrentWeek();
        
        // 只有当输入框为空时才自动填充
        if (!weekInput.value) {
            weekInput.value = autoWeek > 0 ? autoWeek : '';
        }
        
        const currentWeek = weekInput.value;
        
        renderListView(currentWeek);
        renderGridView(currentWeek);
        
        // 在控制台显示日期信息（调试用）
        console.log(`当前日期: ${new Date().toLocaleDateString('zh-CN')}`);
        console.log(`计算周次: 第${autoWeek}周`);
    }

    // 事件监听
    weekInput.addEventListener('change', init);

    // 视图切换逻辑
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
