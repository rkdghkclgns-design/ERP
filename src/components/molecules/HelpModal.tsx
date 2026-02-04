'use client';

import { useGuide } from '../../contexts/GuideContext';
import { X, Lightbulb, Keyboard, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HelpModal = () => {
    const { currentGuide, closeGuide } = useGuide();

    return (
        <AnimatePresence>
            {currentGuide && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={closeGuide} // 배경 클릭 시 닫기
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 10 }}
                        className="bg-[#1e293b] w-full max-w-xl rounded-2xl border border-gray-600 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫기 방지
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-700 bg-[#0f172a]">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Lightbulb className="text-yellow-400" size={20} />
                                {currentGuide.help.title}
                            </h3>
                            <button
                                onClick={closeGuide}
                                className="text-gray-400 hover:text-white transition p-1 hover:bg-gray-800 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">

                            {/* 설명 섹션 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                                    <Info size={14} />
                                    <span>기능 설명</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    {currentGuide.help.description}
                                </p>

                                {/* 팁 섹션 */}
                                <div className="bg-blue-900/20 border-l-4 border-blue-500 pl-4 py-2 mt-2">
                                    <p className="text-gray-300 text-sm">
                                        <span className="text-blue-400 font-bold mr-1">Tip:</span>
                                        {currentGuide.help.actionGuide}
                                    </p>
                                </div>
                            </div>

                            {/* 예시 섹션 (강조) */}
                            <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-700">
                                <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-wider mb-3">
                                    <Keyboard size={14} />
                                    <span>따라해 보세요 (사용 예시)</span>
                                </div>
                                <div className="bg-black/40 p-3 rounded-lg text-white font-mono text-sm italic border border-gray-800 shadow-inner">
                                    "{currentGuide.help.example}"
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-900/50 text-center text-xs text-gray-500 border-t border-gray-800">
                            이 창은 화면의 [?] 버튼이나 [도움말] 버튼을 눌러 언제든 다시 볼 수 있습니다.
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
