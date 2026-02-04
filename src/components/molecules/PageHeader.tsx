'use client';

import { useGuide } from '@/contexts/GuideContext';
import { HelpCircle } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    menuId: string;
}

export function PageHeader({ title, menuId }: PageHeaderProps) {
    const { openGuide } = useGuide();

    return (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
                onClick={() => openGuide(menuId)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-sm"
            >
                <HelpCircle size={18} className="text-yellow-400" />
                도움말 보기
            </button>
        </div>
    );
}
