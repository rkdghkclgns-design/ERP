import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/organisms/Header'
import { GuideProvider } from '@/contexts/GuideContext'
import { HelpModal } from '@/components/molecules/HelpModal'

export const metadata: Metadata = {
    title: 'DEEP.ERP // ENTERPRISE SYSTEM',
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
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1 bg-[#f3f6f9]">
                            {children}
                        </main>
                    </div>
                    <HelpModal />
                </GuideProvider>
            </body>
        </html>
    )
}
