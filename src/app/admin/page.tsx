'use client';
import { useState } from 'react';
import { db } from '../../lib/db';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Download, Upload } from 'lucide-react';

export default function AdminPage() {
    const [msg, setMsg] = useState('');

    const handleBackup = async () => {
        const reservations = await db.reservations.toArray();
        const data = JSON.stringify({ reservations }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `erp_backup_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        setMsg('✅ 백업 파일이 다운로드되었습니다.');
    };

    const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (json.reservations) {
                    await db.reservations.clear();
                    await db.reservations.bulkAdd(json.reservations);
                    setMsg('✅ 데이터가 성공적으로 복구되었습니다.');
                }
            } catch (err) {
                setMsg('❌ 파일 형식이 올바르지 않습니다.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-8 text-white">
            <PageHeader title="시스템 관리" menuId="admin" />

            <div className="max-w-xl space-y-6">
                <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Download className="text-green-400" /> 데이터 백업</h3>
                    <p className="text-sm text-gray-400 mb-4">현재 브라우저에 저장된 모든 예약 데이터를 JSON 파일로 저장합니다.</p>
                    <button onClick={handleBackup} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 font-bold">백업 파일 다운로드</button>
                </div>

                <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Upload className="text-blue-400" /> 데이터 복구</h3>
                    <p className="text-sm text-gray-400 mb-4">백업했던 JSON 파일을 업로드하면 데이터를 복원합니다. (기존 데이터는 덮어씌워집니다)</p>
                    <input type="file" accept=".json" onChange={handleRestore} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
                </div>

                {msg && <div className="p-4 bg-gray-800 rounded text-center animate-pulse">{msg}</div>}
            </div>
        </div>
    );
}
