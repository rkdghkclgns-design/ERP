'use client';

import { useState, useEffect } from 'react';
import { db, Reservation } from '../../lib/db';
import { PageHeader } from '../../components/molecules/PageHeader';
import { useLiveQuery } from 'dexie-react-hooks';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
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
        <div className="space-y-6">
            <PageHeader title="예약/재고 관리" menuId="reservation" />

            <div className="bg-[#1e293b] rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold text-white">
                            {format(currentDate, 'yyyy년 MM월')}
                        </h3>
                        <div className="flex bg-gray-800 rounded-lg p-1">
                            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 hover:text-white text-gray-400">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 hover:text-white text-gray-400">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all font-bold"
                    >
                        <Plus size={20} />
                        새 예약 등록
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-px bg-gray-700">
                    {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                        <div key={d} className="bg-[#0f172a] p-3 text-center text-xs font-bold text-gray-500 uppercase">
                            {d}
                        </div>
                    ))}
                    {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-[#1e293b] p-4 h-32 opacity-30" />
                    ))}
                    {days.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const dayReservations = reservations?.filter(r => r.date === dateStr) || [];

                        return (
                            <div key={dateStr} className="bg-[#1e293b] p-2 h-32 border-b border-r border-gray-700 hover:bg-gray-800 transition-colors">
                                <div className="text-sm font-semibold text-gray-400 mb-2">
                                    {format(day, 'd')}
                                </div>
                                <div className="space-y-1 overflow-y-auto max-h-20 scrollbar-hide">
                                    {dayReservations.map((res, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "text-[10px] px-1.5 py-0.5 rounded border leading-tight truncate",
                                                res.productName === '패키지' ? "bg-purple-900/30 border-purple-500 text-purple-300" :
                                                    res.productName === '플레이존' ? "bg-blue-900/30 border-blue-500 text-blue-300" :
                                                        "bg-emerald-900/30 border-emerald-500 text-emerald-300"
                                            )}
                                        >
                                            {res.time} {res.customerName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1e293b] w-full max-w-md rounded-2xl border border-gray-600 shadow-2xl overflow-hidden p-6 animate-in zoom-in-95">
                        <h3 className="text-lg font-bold text-white mb-6">새 예약 등록</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">고객명</label>
                                <input
                                    type="text"
                                    value={newReservation.customerName || ''}
                                    onChange={e => setNewReservation({ ...newReservation, customerName: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                    placeholder="홍길동"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">날짜</label>
                                    <input
                                        type="date"
                                        value={newReservation.date}
                                        onChange={e => setNewReservation({ ...newReservation, date: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">시간</label>
                                    <input
                                        type="time"
                                        value={newReservation.time}
                                        onChange={e => setNewReservation({ ...newReservation, time: e.target.value })}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">상품 선택</label>
                                <select
                                    value={newReservation.productName}
                                    onChange={e => setNewReservation({ ...newReservation, productName: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                >
                                    <option value="플레이존">플레이존 (단품)</option>
                                    <option value="캔버스존">캔버스존 (단품)</option>
                                    <option value="패키지">통합 패키지</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white font-bold"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold"
                            >
                                예약 완료
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
