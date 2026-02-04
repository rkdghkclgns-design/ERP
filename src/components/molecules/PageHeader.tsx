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
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/20">
            <h2
                className="text-2xl font-black tracking-wider text-cyan-400"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
                {title}
            </h2>
            <button
                onClick={() => openGuide(menuId)}
                className="flex items-center gap-2 px-4 py-2 bg-[#12121a] hover:bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 rounded transition-all text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
                <HelpCircle size={16} className="text-pink-500" />
                HELP_DOCS
            </button>
        </div>
    );
}
