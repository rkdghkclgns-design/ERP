import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function EnterpriseGrid() {
    const [rowData] = useState([
        { date: '2024-03-01', description: 'Office Rent', account: '816 임차료', debit: 1000000, credit: 0 },
        { date: '2024-03-01', description: 'Office Rent (Deposited)', account: '103 보통예금', debit: 0, credit: 1000000 },
        { date: '2024-03-05', description: 'Server Hosting (AWS)', account: '831 수수료비용', debit: 500000, credit: 0 },
        { date: '2024-03-05', description: 'Server Hosting (Card)', account: '253 미지급금', debit: 0, credit: 500000 },
        { date: '2024-03-10', description: 'Consulting Revenue', account: '401 상품매출', debit: 0, credit: 3000000 },
        { date: '2024-03-10', description: 'Consulting Revenue (Cash)', account: '101 현금', debit: 3000000, credit: 0 },
    ]);

    const [columnDefs] = useState([
        { field: 'date', headerName: '일자', sortable: true, filter: true },
        { field: 'description', headerName: '적요', sortable: true, filter: true, flex: 2 },
        { field: 'account', headerName: '계정과목', sortable: true, filter: true },
        {
            field: 'debit',
            headerName: '차변',
            sortable: true,
            valueFormatter: params => params.value > 0 ? params.value.toLocaleString() + ' 원' : ''
        },
        {
            field: 'credit',
            headerName: '대변',
            sortable: true,
            valueFormatter: params => params.value > 0 ? params.value.toLocaleString() + ' 원' : ''
        },
    ]);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        flex: 1
    }), []);

    return (
        <div className="ag-theme-alpine font-sans h-[600px] w-full shadow-lg rounded-lg overflow-hidden">
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
            />
        </div>
    );
}
