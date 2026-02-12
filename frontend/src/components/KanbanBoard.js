import React, { useState } from 'react';

const Card = ({ title, tag, color }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${color}`}>{tag}</span>
        </div>
        <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
    </div>
);

const Column = ({ title, count, children }) => (
    <div className="flex-1 min-w-[300px] bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">{title}</h3>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-extrabold">{count}</span>
        </div>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

export default function KanbanBoard() {
    return (
        <div className="flex gap-6 h-full overflow-x-auto p-2">
            <Column title="진행 예정 (To Do)" count={3}>
                <Card title="Q1 부가세 신고 자료 준비" tag="TAX" color="bg-red-100 text-red-600" />
                <Card title="법인카드 한도 증액 신청" tag="ADMIN" color="bg-blue-100 text-blue-600" />
                <Card title="신규 입사자 4대보험 취득신고" tag="HR" color="bg-purple-100 text-purple-600" />
            </Column>

            <Column title="진행 중 (In Progress)" count={2}>
                <Card title="3월 급여 대장 검토" tag="PAYROLL" color="bg-emerald-100 text-emerald-600" />
                <Card title="거래처 미수금 현황 파악" tag="SALES" color="bg-orange-100 text-orange-600" />
            </Column>

            <Column title="완료 (Done)" count={2}>
                <Card title="2월 결산 보고서 작성" tag="FINANCE" color="bg-gray-200 text-gray-600" />
                <Card title="사무실 임대차 계약 갱신" tag="ADMIN" color="bg-gray-200 text-gray-600" />
            </Column>
        </div>
    );
}
