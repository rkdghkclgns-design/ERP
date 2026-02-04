'use client';
import { useState } from 'react';
import { db } from '../../lib/db';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Download, Upload, Database, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminPage() {
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
            setMsg('SYSTEM::BACKUP_FILE_GENERATED_SUCCESSFULLY');
            setStatus('success');
        } catch (err) {
            setMsg('SYSTEM::BACKUP_FAILED');
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
                    setMsg('SYSTEM::DATA_NODES_RESTORED_COMPLETE');
                    setStatus('success');
                }
            } catch (err) {
                setMsg('SYSTEM::INVALID_DATA_FORMAT');
                setStatus('error');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6 cyber-grid min-h-screen p-6">
            <PageHeader title="시스템 관리" menuId="admin" />

            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 데이터 백업 */}
                <div className="cyber-card p-6 group hover:border-emerald-500/50 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20 group-hover:bg-emerald-500/20">
                            <Download className="text-emerald-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-emerald-400 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>DATA_EXPORT</h3>
                            <p className="text-[10px] text-emerald-500/50 font-mono tracking-widest">DATABASE_SNAPSHOT</p>
                        </div>
                    </div>

                    <p className="text-zinc-400 text-sm font-mono mb-8 leading-relaxed">
                        현재 브라우저 IndexedDB에 저장된 모든 노드 데이터를 JSON 포맷으로 패키징하여 로컬 저장소로 전송합니다.
                    </p>

                    <button
                        onClick={handleBackup}
                        className="w-full px-4 py-3 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black font-black text-xs tracking-[0.2em] transition-all uppercase rounded"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        INITIALIZE_BACKUP
                    </button>
                </div>

                {/* 데이터 복구 */}
                <div className="cyber-card p-6 group hover:border-cyan-500/50 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-cyan-500/10 rounded border border-cyan-500/20 group-hover:bg-cyan-500/20">
                            <Upload className="text-cyan-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-cyan-400 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>DATA_IMPORT</h3>
                            <p className="text-[10px] text-cyan-500/50 font-mono tracking-widest">RESTORE_SEQUENCE</p>
                        </div>
                    </div>

                    <p className="text-zinc-400 text-sm font-mono mb-8 leading-relaxed">
                        JSON 데이터 팩을 업로드하여 시스템 노드를 재구성합니다. 주의: 기존 로컬 데이터는 모두 퍼지(Purge)됩니다.
                    </p>

                    <div className="relative">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleRestore}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full px-4 py-3 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 font-black text-xs tracking-[0.2em] text-center uppercase rounded group-hover:bg-cyan-500 group-hover:text-black transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            UPLOAD_DATA_PACK
                        </div>
                    </div>
                </div>
            </div>

            {/* 상태 메시지 */}
            {msg && (
                <div className={`mt-8 p-4 bg-[#12121a] border rounded-lg flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300 ${status === 'success' ? 'border-emerald-500/50' : 'border-pink-500/50'
                    }`}>
                    <div className="flex items-center gap-3">
                        {status === 'success' ? <ShieldCheck className="text-emerald-400" /> : <AlertCircle className="text-pink-400" />}
                        <span className={`text-sm font-mono ${status === 'success' ? 'text-emerald-400' : 'text-pink-400'}`}>
                            >> {msg}
                        </span>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-mono" style={{ fontFamily: 'Orbitron, sans-serif' }}>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                </div>
            )}

            {/* 시스템 로그 섹션 (확장) */}
            <div className="cyber-card mt-6">
                <div className="p-4 border-b border-cyan-500/10 bg-[#0d0d14]">
                    <h4 className="text-xs font-bold text-cyan-500/50 tracking-[0.2em] uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>System_Log_Console</h4>
                </div>
                <div className="p-4 font-mono text-[11px] text-zinc-500 h-32 overflow-y-auto space-y-1">
                    <p>&gt; [INFO] Local database connected.</p>
                    <p>&gt; [INFO] Encryption module initialized.</p>
                    <p>&gt; [INFO] Waiting for user action...</p>
                    {msg && <p className={status === 'success' ? 'text-emerald-500' : 'text-pink-500'}>{`&gt; [${status.toUpperCase()}] ${msg}`}</p>}
                </div>
            </div>
        </div>
    );
}
