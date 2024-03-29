import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/providers/modal-provider'
import { QueryProvider } from '@/providers/query-provider'
import { SocketProvider } from '@/providers/socket-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Open_Sans } from 'next/font/google'

import './globals.css'
import { UserProvider } from '@/providers/user-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Rediscord',
	description: 'A Discord clone built with Next.js and Tailwind CSS.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()
	return (
		<SessionProvider session={session}>
			<html lang='en' suppressHydrationWarning>
				<body
					className={cn(font.className, 'bg-white dark:bg-[#313338]')}
				>
					<Toaster />
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem={false}
						storageKey='discord-theme'
					>
						<SocketProvider>
							<ModalProvider />
							<QueryProvider>
								<UserProvider>
									{children}
								</UserProvider>
							</QueryProvider>
						</SocketProvider>
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	)
}
