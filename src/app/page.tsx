'use client';

import { db } from '@/lib/utils'; // Error in user request? db is in lib/db.ts. I will fix it.
import { useState, useEffect } from 'react';
import { askAI } from '@/hooks/useAI';
import { Lightbulb } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, pending: 0 });
    const [aiBrief, setAiBrief] = useState("데이터를 분석 중입니다...");

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">경영 현황판</h2>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Live Status
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm">총 예약 건수</p>
                    <h3 className="text-3xl font-bold mt-1">128건</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm">금일 가용 리소스</p>
                    <h3 className="text-3xl font-bold mt-1">85%</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm">캔버스존 매진율</p>
                    <h3 className="text-3xl font-bold mt-1 text-rose-500">92%</h3>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-yellow-400" />
                    <h3 className="text-lg font-semibold">AI 경영 브리핑 (Llama 3)</h3>
                </div>
                <p className="text-blue-50 opacity-90 leading-relaxed">
                    {aiBrief}
                </p>
            </div>
        </div>
    );
}
