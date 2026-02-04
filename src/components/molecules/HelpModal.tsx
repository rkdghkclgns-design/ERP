'use client';
import { useState, useEffect } from 'react';
import { useGuide } from '../../contexts/GuideContext';
import { X, Lightbulb, Keyboard, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HelpModal = () => {
    const [mounted, setMounted] = useState(false);
    const { currentGuide, closeGuide } = useGuide();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {currentGuide && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px] p-4"
                    onClick={closeGuide}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 10 }}
                        className="bg-white w-full max-w-xl rounded-xl border border-gray-200 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Lightbulb className="text-orange-400" size={20} />
                                {currentGuide.help.title}
                            </h3>
                            <button
                                onClick={closeGuide}
                                className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* 설명 섹션 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-blue-500 uppercase tracking-wider">
                                    <Info size={14} />
                                    <span>기능 설명</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {currentGuide.help.description}
                                </p>

                                {/* 팁 섹션 */}
                                <div className="bg-blue-50 border-l-4 border-blue-400 pl-4 py-2 mt-2">
                                    <p className="text-gray-600 text-sm">
                                        <span className="text-blue-500 font-bold mr-1">Tip:</span>
                                        {currentGuide.help.actionGuide}
                                    </p>
                                </div>
                            </div>

                            {/* 예시 섹션 */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                    <Keyboard size={14} />
                                    <span>사용 예시</span>
                                </div>
                                <div className="text-gray-800 font-medium text-sm">
                                    "{currentGuide.help.example}"
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50/30 text-center text-xs text-gray-400 border-t border-gray-100">
                            상단 메뉴 보조 도구로 시스템 활용을 도와드립니다.
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
