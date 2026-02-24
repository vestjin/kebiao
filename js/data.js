// js/data.js

const CLASS_NAME = "影像24.2班";
const SEMESTER = "2025-2026学年春季学期";

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
