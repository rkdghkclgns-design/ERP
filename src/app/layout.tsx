import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/organisms/Sidebar'
import { GuideProvider } from '@/contexts/GuideContext'
import { HelpModal } from '@/components/molecules/HelpModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ERP Local',
    description: 'Local ERP System',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <GuideProvider>
                    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto p-4 md:p-8">
                            {children}
                        </main>
                    </div>
                    <HelpModal />
                </GuideProvider>
            </body>
        </html>
    )
}

