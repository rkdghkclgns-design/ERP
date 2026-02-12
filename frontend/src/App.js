import React, { useState } from 'react';
import DouzoneLayout from './layout/DouzoneLayout';
import EnterpriseGrid from './components/EnterpriseGrid';
import KanbanBoard from './components/KanbanBoard';

function App() {
    const [activeMenu, setActiveMenu] = useState('전표입력');

    // Simple router for demonstration
    const renderContent = () => {
        switch (activeMenu) {
            case '전표입력':
                return <EnterpriseGrid />;
            case '업무현황':
                return <KanbanBoard />;
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        준비 중인 기능입니다.
                    </div>
                );
        }
    };

    return (
        <DouzoneLayout activeMenu={activeMenu}>
            <div className="mb-4 flex gap-2">
                {/* Navigation Simulation */}
                <button
                    onClick={() => setActiveMenu('전표입력')}
                    className={`px-4 py-2 rounded text-sm font-bold ${activeMenu === '전표입력' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border'}`}
                >
                    회계관리 (전표)
                </button>
                <button
                    onClick={() => setActiveMenu('업무현황')}
                    className={`px-4 py-2 rounded text-sm font-bold ${activeMenu === '업무현황' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border'}`}
                >
                    CRM (업무현황)
                </button>
            </div>

            {renderContent()}
        </DouzoneLayout>
    );
}

export default App;
