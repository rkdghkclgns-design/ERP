import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/organisms/Sidebar'
import { GuideProvider } from '@/contexts/GuideContext'
import { HelpModal } from '@/components/molecules/HelpModal'

export const metadata: Metadata = {
    title: 'DEEP.ERP // SYSTEM ONLINE',
    description: '차세대 통합 경영 관리 시스템',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
                <GuideProvider>
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto bg-[#0a0a0f]">
                            {children}
                        </main>
                    </div>
                    <HelpModal />
                </GuideProvider>
            </body>
        </html>
    )
}
