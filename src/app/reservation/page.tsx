'use client';

import { useState, useEffect } from 'react';
import { db, Reservation } from '../../lib/db';
import { PageHeader } from '../../components/molecules/PageHeader';
import { useLiveQuery } from 'dexie-react-hooks';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, User, Clock, Package, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReservationPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReservation, setNewReservation] = useState<Partial<Reservation>>({
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '14:00',
        productName: '플레이존',
        status: 'CONFIRMED'
    });

    const reservations = useLiveQuery(() => db.reservations.toArray());

    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const handleCreate = async () => {
        if (!newReservation.customerName) {
            alert('고객명을 입력해주세요.');
            return;
        }
        await db.reservations.add(newReservation as Reservation);
        setIsModalOpen(false);
        setNewReservation({
            date: format(new Date(), 'yyyy-MM-dd'),
            time: '14:00',
            productName: '플레이존',
            status: 'CONFIRMED'
        });
    };

    return (
        <div className="p-6 space-y-6">
            <PageHeader title="예약/재고 관리" menuId="reservation" />

            <div className="erp-card">
                {/* 캘린더 헤더 */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="text-blue-500" size={20} />
                            <h3 className="text-lg font-bold text-gray-800">
                                {format(currentDate, 'yyyy년 MM월')}
                            </h3>
                        </div>
                        <div className="flex bg-white rounded border border-gray-200 p-1">
                            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 px-2 hover:bg-gray-100 text-gray-500 rounded transition-colors">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 px-2 hover:bg-gray-100 text-gray-500 rounded transition-colors">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="erp-btn erp-btn-primary flex items-center gap-2 shadow-sm"
                    >
                        <Plus size={16} />
                        예약 등록
                    </button>
                </div>

                {/* 캘린더 그리드 */}
                <div className="grid grid-cols-7 gap-px bg-gray-200 border-b border-gray-200">
                    {['일', '월', '화', '수', '목', '금', '토'].map((d, idx) => (
                        <div key={d} className={`bg-gray-50 p-2 text-center text-[11px] font-bold ${idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-500'}`}>
                            {d}
                        </div>
                    ))}
                    {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white/50 h-32" />
                    ))}
                    {days.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const dayReservations = reservations?.filter(r => r.date === dateStr) || [];
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div key={dateStr} className={`bg-white p-2 h-32 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50 transition-all group ${isToday ? 'bg-blue-50/30' : ''}`}>
                                <div className={`text-xs font-bold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {format(day, 'd')}
                                    {isToday && <span className="ml-1.5 text-[10px] bg-blue-500 text-white px-1 rounded-sm">오늘</span>}
                                </div>
                                <div className="space-y-1 overflow-y-auto max-h-[84px] no-scrollbar">
                                    {dayReservations.map((res, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "text-[10px] px-1.5 py-0.5 rounded border leading-tight truncate font-medium",
                                                res.productName === '패키지' ? "bg-purple-50 border-purple-100 text-purple-600" :
                                                    res.productName === '플레이존' ? "bg-blue-50 border-blue-100 text-blue-600" :
                                                        "bg-orange-50 border-orange-100 text-orange-600"
                                            )}
                                        >
                                            <span className="opacity-70 mr-1">{res.time}</span>
                                            {res.customerName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 새 예약 등록 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-xl border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">신규 예약 등록</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                    <User size={14} /> 고객명
                                </label>
                                <input
                                    type="text"
                                    value={newReservation.customerName || ''}
                                    onChange={e => setNewReservation({ ...newReservation, customerName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                    placeholder="고객 성함을 입력하세요"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                        <CalendarIcon size={14} /> 날짜
                                    </label>
                                    <input
                                        type="date"
                                        value={newReservation.date}
                                        onChange={e => setNewReservation({ ...newReservation, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                        <Clock size={14} /> 시간
                                    </label>
                                    <input
                                        type="time"
                                        value={newReservation.time}
                                        onChange={e => setNewReservation({ ...newReservation, time: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                    <Package size={14} /> 리소스
                                </label>
                                <select
                                    value={newReservation.productName}
                                    onChange={e => setNewReservation({ ...newReservation, productName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none bg-white font-medium"
                                >
                                    <option value="플레이존">플레이존 (단품)</option>
                                    <option value="캔버스존">캔버스존 (단품)</option>
                                    <option value="패키지">통합 관리 패키지</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50/50 flex gap-3 border-t border-gray-100">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 erp-btn erp-btn-outline"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 erp-btn erp-btn-primary"
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
