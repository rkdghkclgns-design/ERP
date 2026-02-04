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
        <aside className="w-[280px] min-h-screen flex flex-col bg-[#0d0d14] border-r border-cyan-500/10">
            {/* 로고 영역 */}
            <div className="px-6 py-6 border-b border-cyan-500/10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center"
                            style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
                        >
                            <Cpu className="text-white" size={24} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                    </div>
                    <div>
                        <h1
                            className="text-xl font-black tracking-wider text-cyan-400"
                            style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
                        >
                            DEEP.ERP
                        </h1>
                        <p className="text-[10px] text-cyan-500/50 tracking-[0.15em] uppercase font-mono mt-1">// System Online</p>
                    </div>
                </div>
            </div>

            {/* 시스템 상태 */}
            <div className="px-6 py-4">
                <div className="p-4 bg-[#0a0a0f] rounded-lg border border-cyan-500/10">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-500 tracking-wider">SYS_STATUS</span>
                        <span className="text-cyan-400 font-bold">ACTIVE</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                            className="h-full w-4/5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                            style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
                        ></div>
                    </div>
                    <p className="text-[9px] text-zinc-600 font-mono mt-2">CPU: 23% | MEM: 1.2GB</p>
                </div>
            </div>

            {/* 메뉴 영역 */}
            <nav className="flex-1 px-4 py-2">
                <p
                    className="px-4 py-3 text-[10px] font-bold text-cyan-500/40 uppercase tracking-[0.2em]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                    :: Navigation ::
                </p>
                <div className="space-y-1">
                    {MENU_ITEMS.map((item) => {
                        const Icon = Icons[item.icon] || LayoutDashboard;
                        const isActive = pathname === item.path;
                        return (
                            <div key={item.id} className="group flex items-center">
                                <Link
                                    href={item.path}
                                    className={`
                    flex-1 flex items-center gap-4 px-4 py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200
                    ${isActive
                                            ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                                            : 'text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/5 border border-transparent'
                                        }
                  `}
                                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                                >
                                    <Icon size={20} className={isActive ? 'text-cyan-400' : 'text-zinc-500'} />
                                    <span className="uppercase">{item.label}</span>
                                    {isActive && (
                                        <span className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"></span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => openGuide(item.id)}
                                    className="ml-1 p-2.5 text-zinc-700 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-all"
                                    title="도움말"
                                >
                                    <HelpCircle size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* 하단 정보 */}
            <div className="p-6 border-t border-cyan-500/10">
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs text-cyan-500 font-mono tracking-wider">CONNECTED</span>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono">
                        v2.0.77 // LOCAL_NODE
                    </p>
                </div>
            </div>
        </aside>
    );
};
