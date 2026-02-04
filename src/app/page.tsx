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
        <div className="space-y-6 cyber-grid min-h-screen p-6">
            {/* 헤더 */}
            <div className="flex items-start justify-between">
                <div>
                    <h1
                        className="text-3xl font-black tracking-wider neon-text"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        경영 현황판
                    </h1>
                    <p className="text-zinc-500 mt-1 font-mono text-sm">
                        :: REAL-TIME OPERATIONAL DASHBOARD ::
                    </p>
                </div>
                <div className="cyber-card px-4 py-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    <span className="text-cyan-400 text-sm font-mono tracking-wider">LIVE</span>
                </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`cyber-card p-5 ${stat.warning ? 'border-pink-500/50' : ''}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">{stat.title}</p>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span
                                        className={`text-4xl font-black ${stat.color === 'cyan' ? 'text-cyan-400' :
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
                            <div className={`p-3 rounded ${stat.color === 'cyan' ? 'bg-cyan-500/10' :
                                    stat.color === 'green' ? 'bg-emerald-500/10' :
                                        'bg-pink-500/10'
                                }`}>
                                <stat.icon className={`${stat.color === 'cyan' ? 'text-cyan-400' :
                                        stat.color === 'green' ? 'text-emerald-400' :
                                            'text-pink-400'
                                    }`} size={24} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <span className={`text-xs font-mono ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-pink-400'
                                }`}>
                                {stat.change}
                            </span>
                            <span className="text-[10px] text-zinc-600 font-mono">vs LAST_WEEK</span>
                        </div>
                        {stat.warning && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-pink-500/20">
                                <AlertTriangle className="text-pink-400" size={14} />
                                <span className="text-[10px] text-pink-400 font-mono">HIGH_LOAD_WARNING</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* AI 브리핑 */}
            <div className="cyber-card overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/30 p-4 border-b border-cyan-500/20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded">
                            <Zap className="text-purple-400" size={24} />
                        </div>
                        <div>
                            <h3
                                className="text-lg font-bold text-purple-300 tracking-wider"
                                style={{ fontFamily: 'Orbitron, sans-serif' }}
                            >
                                AI_BRIEFING
                            </h3>
                            <p className="text-[10px] text-purple-500/60 font-mono">NEURAL_ENGINE :: LLAMA_3</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#0a0a0f]/50">
                    <div className="flex items-start gap-2">
                        <Terminal className="text-cyan-500 mt-1 flex-shrink-0" size={16} />
                        <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                            {aiBrief}
                        </p>
                    </div>
                </div>
            </div>

            {/* 하단 패널 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 최근 예약 */}
                <div className="cyber-card">
                    <div className="p-4 border-b border-cyan-500/20">
                        <h4
                            className="text-sm font-bold text-cyan-400 tracking-wider"
                            style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                            RECENT_TRANSACTIONS
                        </h4>
                    </div>
                    <div className="p-4 space-y-3">
                        {[
                            { id: 'TRX-0847', name: '김민수', time: '14:00', zone: 'PACKAGE', status: 'CONFIRMED' },
                            { id: 'TRX-0848', name: '이지은', time: '15:00', zone: 'PLAYZONE', status: 'CONFIRMED' },
                            { id: 'TRX-0849', name: '박현우', time: '16:00', zone: 'CANVAS', status: 'PENDING' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-cyan-500/10 rounded flex items-center justify-center">
                                        <Users className="text-cyan-400" size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-200">{item.name}</p>
                                        <p className="text-[10px] text-zinc-500 font-mono">{item.id} // {item.zone}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-zinc-400 font-mono">{item.time}</p>
                                    <span className={`text-[10px] font-mono ${item.status === 'CONFIRMED' ? 'text-emerald-400' : 'text-yellow-400'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 시스템 알림 */}
                <div className="cyber-card">
                    <div className="p-4 border-b border-cyan-500/20">
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
                                className={`p-3 rounded border-l-2 ${item.type === 'info' ? 'bg-cyan-500/5 border-cyan-500' :
                                        item.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500' :
                                            'bg-emerald-500/5 border-emerald-500'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <p className="text-sm text-zinc-300">{item.msg}</p>
                                    <span className="text-[10px] text-zinc-500 font-mono ml-2">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 푸터 상태바 */}
            <div className="cyber-card p-3 flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-4">
                    <span className="text-zinc-500">NODE_ID: LOCAL_0x7F</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                        <Shield size={12} /> SECURE_CONNECTION
                    </span>
                </div>
                <div className="text-zinc-500">
                    DEEP.ERP v2.0.77 // © 2026 ANTIGRAFFITI
                </div>
            </div>
        </div>
    );
}
