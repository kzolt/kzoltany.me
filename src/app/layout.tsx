import type { Metadata } from "next";
import { JetBrains_Mono, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "~/lib/utils";

import "~/styles/globals.css";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-sans",
});
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
	title: "Kevin Zoltany | Software Engineer",
	description:
		"Software engineer building games, engines, and exploring systems programming.",
	icons: {
		icon: [
			{
				url: "/logo.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn(jetbrainsMono.variable, firaCode.variable)}>
			<body className={`font-sans antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
