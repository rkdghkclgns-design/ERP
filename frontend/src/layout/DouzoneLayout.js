import React, { useState } from 'react';
import { HelpCircle, ChevronRight, X } from 'lucide-react';

export default function DouzoneLayout({ children, activeMenu }) {
    const [showHelp, setShowHelp] = useState(false);

    const helpContent = {
        '전표입력': '차변/대변 합계가 일치해야 저장됩니다. 서비스업은 800번대 계정을 사용하세요.',
        '급여관리': '4대보험 요율은 매년 자동 업데이트됩니다.'
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-sm">
            <aside className="w-52 bg-[#2c3e50] text-white flex flex-col">
                <div className="p-4 bg-[#1a252f] font-bold text-emerald-400">DEEP ERP PRO</div>
                <nav className="flex-1 mt-4">
                    <div className="px-4 py-2 text-gray-500 font-bold text-xs uppercase">회계관리</div>
                    <div className="px-8 py-2 hover:bg-[#34495e] cursor-pointer text-gray-300">전표입력</div>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col relative">
                <header className="h-10 bg-white border-b flex items-center justify-between px-4">
                    <div className="font-bold">{activeMenu}</div>
                    <button onClick={() => setShowHelp(true)} className="flex items-center gap-1 text-emerald-600 font-bold">
                        <HelpCircle size={14} /> 도움말
                    </button>
                </header>
                <div className="flex-1 p-4 overflow-auto">{children}</div>

                {showHelp && (
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl border-l-4 border-emerald-500 p-6 z-50">
                        <div className="flex justify-between border-b pb-2 mb-4">
                            <h3 className="font-bold">지능형 도움말</h3>
                            <X className="cursor-pointer" onClick={() => setShowHelp(false)} />
                        </div>
                        <p className="leading-relaxed text-gray-600 italic">{helpContent[activeMenu]}</p>
                    </div>
                )}
            </main>
        </div>
    );
}
