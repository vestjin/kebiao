
const CONFIG = {
    className: "影像24.2班",
    semester: "2025-2026学年春季学期",
    startDate: "2026-03-02", // 将开学日期移至此处
    maxWeeks: 20 // 可选：定义学期最大周数
    // 新增：课程时间段配置
    timeSlots: {
        1: "8:00-8:45",
        2: "8:55-9:40",
        3: "10:00-10:45",
        4: "10:55-11:40",
        5: "13:30-14:15",
        6: "14:25-15:10",
        7: "15:20-16:05",
        8: "16:15-17:00",
        9: "18:30-20:30",
        10: "19:30-20:20"
    }
};

// 根据节次范围获取时间字符串，如 section: "1-2" -> "8:00-9:40"
function getTimeRange(sectionStr) {
    if (!sectionStr || !CONFIG.timeSlots) return '';
    
    const parts = sectionStr.split('-');
    if (parts.length !== 2) return CONFIG.timeSlots[parseInt(sectionStr)] || '';
    
    const start = parseInt(parts[0]);
    const end = parseInt(parts[1]);
    
    const startTime = CONFIG.timeSlots[start];
    const endTime = CONFIG.timeSlots[end];
    
    if (!startTime || !endTime) return '';
    
    // 提取开始时间的起始时刻和结束时间的结束时刻
    const startMoment = startTime.split('-')[0];
    const endMoment = endTime.split('-')[1];
    
    return `${startMoment}-${endMoment}`;
}

// 课表核心数据
// weeks: 授课周次字符串，如 "1-12"
const scheduleData = [
    // --- 星期一 ---
    { day: "星期一", section: "1-2", name: "病理实验", location: "", weeks: "13-15,17-18", type: "实验" },
    { day: "星期一", section: "3-4", name: "英语", location: "A301", weeks: "1-12", type: "理论" },
    { day: "星期一", section: "3-4", name: "病理实验", location: "", weeks: "13-15,17-18", type: "实验" },
    { day: "星期一", section: "5-6", name: "微生物", location: "2202", weeks: "1-5,7-9,11-14", type: "理论" },
    { day: "星期一", section: "7-8", name: "病理", location: "2202", weeks: "1-5,7-9,11-16", type: "理论" },

    // --- 星期二 ---
    { day: "星期二", section: "1-2", name: "微生物实验", location: "", weeks: "15", type: "实验" },
    { day: "星期二", section: "3-4", name: "原理", location: "", weeks: "3-9,11-13", type: "理论" },
    { day: "星期二", section: "3-4", name: "微生物实验", location: "", weeks: "15", type: "实验" },
    { day: "星期二", section: "5-6", name: "体育", location: "", weeks: "1-16", teacher: "张占英", type: "体育" },
    { day: "星期二", section: "7-8", name: "免疫", location: "2202", weeks: "1-9,11-15", type: "理论" },

    // --- 星期三 ---
    { day: "星期三", section: "1-2", name: "微生物实验", location: "", weeks: "15", type: "实验" },
    { day: "星期三", section: "3-4", name: "原理", location: "", weeks: "3-9,11-13", type: "理论" },
    { day: "星期三", section: "3-4", name: "微生物实验", location: "", weeks: "15", type: "实验" },
    { day: "星期三", section: "5-6", name: "病理", location: "2202", weeks: "1-15", type: "理论" },
    { day: "星期三", section: "5-6", name: "病理实验", location: "", weeks: "16-18", type: "实验" },
    { day: "星期三", section: "7-8", name: "免疫", location: "2202", weeks: "1-6", type: "理论" },
    { day: "星期三", section: "7-8", name: "微生物", location: "2202", weeks: "7-14", type: "理论" },
    { day: "星期三", section: "7-8", name: "病理实验", location: "", weeks: "16-18", type: "实验" },

    // --- 星期四 ---
    { day: "星期四", section: "1-2", name: "微生物实验", location: "", weeks: "15", type: "实验" },
    { day: "星期四", section: "3-4", name: "英语", location: "A301", weeks: "1-12", type: "理论" },
    { day: "星期四", section: "3-4", name: "微生物实验", location: "", weeks: "15", type: "实验" },
    
    // 星期四 5-6节
    { day: "星期四", section: "5-6", name: "断面理论", location: "A002", weeks: "1-2", type: "理论" },
    { day: "星期四", section: "5-6", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期四", section: "5-6", name: "局解理论", location: "A002", weeks: "5-7", type: "理论" },
    { day: "星期四", section: "5-6", name: "局解实验", location: "", weeks: "8-13", type: "实验" },
    { day: "星期四", section: "5-6", name: "病理", location: "2202", weeks: "14-16", type: "理论" },

    // 星期四 7-8节
    { day: "星期四", section: "7-8", name: "断面理论", location: "A002", weeks: "1-2", type: "理论" },
    { day: "星期四", section: "7-8", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期四", section: "7-8", name: "局解理论", location: "A002", weeks: "5-7", type: "理论" },
    { day: "星期四", section: "7-8", name: "局解实验", location: "", weeks: "8-13", type: "实验" },

    // --- 星期五 ---
    // 星期五 1-2节
    { day: "星期五", section: "1-2", name: "断面理论", location: "B103", weeks: "1-2", type: "理论" },
    { day: "星期五", section: "1-2", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期五", section: "1-2", name: "局解理论", location: "B103", weeks: "5-7", type: "理论" },
    { day: "星期五", section: "1-2", name: "局解实验", location: "", weeks: "8,10-14", type: "实验" },
    { day: "星期五", section: "1-2", name: "微生物实验", location: "", weeks: "15", type: "实验" },

    // 星期五 3-4节
    { day: "星期五", section: "3-4", name: "断面理论", location: "B103", weeks: "1-2", type: "理论" },
    { day: "星期五", section: "3-4", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期五", section: "3-4", name: "局解理论", location: "B103", weeks: "5-7", type: "理论" },
    { day: "星期五", section: "3-4", name: "局解实验", location: "", weeks: "8,10-14", type: "实验" },
    { day: "星期五", section: "3-4", name: "微生物实验", location: "", weeks: "15", type: "实验" },

    // --- 星期六 ---
    { day: "星期六", section: "1-2", name: "免疫实验", location: "", weeks: "6,8", type: "实验" },
    { day: "星期六", section: "3-4", name: "免疫实验", location: "", weeks: "6,8", type: "实验" },
    { day: "星期六", section: "5-6", name: "免疫实验", location: "", weeks: "6,8", type: "实验" },
    { day: "星期六", section: "7-8", name: "免疫实验", location: "", weeks: "6,8", type: "实验" }
];
