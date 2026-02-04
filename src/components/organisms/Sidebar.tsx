'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from '../../constants/menuConfig';
import { useGuide } from '../../contexts/GuideContext';
import { LayoutDashboard, Calendar, Settings, HelpCircle, Building2 } from 'lucide-react';

const Icons: Record<string, any> = { LayoutDashboard, Calendar, Settings };

export const Sidebar = () => {
    const pathname = usePathname();
    const { openGuide } = useGuide();

    return (
        <aside className="w-64 bg-[#0f172a] min-h-screen flex flex-col">
            {/* 로고 영역 */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Building2 className="text-white" size={22} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">DEEP.ERP</h1>
                        <p className="text-xs text-slate-500">Local Edition</p>
                    </div>
                </div>
            </div>

            {/* 메뉴 영역 */}
            <nav className="flex-1 p-4 space-y-1">
                <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">메뉴</p>
                {MENU_ITEMS.map((item) => {
                    const Icon = Icons[item.icon] || LayoutDashboard;
                    const isActive = pathname === item.path;
                    return (
                        <div key={item.id} className="group flex items-center">
                            <Link
                                href={item.path}
                                className={`
                  flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }
                `}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                            <button
                                onClick={() => openGuide(item.id)}
                                className="ml-1 p-2 text-slate-600 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all"
                                title="도움말"
                            >
                                <HelpCircle size={16} />
                            </button>
                        </div>
                    );
                })}
            </nav>

            {/* 하단 정보 */}
            <div className="p-4 border-t border-slate-800">
                <div className="px-3 py-2 bg-slate-800/50 rounded-lg">
                    <p className="text-xs text-slate-500">시스템 상태</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-emerald-400 font-medium">정상 운영 중</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
