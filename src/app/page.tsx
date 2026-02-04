'use client';

import { useState } from 'react';
import { Zap, Users, TrendingUp, AlertTriangle, Activity, Terminal, Database, Shield } from 'lucide-react';

export default function Dashboard() {
    const [aiBrief] = useState(">> 분석 완료: 총 128건의 트랜잭션 감지. 캔버스존 리소스 사용률 92%로 임계치 도달. 플레이존 14:00-16:00 시간대 고밀도 예약 클러스터 확인. 운영 인력 재배치 권고. 시스템 안정성: 최적.");

    const stats = [
        {
            title: 'TOTAL_RESERVATIONS',
            value: '128',
            unit: 'UNITS',
            change: '+12%',
            icon: Database,
            color: 'cyan'
        },
        {
            title: 'RESOURCE_AVAILABLE',
            value: '85',
            unit: '%',
            change: '-5%',
            icon: Activity,
            color: 'green'
        },
        {
            title: 'CANVAS_ZONE_LOAD',
            value: '92',
            unit: '%',
            change: '+8%',
            icon: TrendingUp,
            color: 'pink',
            warning: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* 메인 콘텐츠 영역 */}
            <div className="p-8 max-w-7xl mx-auto space-y-8">

                {/* 헤더 */}
                <header className="flex items-center justify-between pb-6 border-b border-cyan-500/10">
                    <div>
                        <h1
                            className="text-3xl font-black tracking-wider text-cyan-400"
                            style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
                        >
                            경영 현황판
                        </h1>
                        <p className="text-zinc-500 mt-2 font-mono text-sm tracking-wide">
                            :: REAL-TIME OPERATIONAL DASHBOARD ::
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#12121a] border border-cyan-500/30 rounded-lg">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="text-cyan-400 text-sm font-bold tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>LIVE</span>
                    </div>
                </header>

                {/* 통계 카드 그리드 */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`
                                relative p-6 bg-[#12121a] rounded-lg overflow-hidden
                                border ${stat.warning ? 'border-pink-500/40' : 'border-cyan-500/20'}
                                hover:border-cyan-400/50 transition-all duration-300
                            `}
                        >
                            {/* 상단 네온 라인 */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] ${stat.color === 'cyan' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' :
                                    stat.color === 'green' ? 'bg-gradient-to-r from-transparent via-emerald-500 to-transparent' :
                                        'bg-gradient-to-r from-transparent via-pink-500 to-transparent'
                                }`}></div>

                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] text-zinc-500 font-mono tracking-wider mb-3">{stat.title}</p>
                                    <div className="flex items-baseline gap-2">
                                        <span
                                            className={`text-5xl font-black ${stat.color === 'cyan' ? 'text-cyan-400' :
                                                    stat.color === 'green' ? 'text-emerald-400' :
                                                        'text-pink-400'
                                                }`}
                                            style={{ fontFamily: 'Orbitron, sans-serif' }}
                                        >
                                            {stat.value}
                                        </span>
                                        <span className="text-zinc-500 text-sm font-mono">{stat.unit}</span>
                                    </div>
                                </div>
                                <div className={`p-4 rounded-lg ${stat.color === 'cyan' ? 'bg-cyan-500/10' :
                                        stat.color === 'green' ? 'bg-emerald-500/10' :
                                            'bg-pink-500/10'
                                    }`}>
                                    <stat.icon className={`${stat.color === 'cyan' ? 'text-cyan-400' :
                                            stat.color === 'green' ? 'text-emerald-400' :
                                                'text-pink-400'
                                        }`} size={28} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-zinc-800/50">
                                <span className={`text-sm font-bold font-mono ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-pink-400'
                                    }`}>
                                    {stat.change}
                                </span>
                                <span className="text-[11px] text-zinc-600 font-mono">vs LAST_WEEK</span>
                            </div>

                            {stat.warning && (
                                <div className="flex items-center gap-2 mt-4 p-3 bg-pink-500/5 rounded border border-pink-500/20">
                                    <AlertTriangle className="text-pink-400" size={16} />
                                    <span className="text-[11px] text-pink-400 font-mono tracking-wide">HIGH_LOAD_WARNING</span>
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* AI 브리핑 섹션 */}
                <section className="bg-[#12121a] rounded-lg border border-purple-500/30 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-cyan-900/20 px-6 py-5 border-b border-purple-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                                <Zap className="text-purple-400" size={26} />
                            </div>
                            <div>
                                <h3
                                    className="text-xl font-bold text-purple-300 tracking-wider"
                                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                                >
                                    AI_BRIEFING
                                </h3>
                                <p className="text-[11px] text-purple-500/70 font-mono mt-1">NEURAL_ENGINE :: LLAMA_3</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex gap-4">
                            <Terminal className="text-cyan-500 mt-1 flex-shrink-0" size={18} />
                            <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                                {aiBrief}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 하단 패널 그리드 */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 최근 예약 */}
                    <div className="bg-[#12121a] rounded-lg border border-cyan-500/20 overflow-hidden">
                        <div className="px-6 py-4 border-b border-cyan-500/20 bg-cyan-500/5">
                            <h4
                                className="text-sm font-bold text-cyan-400 tracking-wider"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                                RECENT_TRANSACTIONS
                            </h4>
                        </div>
                        <div className="p-4">
                            <div className="space-y-1">
                                {[
                                    { id: 'TRX-0847', name: '김민수', time: '14:00', zone: 'PACKAGE', status: 'CONFIRMED' },
                                    { id: 'TRX-0848', name: '이지은', time: '15:00', zone: 'PLAYZONE', status: 'CONFIRMED' },
                                    { id: 'TRX-0849', name: '박현우', time: '16:00', zone: 'CANVAS', status: 'PENDING' },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-4 rounded-lg hover:bg-cyan-500/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                                                <Users className="text-cyan-400" size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-zinc-200">{item.name}</p>
                                                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{item.id} // {item.zone}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-zinc-400 font-mono">{item.time}</p>
                                            <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold font-mono rounded ${item.status === 'CONFIRMED'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 시스템 알림 */}
                    <div className="bg-[#12121a] rounded-lg border border-pink-500/20 overflow-hidden">
                        <div className="px-6 py-4 border-b border-pink-500/20 bg-pink-500/5">
                            <h4
                                className="text-sm font-bold text-pink-400 tracking-wider"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                                SYSTEM_ALERTS
                            </h4>
                        </div>
                        <div className="p-4 space-y-3">
                            {[
                                { type: 'info', msg: '14시 패키지 예약 시 재고 자동 차감 예정', time: 'NOW' },
                                { type: 'warning', msg: '캔버스존 16시 예약률 90% 초과', time: '-5m' },
                                { type: 'success', msg: '일일 백업 프로세스 정상 완료', time: '-1h' },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-lg border-l-[3px] ${item.type === 'info' ? 'bg-cyan-500/5 border-cyan-500' :
                                            item.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500' :
                                                'bg-emerald-500/5 border-emerald-500'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <p className="text-sm text-zinc-300">{item.msg}</p>
                                        <span className="text-[10px] text-zinc-500 font-mono whitespace-nowrap">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 푸터 상태바 */}
                <footer className="mt-8 p-4 bg-[#12121a] rounded-lg border border-zinc-800/50 flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-6">
                        <span className="text-zinc-500">NODE_ID: LOCAL_0x7F</span>
                        <div className="w-px h-4 bg-zinc-800"></div>
                        <span className="text-emerald-400 flex items-center gap-2">
                            <Shield size={14} /> SECURE_CONNECTION
                        </span>
                    </div>
                    <div className="text-zinc-500">
                        DEEP.ERP v2.0.77 // © 2026 ANTIGRAFFITI
                    </div>
                </footer>
            </div>
        </div>
    );
}
