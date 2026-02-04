'use client';

import { useGuide } from '../../contexts/GuideContext';
import { HelpCircle } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    menuId: string;
}

export const PageHeader = ({ title, menuId }: PageHeaderProps) => {
    const { openGuide } = useGuide();

    return (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                    {title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">System Online</span>
                </div>
            </div>
            <button
                onClick={() => openGuide(menuId)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all text-sm font-medium"
            >
                <HelpCircle size={16} />
                <span>도움말</span>
            </button>
        </div>
    );
};
