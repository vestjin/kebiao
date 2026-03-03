// js/data.js

const CONFIG = {
    className: "影像24.2班",
    semester: "2025-2026学年春季学期",
    startDate: "2026-03-02",
    maxWeeks: 20,
    // 新增：课程时间段配置
    timeSlots: {
        1: { start: "8:00", end: "8:45" },
        2: { start: "8:55", end: "9:40" },
        3: { start: "10:00", end: "10:45" },
        4: { start: "10:55", end: "11:40" },
        5: { start: "13:30", end: "14:15" },
        6: { start: "14:25", end: "15:10" },
        7: { start: "15:20", end: "16:05" },
        8: { start: "16:15", end: "17:00" },
        9: { start: "18:30", end: "20:30" },
        10: { start: "19:30", end: "20:20" }
    }
};

// 根据节次范围获取时间字符串，如 section: "1-2" -> "8:00-9:40"
function getSectionTime(sectionStr) {
    if (!sectionStr || !CONFIG.timeSlots) return '';
    
    const parts = sectionStr.split('-');
    
    // 单节课的情况
    if (parts.length === 1) {
        const slot = CONFIG.timeSlots[parseInt(parts[0])];
        return slot ? `${slot.start}-${slot.end}` : '';
    }
    
    // 连续课的情况，如 "1-2"
    if (parts.length === 2) {
        const startSlot = CONFIG.timeSlots[parseInt(parts[0])];
        const endSlot = CONFIG.timeSlots[parseInt(parts[1])];
        
        if (startSlot && endSlot) {
            return `${startSlot.start}-${endSlot.end}`;
        }
    }
    
    return '';
}

// 课表核心数据
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
    { day: "星期四", section: "5-6", name: "断面理论", location: "A002", weeks: "1-2", type: "理论" },
    { day: "星期四", section: "5-6", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期四", section: "5-6", name: "局解理论", location: "A002", weeks: "5-7", type: "理论" },
    { day: "星期四", section: "5-6", name: "局解实验", location: "", weeks: "8-13", type: "实验" },
    { day: "星期四", section: "5-6", name: "病理", location: "2202", weeks: "14-16", type: "理论" },
    { day: "星期四", section: "7-8", name: "断面理论", location: "A002", weeks: "1-2", type: "理论" },
    { day: "星期四", section: "7-8", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期四", section: "7-8", name: "局解理论", location: "A002", weeks: "5-7", type: "理论" },
    { day: "星期四", section: "7-8", name: "局解实验", location: "", weeks: "8-13", type: "实验" },

    // --- 星期五 ---
    { day: "星期五", section: "1-2", name: "断面理论", location: "B103", weeks: "1-2", type: "理论" },
    { day: "星期五", section: "1-2", name: "断面实验", location: "", weeks: "3-4", type: "实验" },
    { day: "星期五", section: "1-2", name: "局解理论", location: "B103", weeks: "5-7", type: "理论" },
    { day: "星期五", section: "1-2", name: "局解实验", location: "", weeks: "8,10-14", type: "实验" },
    { day: "星期五", section: "1-2", name: "微生物实验", location: "", weeks: "15", type: "实验" },
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
