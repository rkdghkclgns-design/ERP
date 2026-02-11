import React from 'react';
import DouzoneLayout from './layout/DouzoneLayout';

function App() {
    return (
        <DouzoneLayout activeMenu="대시보드">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">환영합니다</h1>
                <p>Enterprise AI ERP 시스템에 오신 것을 환영합니다.</p>
            </div>
        </DouzoneLayout>
    );
}

export default App;
