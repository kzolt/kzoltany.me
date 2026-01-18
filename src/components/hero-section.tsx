"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const typewriterText = "Software Engineer";

export function HeroSection() {
	const [displayedText, setDisplayedText] = useState("");
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		let i = 0;
		const typingInterval = setInterval(() => {
			if (i < typewriterText.length) {
				setDisplayedText(typewriterText.slice(0, i + 1));
				i++;
			} else {
				clearInterval(typingInterval);
			}
		}, 80);

		return () => clearInterval(typingInterval);
	}, []);

	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530);
		return () => clearInterval(cursorInterval);
	}, []);

	return (
		<section className="relative min-h-screen flex flex-col px-4 md:px-8 lg:px-16 py-8">
			{/* Terminal window */}
			<motion.div
				className="flex-1 flex flex-col max-w-5xl mx-auto w-full"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* Terminal header */}
				<div className="flex items-center justify-between px-4 py-3 bg-card border border-border border-b-0">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
						<div className="w-3 h-3 rounded-full bg-[#febc2e]" />
						<div className="w-3 h-3 rounded-full bg-[#28c840]" />
					</div>
					<span className="text-xs text-muted-foreground">
						kevin@portfolio ~{" "}
					</span>
					<div className="w-16" />
				</div>

				{/* Terminal body */}
				<div className="flex-1 bg-background border border-border p-6 md:p-8 overflow-hidden scanlines">
					{/* Command prompt intro */}
					<motion.div
						variants={fadeIn}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.2 }}
					>
						<div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
							<span className="text-primary">$</span>
							<span>cat about.txt</span>
						</div>
					</motion.div>

					{/* Main content */}
					<motion.div
						className="mt-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<div className="text-muted-foreground text-sm mb-2">
							<span className="text-[var(--syntax-purple)]">const</span>{" "}
							<span className="text-[var(--syntax-blue)]">developer</span>{" "}
							<span className="text-muted-foreground">=</span>{" "}
							<span className="text-[var(--syntax-yellow)]">{"{"}</span>
						</div>

						<div className="pl-4 space-y-1">
							<div className="text-sm">
								<span className="text-[var(--syntax-cyan)]">name</span>
								<span className="text-muted-foreground">:</span>{" "}
								<span className="text-[var(--syntax-green)]">
									&quot;Kevin Zoltany&quot;
								</span>
								<span className="text-muted-foreground">,</span>
							</div>
							<div className="text-sm">
								<span className="text-[var(--syntax-cyan)]">title</span>
								<span className="text-muted-foreground">:</span>{" "}
								<span className="text-[var(--syntax-green)]">
									&quot;{displayedText}
									<span className={showCursor ? "opacity-100" : "opacity-0"}>
										|
									</span>
									&quot;
								</span>
								<span className="text-muted-foreground">,</span>
							</div>
							<div className="text-sm">
								<span className="text-[var(--syntax-cyan)]">github</span>
								<span className="text-muted-foreground">:</span>{" "}
								<span className="text-[var(--syntax-green)]">
									&quot;@kzolt&quot;
								</span>
								<span className="text-muted-foreground">,</span>
							</div>
							<div className="text-sm">
								<span className="text-[var(--syntax-cyan)]">focus</span>
								<span className="text-muted-foreground">:</span>{" "}
								<span className="text-[var(--syntax-yellow)]">[</span>
							</div>
							<div className="pl-4 space-y-1">
								<div className="text-sm">
									<span className="text-[var(--syntax-green)]">
										&quot;Fullstack Web Development&quot;
									</span>
									<span className="text-muted-foreground">,</span>
								</div>
								<div className="text-sm">
									<span className="text-[var(--syntax-green)]">
										&quot;Graphics Programming&quot;
									</span>
									<span className="text-muted-foreground">,</span>
								</div>
								<div className="text-sm">
									<span className="text-[var(--syntax-green)]">
										&quot;Systems Engineering&quot;
									</span>
								</div>
							</div>
							<div className="text-sm">
								<span className="text-[var(--syntax-yellow)]">]</span>
								<span className="text-muted-foreground">,</span>
							</div>
						</div>

						<div className="text-sm mt-1">
							<span className="text-[var(--syntax-yellow)]">{"}"}</span>
							<span className="text-muted-foreground">;</span>
						</div>
					</motion.div>

					{/* Bio section */}
					<motion.div
						className="mt-10 pt-6 border-t border-border"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						<div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
							<span className="text-primary">$</span>
							<span>echo $BIO</span>
						</div>

						<div
							id="about"
							className="space-y-4 text-sm text-muted-foreground leading-relaxed scroll-mt-24"
						>
							<p>
								<span className="text-[var(--syntax-blue)]">{"> "}</span>
								Building software that pushes boundaries. My work lies at the
								intersection of{" "}
								<span className="text-foreground">
									fullstack web development
								</span>
								, <span className="text-foreground">graphics programming</span>,
								and <span className="text-foreground">systems engineering</span>
								.
							</p>
							<p>
								<span className="text-[var(--syntax-blue)]">{"> "}</span>
								From building{" "}
								<span className="text-foreground">modern web apps</span> to
								exploring <span className="text-foreground">Vulkan</span> and{" "}
								<span className="text-foreground">Direct3D</span>. Currently
								learning{" "}
								<span className="text-[var(--syntax-orange)]">Rust</span>.
							</p>
						</div>
					</motion.div>

					{/* Navigation */}
					<motion.div
						className="mt-10 pt-6 border-t border-border"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
					>
						<div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
							<span className="text-primary">$</span>
							<span>ls ./sections/</span>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							<NavItem href="#featured" label="featured/" index={0} />
							<NavItem href="#projects" label="projects/" index={1} />
							<NavItem href="#skills" label="skills/" index={2} />
							<NavItem href="#contact" label="contact/" index={3} />
						</div>
					</motion.div>

					{/* Social links */}
					<motion.div
						className="mt-10 pt-6 border-t border-border"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.2 }}
					>
						<div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
							<span className="text-primary">$</span>
							<span>cat links.json</span>
						</div>

						<div className="flex items-center gap-4">
							<SocialLink
								href="https://github.com/kzolt"
								icon={<Github className="w-4 h-4" />}
								label="GitHub"
							/>
						</div>
					</motion.div>

					{/* Stats */}
					<motion.div
						className="mt-10 pt-6 border-t border-border"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.4 }}
					>
						<div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
							<span className="text-primary">$</span>
							<span>gh repo list --limit 3 | wc -l</span>
						</div>

						<div className="grid grid-cols-3 gap-6">
							<StatItem value="14" label="repos" />
							<StatItem value="7" label="following" />
							<StatItem value="5+" label="languages" />
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}

function NavItem({
	href,
	label,
	index,
}: {
	href: string;
	label: string;
	index: number;
}) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const targetId = href.replace("#", "");
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 1 + index * 0.1 }}
		>
			<Link
				href={href}
				onClick={handleClick}
				className="group flex items-center gap-2 px-3 py-2 bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all text-sm"
			>
				<span className="text-[var(--syntax-blue)]">./</span>
				<span className="text-muted-foreground group-hover:text-foreground transition-colors">
					{label}
				</span>
			</Link>
		</motion.div>
	);
}

function SocialLink({
	href,
	icon,
	label,
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
}) {
	return (
		<Link
			href={href}
			target="_blank"
			className="group flex items-center gap-2 px-4 py-2 bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all text-sm"
			aria-label={label}
		>
			<span className="text-muted-foreground group-hover:text-primary transition-colors">
				{icon}
			</span>
			<span className="text-muted-foreground group-hover:text-foreground transition-colors">
				{label}
			</span>
		</Link>
	);
}

function StatItem({ value, label }: { value: string; label: string }) {
	return (
		<div className="text-center">
			<p className="text-2xl font-bold text-primary">{value}</p>
			<p className="text-xs text-muted-foreground mt-1">{label}</p>
		</div>
	);
}
