'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from '../../constants/menuConfig';
import { useGuide } from '../../contexts/GuideContext';
import { LayoutDashboard, Calendar, Settings, HelpCircle, Cpu } from 'lucide-react';

const Icons: Record<string, any> = { LayoutDashboard, Calendar, Settings };

export const Sidebar = () => {
    const pathname = usePathname();
    const { openGuide } = useGuide();

    return (
        <aside className="w-72 min-h-screen flex flex-col border-r border-cyan-500/20 bg-[#0a0a0f]/95 backdrop-blur-sm">
            {/* 로고 영역 */}
            <div className="p-6 border-b border-cyan-500/20">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded flex items-center justify-center animate-pulse-glow">
                            <Cpu className="text-black" size={24} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-wider neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            DEEP.ERP
                        </h1>
                        <p className="text-xs text-cyan-500/60 tracking-widest uppercase">// System Online</p>
                    </div>
                </div>
            </div>

            {/* 시스템 상태 */}
            <div className="px-6 py-4 border-b border-cyan-500/20">
                <div className="cyber-card p-3">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 uppercase tracking-wider">SYS_STATUS</span>
                        <span className="text-cyan-400 font-mono">ACTIVE</span>
                    </div>
                    <div className="mt-2 h-1 bg-zinc-800 rounded overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* 메뉴 영역 */}
            <nav className="flex-1 p-4 space-y-1">
                <p className="px-3 py-2 text-[10px] font-bold text-cyan-500/50 uppercase tracking-[0.2em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    :: NAVIGATION ::
                </p>
                {MENU_ITEMS.map((item) => {
                    const Icon = Icons[item.icon] || LayoutDashboard;
                    const isActive = pathname === item.path;
                    return (
                        <div key={item.id} className="group flex items-center">
                            <Link
                                href={item.path}
                                className={`
                  flex-1 flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide transition-all relative
                  ${isActive
                                        ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
                                        : 'text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/5 border-l-2 border-transparent'
                                    }
                `}
                                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                            >
                                <Icon size={18} className={isActive ? 'text-cyan-400' : ''} />
                                <span className="uppercase">{item.label}</span>
                                {isActive && (
                                    <span className="absolute right-3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                )}
                            </Link>
                            <button
                                onClick={() => openGuide(item.id)}
                                className="p-2 text-zinc-600 hover:text-pink-500 opacity-0 group-hover:opacity-100 transition-all"
                                title="도움말"
                            >
                                <HelpCircle size={16} />
                            </button>
                        </div>
                    );
                })}
            </nav>

            {/* 하단 정보 */}
            <div className="p-4 border-t border-cyan-500/20">
                <div className="text-center">
                    <p className="text-[10px] text-zinc-600 font-mono">
                        v2.0.77 // LOCAL_NODE
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-cyan-500 font-mono tracking-wider">CONNECTED</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
