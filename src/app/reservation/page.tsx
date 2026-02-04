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
        <div className="space-y-6 cyber-grid min-h-screen p-6">
            <PageHeader title="예약/재고 관리" menuId="reservation" />

            <div className="bg-[#12121a] rounded-lg border border-cyan-500/20 overflow-hidden shadow-2xl">
                {/* 캘린더 헤더 */}
                <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-cyan-500/5">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="text-cyan-400" size={24} />
                            <h3 className="text-2xl font-black text-cyan-400 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {format(currentDate, 'yyyy / MM')}
                            </h3>
                        </div>
                        <div className="flex bg-[#0a0a0f] rounded border border-cyan-500/20 p-1">
                            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1.5 hover:text-cyan-400 text-zinc-500 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1.5 hover:text-cyan-400 text-zinc-500 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cyber-btn flex items-center gap-2"
                    >
                        <Plus size={18} />
                        NEW_RESERVATION
                    </button>
                </div>

                {/* 캘린더 그리드 */}
                <div className="grid grid-cols-7 gap-px bg-cyan-500/10">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, idx) => (
                        <div key={d} className={`bg-[#0d0d14] p-3 text-center text-[10px] font-black tracking-widest ${idx === 0 ? 'text-pink-500' : idx === 6 ? 'text-cyan-400' : 'text-zinc-500'}`} style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {d}
                        </div>
                    ))}
                    {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-[#0a0a0f]/50 p-4 h-32 opacity-20" />
                    ))}
                    {days.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const dayReservations = reservations?.filter(r => r.date === dateStr) || [];
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div key={dateStr} className={`bg-[#0d0d14] p-2 h-32 border-r border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-all group ${isToday ? 'ring-1 ring-inset ring-cyan-500/50 bg-cyan-500/5' : ''}`}>
                                <div className={`text-sm font-bold mb-2 font-mono ${isToday ? 'text-cyan-400' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                    {format(day, 'dd')}
                                </div>
                                <div className="space-y-1 overflow-y-auto max-h-20 scrollbar-hide">
                                    {dayReservations.map((res, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "text-[9px] px-1.5 py-1 rounded border leading-tight truncate font-bold uppercase tracking-tighter",
                                                res.productName === '패키지' ? "bg-purple-500/10 border-purple-500/50 text-purple-400" :
                                                    res.productName === '플레이존' ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" :
                                                        "bg-pink-500/10 border-pink-500/50 text-pink-400"
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

            {/* 새 예약 등록 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#0a0a0f]/90 backdrop-blur-md p-4">
                    <div className="bg-[#12121a] w-full max-w-md rounded border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-cyan-500/20 bg-cyan-500/5 flex items-center justify-between">
                            <h3 className="text-lg font-black text-cyan-400 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>CREATE_NODE::RESERVATION</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-pink-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-bold text-cyan-500/50 uppercase tracking-widest">
                                    <User size={12} /> CUSTOMER_NAME
                                </label>
                                <input
                                    type="text"
                                    value={newReservation.customerName || ''}
                                    onChange={e => setNewReservation({ ...newReservation, customerName: e.target.value })}
                                    className="w-full"
                                    placeholder="ENTER_NAME..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-cyan-500/50 uppercase tracking-widest">
                                        <CalendarIcon size={12} /> DATE_STAMP
                                    </label>
                                    <input
                                        type="date"
                                        value={newReservation.date}
                                        onChange={e => setNewReservation({ ...newReservation, date: e.target.value })}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-cyan-500/50 uppercase tracking-widest">
                                        <Clock size={12} /> TIME_SLOT
                                    </label>
                                    <input
                                        type="time"
                                        value={newReservation.time}
                                        onChange={e => setNewReservation({ ...newReservation, time: e.target.value })}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-bold text-cyan-500/50 uppercase tracking-widest">
                                    <Package size={12} /> RESOURCE_TYPE
                                </label>
                                <select
                                    value={newReservation.productName}
                                    onChange={e => setNewReservation({ ...newReservation, productName: e.target.value })}
                                    className="w-full"
                                >
                                    <option value="플레이존">PLAY_ZONE (SINGLE)</option>
                                    <option value="캔버스존">CANVAS_ZONE (SINGLE)</option>
                                    <option value="패키지">FULL_NODE_PACKAGE</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-6 bg-[#0a0a0f] flex gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all font-bold text-xs tracking-widest uppercase"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                                ABORT
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 cyber-btn text-xs"
                            >
                                EXECUTE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
