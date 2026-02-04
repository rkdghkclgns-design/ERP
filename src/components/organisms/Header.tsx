'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGuide } from '../../contexts/GuideContext';
import { HelpCircle } from 'lucide-react';

const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'inventory', label: '재고 I', path: '/reservation' },
    { id: 'accounting1', label: '회계 I', path: '#' },
    { id: 'admin', label: '관리', path: '/admin' },
    { id: 'groupware', label: '그룹웨어', path: '#' },
];

export const Header = () => {
    const pathname = usePathname();
    const { openGuide } = useGuide();

    // 현재 경로에 맞는 가이드 ID 결정
    const getCurrentMenuId = () => {
        if (pathname === '/') return 'dashboard';
        if (pathname === '/reservation') return 'reservation';
        if (pathname === '/admin') return 'admin';
        return 'dashboard';
    };

    return (
        <header className="h-12 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-8">
                <span className="text-[#e11d48] font-black text-xl italic tracking-tighter">ECOUNT</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center h-full overflow-x-auto no-scrollbar">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.id}
                            href={item.path}
                            className={`
                                h-full flex items-center px-4 text-sm font-medium transition-colors whitespace-nowrap
                                ${isActive
                                    ? 'text-[#e11d48] border-b-2 border-[#e11d48]'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }
                            `}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Right side tools */}
            <div className="ml-auto flex items-center gap-3">
                <button
                    onClick={() => openGuide(getCurrentMenuId())}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition"
                    title="도움말"
                >
                    <HelpCircle size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                    AD
                </div>
            </div>
        </header>
    );
};
