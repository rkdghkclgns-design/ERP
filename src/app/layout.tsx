import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/organisms/Sidebar'
import { GuideProvider } from '@/contexts/GuideContext'
import { HelpModal } from '@/components/molecules/HelpModal'

export const metadata: Metadata = {
    title: 'DEEP.ERP | 통합 경영 관리 시스템',
    description: '로컬 환경에서 운영되는 통합 ERP 시스템',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <head>
                <link
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
                    rel="stylesheet"
                />
            </head>
            <body>
                <GuideProvider>
                    <div className="flex min-h-screen bg-[#f8fafc]">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto">
                            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                                {children}
                            </div>
                        </main>
                    </div>
                    <HelpModal />
                </GuideProvider>
            </body>
        </html>
    )
}
