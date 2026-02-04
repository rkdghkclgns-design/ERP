'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MENU_ITEMS } from '@/constants/menuConfig';

interface HelpInfo {
    title: string;
    description: string;
    actionGuide: string;
    example: string;
}

interface GuideItem {
    id: string;
    label: string;
    path: string;
    icon: string;
    help: HelpInfo;
}

interface GuideContextType {
    currentGuide: GuideItem | null;
    openGuide: (id: string) => void;
    closeGuide: () => void;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export function GuideProvider({ children }: { children: ReactNode }) {
    const [currentGuide, setCurrentGuide] = useState<GuideItem | null>(null);

    const openGuide = (id: string) => {
        const item = MENU_ITEMS.find(m => m.id === id);
        if (item) {
            setCurrentGuide(item as GuideItem);
        }
    };

    const closeGuide = () => {
        setCurrentGuide(null);
    };

    return (
        <GuideContext.Provider value={{ currentGuide, openGuide, closeGuide }}>
            {children}
        </GuideContext.Provider>
    );
}

export function useGuide() {
    const context = useContext(GuideContext);
    if (context === undefined) {
        throw new Error('useGuide must be used within a GuideProvider');
    }
    return context;
}
