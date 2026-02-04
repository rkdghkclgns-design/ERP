'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Download, Upload, Database, AlertCircle, ShieldCheck, Terminal } from 'lucide-react';

export default function AdminPage() {
    const [mounted, setMounted] = useState(false);
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-[#f8fafc]" />;

    const handleBackup = async () => {
        try {
            const reservations = await db.reservations.toArray();
            const data = JSON.stringify({ reservations }, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `erp_backup_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            setMsg('데이터 백업 파일이 성공적으로 생성되었습니다.');
            setStatus('success');
        } catch (err) {
            setMsg('데이터 백업 중 오류가 발생했습니다.');
            setStatus('error');
        }
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
                    setMsg('데이터 복구가 완료되었습니다.');
                    setStatus('success');
                }
            } catch (err) {
                setMsg('유효하지 않은 데이터 형식입니다.');
                setStatus('error');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-6 space-y-6">
            <PageHeader title="시스템 관리" menuId="admin" />

            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 데이터 백업 */}
                <div className="erp-card p-6 group">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 group-hover:bg-emerald-100/50 transition-colors">
                            <Download className="text-emerald-600" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">데이터 내보내기</h3>
                            <p className="text-[11px] text-gray-400 font-medium">DATABASE_SNAPSHOT</p>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        현재 브라우저 캐시(IndexedDB)에 저장된 모든 데이터를 JSON 파일로 다운로드합니다. 정기적인 백업을 권장합니다.
                    </p>

                    <button
                        onClick={handleBackup}
                        className="w-full erp-btn bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-bold"
                    >
                        백업 시작하기
                    </button>
                </div>

                {/* 데이터 복구 */}
                <div className="erp-card p-6 group">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 group-hover:bg-blue-100/50 transition-colors">
                            <Upload className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">데이터 가져오기</h3>
                            <p className="text-[11px] text-gray-400 font-medium">RESTORE_SEQUENCE</p>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        백업된 JSON 파일을 업로드하여 데이터를 복구합니다. 주의: 기존 로컬 데이터는 모두 삭제되고 새로 갱신됩니다.
                    </p>

                    <div className="relative">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleRestore}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full erp-btn bg-gray-800 hover:bg-gray-900 text-white shadow-sm font-bold text-center">
                            데이터 업로드
                        </div>
                    </div>
                </div>
            </div>

            {/* 상태 메시지 */}
            {msg && (
                <div className={`mt-8 p-4 bg-white border-2 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom-2 duration-200 ${status === 'success' ? 'border-emerald-100 bg-emerald-50/10' : 'border-red-100 bg-red-50/10'
                    }`}>
                    <div className="flex items-center gap-3">
                        {status === 'success' ? <ShieldCheck className="text-emerald-600" /> : <AlertCircle className="text-red-500" />}
                        <span className={`text-sm font-bold ${status === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                            {msg}
                        </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                </div>
            )}

            {/* 시스템 콘솔 섹션 */}
            <div className="erp-card overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                    <Terminal size={14} className="text-gray-400" />
                    <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">System Activity Console</h4>
                </div>
                <div className="p-4 font-mono text-[11px] text-gray-400 h-32 overflow-y-auto space-y-1 bg-white">
                    <p className="flex gap-2"><span className="text-blue-400">[INFO]</span> Local database connection established.</p>
                    <p className="flex gap-2"><span className="text-blue-400">[INFO]</span> System security modules initialized.</p>
                    <p className="flex gap-2"><span className="text-gray-300">&gt; Waiting for user input...</span></p>
                    {msg && (
                        <p className={`flex gap-2 ${status === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                            <span>[{status.toUpperCase()}]</span> {msg}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
