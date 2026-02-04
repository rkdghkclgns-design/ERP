'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Bell, CheckCircle, Clock, Eye, Send, MoreHorizontal, Edit, Calendar as CalendarIcon, Package } from 'lucide-react';

export default function Dashboard() {
    const [currentDate] = useState(new Date(2026, 1, 4)); // 2026년 2월

    // 캘린더 데이터
    const schedules = [
        { day: 2, title: '거래처 미팅 (10:30)', time: '10:30', type: 'meeting', color: 'blue' },
        { day: 2, title: '거래처 미팅_10:30', type: 'meeting', color: 'blue' },
        { day: 3, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 6, title: '연차_김주빈', type: 'leave', color: 'orange' },
        { day: 6, title: '테스트', type: 'test', color: 'orange' },
        { day: 7, title: '주말근무', type: 'work', color: 'indigo' },
        { day: 7, title: '주말근무', type: 'work', color: 'indigo' },
        { day: 10, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 11, title: '연차_최현경', type: 'leave', color: 'orange' },
        { day: 16, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 21, title: '주말근무', type: 'work', color: 'indigo' },
        { day: 21, title: '주말근무', type: 'work', color: 'indigo' },
        { day: 24, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 27, title: '월말 결산', type: 'work', color: 'cyan' },
    ];

    // 전자결재 데이터
    const approvals = [
        { id: 1, date: '2026/02/02-2', title: '인사팀 김동한 대리 정기소급 신청서', requester: 'guest', status: '진행중', approver: '최현경', action: '보기' },
        { id: 2, date: '2026/01/23-1', title: '기획팀 정기용 시간외근무 신청서', requester: 'guest', status: '대기', approver: '변종호', action: '보기' },
        { id: 3, date: '2026/01/21-1', title: '최인성 과장 휴가신청서', requester: 'guest', status: '진행중', approver: '최현경', action: '보기' },
        { id: 4, date: '2026/01/20-1', title: '비품신청서', requester: 'guest', status: '진행중', approver: '변종호', action: '보기' },
        { id: 5, date: '2026/01/15-1', title: '영업팀 김지은 법인차량 운행일지', requester: 'guest', status: '진행중', approver: '최현경', action: '보기' },
    ];

    // 공지사항 데이터
    const notices = [
        { id: 1, priority: '공지', title: '★ 지출결의서 및 가지금금정산서 작성요령', date: '2024/10/16', author: '이카운트', highlighted: true },
        { id: 2, priority: '공지', title: '※ 근태/출장/외근 관련 법인차량 사용관련 공지건', date: '2024/10/16', author: '이카운트', highlighted: true },
        { id: 3, priority: '일반', title: '시내 동호회 신청 방법', date: '2025/01/14', author: '이카운트' },
        { id: 4, priority: '일반', title: '인사발령 공지', date: '2025/01/14', author: '이카운트' },
        { id: 5, priority: '일반', title: '[필독] 2024년 직원 건강검진 미수진...', date: '2025/01/14', author: '이카운트' },
    ];

    // 오더관리 데이터
    const orders = [
        { id: 'O0024_032502', name: '기본유량호스', stages: ['구매', '판매', '검사', '완료'], counts: [1, 0, 0, 0], currentStage: 0 },
        { id: 'O0023_202602', name: '주문생산흐름', stages: ['주문서', '발주서', '구매', '적재', '생산', '판매 (거래명세...)'], counts: [1, 1, 1, 1, 0, 0], currentStage: 3 },
    ];

    const { firstDay, daysInMonth } = (() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const first = new Date(year, month, 1).getDay();
        const last = new Date(year, month + 1, 0).getDate();
        return { firstDay: first, daysInMonth: last };
    })();

    const weeks = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="p-6 space-y-6">
            {/* 메인 2분할 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 왼쪽: 일정관리 (7/12) */}
                <div className="lg:col-span-7 erp-card">
                    <div className="erp-card-header">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400"><ChevronLeft size={16} /></span>
                            <span className="font-bold text-sm">2026/02</span>
                            <span className="text-gray-400"><ChevronRight size={16} /></span>
                            <span className="text-sm font-bold ml-2">일정관리</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600"><Edit size={16} /></button>
                            <button className="p-1 text-gray-400 hover:text-gray-600"><CalendarIcon size={16} /></button>
                            <button className="p-1 text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {weeks.map((day, idx) => (
                                        <th key={idx} className={`py-2 text-xs font-medium border-r border-gray-50 last:border-0 ${idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-600'}`}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, weekIdx) => (
                                    <tr key={weekIdx} className="border-b border-gray-50 last:border-0">
                                        {Array.from({ length: 7 }).map((_, dayIdx) => {
                                            const dayNumber = weekIdx * 7 + dayIdx - firstDay + 1;
                                            const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                                            const daySchedules = schedules.filter(s => s.day === dayNumber);

                                            return (
                                                <td key={dayIdx} className="h-28 border-r border-gray-50 last:border-0 align-top p-1 transition-colors hover:bg-gray-50">
                                                    {isValidDay && (
                                                        <>
                                                            <div className={`text-[11px] font-medium mb-1 ${dayIdx === 0 ? 'text-red-500' : dayIdx === 6 ? 'text-blue-500' : 'text-gray-700'}`}>
                                                                {dayNumber}
                                                            </div>
                                                            <div className="space-y-1">
                                                                {daySchedules.map((s, sIdx) => (
                                                                    <div key={sIdx} className="flex items-center gap-1 group">
                                                                        <span className={`w-1.5 h-3 rounded-full 
                                                                            ${s.color === 'red' ? 'bg-red-500' :
                                                                                s.color === 'blue' ? 'bg-blue-400' :
                                                                                    s.color === 'orange' ? 'bg-orange-400' :
                                                                                        s.color === 'indigo' ? 'bg-indigo-400' : 'bg-cyan-400'}`}
                                                                        />
                                                                        <div className="text-[10px] text-gray-600 truncate leading-tight flex-1">
                                                                            {s.title}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 오른쪽: 전자결재 & 공지사항 (5/12) */}
                <div className="lg:col-span-5 space-y-6">
                    {/* 전자결재 */}
                    <div className="erp-card">
                        <div className="erp-card-header">
                            <span className="font-bold text-sm">전자결재</span>
                            <div className="flex gap-2">
                                <button className="p-1 text-gray-400 hover:text-gray-600"><Edit size={16} /></button>
                                <button className="p-1 text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                            </div>
                        </div>
                        <div className="p-4 border-b border-gray-50">
                            <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                <Clock size={12} />
                                <span>내 기안문서</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="erp-table">
                                <thead>
                                    <tr>
                                        <th>기안일자</th>
                                        <th>제목</th>
                                        <th>기안자</th>
                                        <th>결재자</th>
                                        <th>진행상태</th>
                                        <th>결재</th>
                                        <th>기안식복사</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {approvals.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-gray-500 tabular-nums">{item.date}</td>
                                            <td className="font-medium max-w-[120px] truncate">{item.title}</td>
                                            <td className="text-blue-500">{item.requester}</td>
                                            <td className="text-gray-600">{item.approver}</td>
                                            <td>
                                                <span className="px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-600 text-[10px]">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td><button className="text-blue-500 hover:underline">보기</button></td>
                                            <td><button className="text-gray-400 hover:underline">복사</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 공지사항 */}
                    <div className="erp-card">
                        <div className="erp-card-header">
                            <span className="font-bold text-sm">공지사항</span>
                            <div className="flex gap-2">
                                <button className="p-1 text-gray-400 hover:text-gray-600"><Edit size={16} /></button>
                                <button className="p-1 text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="erp-table">
                                <thead>
                                    <tr>
                                        <th className="w-12"></th>
                                        <th>제목</th>
                                        <th>작성일</th>
                                        <th>작성자</th>
                                        <th>조회</th>
                                        <th>본문</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notices.map((notice) => (
                                        <tr key={notice.id} className={notice.highlighted ? 'bg-orange-50/50' : ''}>
                                            <td>
                                                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white ${notice.priority === '공지' ? 'bg-orange-400' : 'bg-gray-400'}`}>
                                                    {notice.priority}
                                                </span>
                                            </td>
                                            <td className={`max-w-[180px] truncate ${notice.highlighted ? 'font-bold' : ''}`}>
                                                {notice.title}
                                            </td>
                                            <td className="text-gray-500 tabular-nums">{notice.date}</td>
                                            <td className="text-blue-500">{notice.author}</td>
                                            <td className="text-gray-400">0</td>
                                            <td><button className="p-1 text-blue-400"><Eye size={14} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단: 오더관리진행단계 */}
            <div className="erp-card">
                <div className="erp-card-header">
                    <span className="font-bold text-sm">오더관리진행단계</span>
                    <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600"><Edit size={16} /></button>
                        <button className="p-1 text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                    </div>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="erp-table">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-3">오더관리번호</th>
                                <th className="pb-3">오더관리명</th>
                                <th className="pb-3 text-center">진행단계</th>
                                <th className="pb-3 text-right">상세</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-transparent">
                                    <td className="py-4 text-blue-500 font-medium">{order.id}</td>
                                    <td className="py-4 font-medium">{order.name}</td>
                                    <td className="py-4">
                                        <div className="flex items-center justify-center gap-1 overflow-visible px-4">
                                            {order.stages.map((stage, idx) => {
                                                const isActive = idx <= order.currentStage;
                                                const isCurrent = idx === order.currentStage;
                                                return (
                                                    <div key={idx} className="flex items-center">
                                                        <div className={`
                                                            px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-sm transition-all
                                                            ${isActive
                                                                ? 'bg-[#c7d2fe] text-[#4338ca] border border-[#a5b4fc]'
                                                                : 'bg-gray-100 text-gray-400 border border-gray-200'
                                                            }
                                                            ${isCurrent ? 'ring-2 ring-indigo-300 ring-offset-1' : ''}
                                                        `}>
                                                            {stage}
                                                            <span className={`text-[10px] ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                                                                ({order.counts[idx]})
                                                            </span>
                                                            {isCurrent && <Edit size={10} className="text-indigo-500" />}
                                                        </div>
                                                        {idx < order.stages.length - 1 && (
                                                            <div className="w-6 h-[1px] bg-gray-200" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="text-blue-500 hover:underline text-xs">보기</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
