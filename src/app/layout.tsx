import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import { ShootingStars } from '~/components/ui/shooting-stars'
import { StarsBackground } from '~/components/ui/stars-background'

export const metadata: Metadata = {
	title: 'Kevin Zoltany',
	description: 'Software Engineer & Web Developer',
	icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable} dark`}>
			<body>
				{children}
				<ShootingStars />
				<StarsBackground />
			</body>
		</html>
	)
}
