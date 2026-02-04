'use client';

import { useState } from 'react';
import { Lightbulb, TrendingUp, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Dashboard() {
    const [aiBrief] = useState("오늘 기준 총 128건의 예약이 등록되어 있으며, 캔버스존 매진율이 92%로 높은 수요를 보이고 있습니다. 플레이존의 14시~16시 시간대 예약이 특히 집중되어 있으니, 해당 시간대 운영 인력 배치에 유의하시기 바랍니다.");

    const stats = [
        {
            title: '총 예약 건수',
            value: '128건',
            change: '+12%',
            isPositive: true,
            icon: Package,
            color: 'blue'
        },
        {
            title: '금일 가용 리소스',
            value: '85%',
            change: '-5%',
            isPositive: false,
            icon: Users,
            color: 'emerald'
        },
        {
            title: '캔버스존 매진율',
            value: '92%',
            change: '+8%',
            isPositive: true,
            icon: TrendingUp,
            color: 'violet'
        }
    ];

    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">경영 현황판</h1>
                    <p className="text-slate-500 mt-1">실시간 운영 데이터를 확인하세요</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Status
                </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="card p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                                <stat.icon className={`text-${stat.color}-600`} size={24} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {stat.isPositive ? (
                                <ArrowUpRight className="text-emerald-500" size={16} />
                            ) : (
                                <ArrowDownRight className="text-rose-500" size={16} />
                            )}
                            <span className={`text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {stat.change}
                            </span>
                            <span className="text-sm text-slate-400 ml-1">vs 지난주</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI 브리핑 */}
            <div className="card overflow-hidden">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Lightbulb className="text-yellow-300" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">AI 경영 브리핑</h3>
                            <p className="text-blue-100 text-sm">Llama 3 기반 실시간 분석</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50">
                    <p className="text-slate-700 leading-relaxed">
                        {aiBrief}
                    </p>
                </div>
            </div>

            {/* 빠른 액션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">최근 예약</h4>
                    <div className="space-y-3">
                        {[
                            { name: '김민수', time: '14:00', product: '패키지', status: '확정' },
                            { name: '이지은', time: '15:00', product: '플레이존', status: '확정' },
                            { name: '박현우', time: '16:00', product: '캔버스존', status: '대기' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{item.name}</p>
                                        <p className="text-sm text-slate-500">{item.time} · {item.product}</p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${item.status === '확정'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-amber-50 text-amber-700'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">운영 알림</h4>
                    <div className="space-y-3">
                        {[
                            { type: 'info', message: '14시 패키지 예약 시 재고 자동 차감됩니다.', time: '방금' },
                            { type: 'warning', message: '캔버스존 16시 예약이 90% 이상입니다.', time: '5분 전' },
                            { type: 'success', message: '오늘 백업이 성공적으로 완료되었습니다.', time: '1시간 전' },
                        ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border-l-4 ${item.type === 'info' ? 'bg-blue-50 border-blue-500' :
                                    item.type === 'warning' ? 'bg-amber-50 border-amber-500' :
                                        'bg-emerald-50 border-emerald-500'
                                }`}>
                                <p className="text-sm text-slate-700">{item.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
