'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Bell, CheckCircle, Clock, AlertCircle, Layers, Eye, Zap } from 'lucide-react';

export default function Dashboard() {
    const [currentDate] = useState(new Date(2026, 1, 4)); // 2026년 2월

    // 캘린더 데이터
    const schedules = [
        { day: 3, title: '거래처 미팅', time: '10:30', type: 'meeting', color: 'red' },
        { day: 3, title: '연차 김주임', type: 'leave', color: 'blue' },
        { day: 3, title: '주간근무', type: 'work', color: 'green' },
        { day: 4, title: '테스트', type: 'test', color: 'purple' },
        { day: 10, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 11, title: '연차_채연경', type: 'leave', color: 'yellow' },
        { day: 16, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 17, title: '주말근무', type: 'work', color: 'green' },
        { day: 24, title: '주간회의', type: 'meeting', color: 'red' },
        { day: 26, title: '월말 결산', type: 'work', color: 'cyan' },
    ];

    // 전자결재 데이터
    const approvals = [
        { id: 1, date: '2026/02/04', title: '카시트 김영호 과티 피츠로 진행서', requester: '최현영', status: '진행중', approver: '임효정', action: '보기' },
        { id: 2, date: '2026/01/20', title: '기획팀 연기록 서리카이그룹 산업영', requester: '김선용', status: '대기', approver: '김효정', action: '확인' },
        { id: 3, date: '2026/01/21', title: '거맘터 아카슨 거기억 선서영', requester: '아카슨', status: '완료', approver: '최인우', action: '복사' },
        { id: 4, date: '2026/01/21', title: '비품 신청서', requester: '박효연', status: '완료', approver: '전현우', action: '보기' },
        { id: 5, date: '2026/01/15', title: '외근신청 고지도 담기하원 조정화지', requester: '고지도', status: '완료', approver: '최최훈', action: '보기' },
    ];

    // 공지사항 데이터
    const notices = [
        { id: 1, priority: 'high', title: '자율출퇴시 및 가지금지신청시 작성요청', date: '2024/12/15', author: '이가은현' },
        { id: 2, priority: 'high', title: '근태/발령/직근 관련 보인지원 시율관련 공지', date: '2024/12/15', author: '이가은현' },
        { id: 3, priority: 'normal', title: '시재 회효화 스킬 향상', date: '2025/01/14', author: '이가은현' },
        { id: 4, priority: 'normal', title: '인사발령 공지', date: '2025/01/14', author: '매모리...' },
    ];

    // 오더관리 데이터
    const orders = [
        { id: 'O0024_003602', name: '기본유량호스', stages: ['구매', '판매', '검사', '완료'], currentStage: 1 },
        { id: 'O0021_007627', name: '수중산호물', stages: ['주문서', '반자시', '구매', '검사', '품질', '조산검', '주문서'], currentStage: 3 },
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];

    const getSchedulesForDay = (day: number) => schedules.filter(s => s.day === day);

    return (
        <div className="min-h-screen bg-[#0a0a0f] p-4">
            {/* 상단 네비게이션 */}
            <nav className="flex items-center gap-1 mb-4 p-2 bg-[#12121a] border border-cyan-500/20 rounded-lg overflow-x-auto">
                {['MyPage', 'Self-Customizing', '재고', '재고2', '호재', '회재1', '관리', '재무', '그룹웨어', '데이터센터'].map((item, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded transition-all ${idx === 0 ? 'bg-cyan-500/20 text-cyan-400' : 'text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                            }`}
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                        {item}
                    </button>
                ))}
            </nav>

            {/* 메인 콘텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* 왼쪽: 캘린더 */}
                <div className="bg-[#12121a] border border-cyan-500/20 rounded-lg overflow-hidden">
                    {/* 캘린더 헤더 */}
                    <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>2026/02</span>
                            <span className="text-zinc-400 text-sm">일정관리</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded"><ChevronLeft size={18} /></button>
                            <button className="p-1.5 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    {/* 캘린더 그리드 */}
                    <div className="p-3">
                        {/* 요일 헤더 */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {weeks.map((day, idx) => (
                                <div key={idx} className={`text-center text-xs font-medium py-2 ${idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-zinc-500'}`}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* 날짜 그리드 */}
                        <div className="grid grid-cols-7 gap-1">
                            {/* 빈 칸 */}
                            {Array.from({ length: firstDay }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="h-20"></div>
                            ))}

                            {/* 날짜 */}
                            {Array.from({ length: daysInMonth }).map((_, idx) => {
                                const day = idx + 1;
                                const daySchedules = getSchedulesForDay(day);
                                const isToday = day === 4;

                                return (
                                    <div
                                        key={day}
                                        className={`h-20 p-1 rounded border ${isToday ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-800/50 hover:border-cyan-500/30'} transition-all`}
                                    >
                                        <span className={`text-xs font-medium ${isToday ? 'text-cyan-400' : 'text-zinc-400'}`}>{day}</span>
                                        <div className="mt-1 space-y-0.5 overflow-hidden">
                                            {daySchedules.slice(0, 2).map((schedule, sIdx) => (
                                                <div
                                                    key={sIdx}
                                                    className={`text-[10px] px-1 py-0.5 rounded truncate ${schedule.color === 'red' ? 'bg-red-500/20 text-red-400' :
                                                        schedule.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                                            schedule.color === 'green' ? 'bg-emerald-500/20 text-emerald-400' :
                                                                schedule.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                    schedule.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                                                                        'bg-cyan-500/20 text-cyan-400'
                                                        }`}
                                                >
                                                    {schedule.time && <span className="mr-1">{schedule.time}</span>}
                                                    {schedule.title}
                                                </div>
                                            ))}
                                            {daySchedules.length > 2 && (
                                                <div className="text-[9px] text-zinc-500">+{daySchedules.length - 2} more</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 전자결재 + 공지사항 */}
                <div className="space-y-4">
                    {/* 전자결재 */}
                    <div className="bg-[#12121a] border border-cyan-500/20 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-3 border-b border-cyan-500/20 bg-cyan-500/5">
                            <div className="flex items-center gap-2">
                                <FileText className="text-cyan-400" size={18} />
                                <span className="text-sm font-bold text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>전자결재</span>
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono">내 기안문서</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-zinc-800">
                                        <th className="text-left p-2 text-zinc-500 font-medium">기안일자</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">제목</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">결재자</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">진행상태</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">결재</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">기안식복사</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {approvals.map((item) => (
                                        <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-cyan-500/5 transition-colors">
                                            <td className="p-2 text-zinc-400 font-mono">{item.date}</td>
                                            <td className="p-2 text-zinc-300 max-w-[150px] truncate">{item.title}</td>
                                            <td className="p-2 text-zinc-400">{item.requester}</td>
                                            <td className="p-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${item.status === '진행중' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    item.status === '완료' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        'bg-zinc-500/20 text-zinc-400'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-2 text-cyan-400">{item.approver}</td>
                                            <td className="p-2">
                                                <button className="text-cyan-400 hover:text-cyan-300 text-[10px] underline">{item.action}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 공지사항 */}
                    <div className="bg-[#12121a] border border-pink-500/20 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-3 border-b border-pink-500/20 bg-pink-500/5">
                            <div className="flex items-center gap-2">
                                <Bell className="text-pink-400" size={18} />
                                <span className="text-sm font-bold text-pink-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>공지사항</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-zinc-800">
                                        <th className="text-left p-2 text-zinc-500 font-medium w-12"></th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">제목</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">작성일</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">작성자</th>
                                        <th className="text-left p-2 text-zinc-500 font-medium">조회</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notices.map((item) => (
                                        <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-pink-500/5 transition-colors">
                                            <td className="p-2">
                                                {item.priority === 'high' && (
                                                    <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-bold rounded">중요</span>
                                                )}
                                            </td>
                                            <td className="p-2 text-zinc-300 max-w-[200px] truncate">{item.title}</td>
                                            <td className="p-2 text-zinc-400 font-mono">{item.date}</td>
                                            <td className="p-2 text-zinc-400">{item.author}</td>
                                            <td className="p-2">
                                                <button className="p-1 text-pink-400 hover:text-pink-300"><Eye size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 오더관리 진행단계 */}
            <div className="bg-[#12121a] border border-purple-500/20 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-purple-500/20 bg-purple-500/5">
                    <div className="flex items-center gap-2">
                        <Layers className="text-purple-400" size={18} />
                        <span className="text-sm font-bold text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>오더관리진행단계</span>
                    </div>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left p-2 text-zinc-500 font-medium">보디관리번호</th>
                                <th className="text-left p-2 text-zinc-500 font-medium">보디관리명</th>
                                <th className="text-left p-2 text-zinc-500 font-medium">진행단계</th>
                                <th className="text-left p-2 text-zinc-500 font-medium w-20">상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-purple-500/5 transition-colors">
                                    <td className="p-2 text-cyan-400 font-mono">{order.id}</td>
                                    <td className="p-2 text-zinc-300">{order.name}</td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-1 flex-wrap">
                                            {order.stages.map((stage, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-medium ${idx < order.currentStage ? 'bg-emerald-500/20 text-emerald-400' :
                                                        idx === order.currentStage ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500' :
                                                            'bg-zinc-700/30 text-zinc-500'
                                                        }`}>
                                                        {stage}
                                                        {idx < order.currentStage && <CheckCircle className="inline ml-1" size={10} />}
                                                        {idx === order.currentStage && <Clock className="inline ml-1" size={10} />}
                                                    </span>
                                                    {idx < order.stages.length - 1 && (
                                                        <span className="text-zinc-600 mx-1">→</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <button className="text-purple-400 hover:text-purple-300 text-[10px] underline">보기</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI 브리핑 (하단) */}
            <div className="mt-4 bg-[#12121a] border border-cyan-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Zap className="text-yellow-400" size={18} />
                    <span className="text-sm font-bold text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>AI_BRIEFING</span>
                    <span className="text-[10px] text-zinc-500 font-mono">// NEURAL_ENGINE</span>
                </div>
                <p className="text-zinc-400 text-sm font-mono leading-relaxed">
                    &gt;&gt; 분석 완료: 오늘 예정된 미팅 1건, 대기 중인 결재 2건이 있습니다. 캔버스존 리소스 사용률 92%로 높은 상태입니다.
                </p>
            </div>
        </div>
    );
}
