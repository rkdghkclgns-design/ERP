'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS } from '../../constants/menuConfig';
import { useGuide } from '../../contexts/GuideContext';
import { LayoutDashboard, Calendar, Settings, HelpCircle } from 'lucide-react';

const Icons: any = { LayoutDashboard, Calendar, Settings };

export const Sidebar = () => {
    const pathname = usePathname();
    const { openGuide } = useGuide();

    return (
        <aside className="w-64 bg-[#0f172a] border-r border-gray-800 h-screen flex flex-col p-4">
            <h1 className="text-xl font-bold text-cyan-400 mb-8 px-2">DEEP.ERP <span className="text-xs text-gray-500">Local</span></h1>
            <nav className="space-y-2">
                {MENU_ITEMS.map((item) => {
                    const Icon = Icons[item.icon] || LayoutDashboard;
                    const isActive = pathname === item.path;
                    return (
                        <div key={item.id} className="group relative flex items-center">
                            <Link href={item.path} className={`flex-1 flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                            <button onClick={() => openGuide(item.id)} className="absolute right-2 text-gray-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all">
                                <HelpCircle size={18} />
                            </button>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};
