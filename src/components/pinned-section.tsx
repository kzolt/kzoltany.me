"use client";

import { ExternalLink, Folder, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const pinnedProjects = [
	{
		name: "kzoltany.me",
		description:
			"Modern TypeScript project showcasing clean architecture and best practices.",
		language: "TypeScript",
		languageColor: "var(--syntax-blue)",
		url: "https://github.com/kzolt/kzoltany.me",
	},
	{
		name: "XeroEngine",
		description:
			"Custom game engine built from scratch in C++, exploring graphics rendering and game systems.",
		language: "C++",
		languageColor: "var(--syntax-purple)",
		url: "https://github.com/kzolt/XeroEngine",
	},
	{
		name: "RayTracing",
		description:
			"Ray tracing implementation exploring realistic lighting, reflections, and shadows.",
		language: "C++",
		languageColor: "var(--syntax-purple)",
		url: "https://github.com/kzolt/RayTracing",
	},
	{
		name: "Advent2024",
		description:
			"Learning Rust through Advent of Code 2024 - solving algorithmic challenges.",
		language: "Rust",
		languageColor: "var(--syntax-orange)",
		url: "https://github.com/kzolt/Advent2024",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4 },
	},
};

export function PinnedSection() {
	return (
		<section
			id="featured"
			className="relative px-4 md:px-8 lg:px-16 py-16 scroll-mt-8"
		>
			<div className="max-w-5xl mx-auto">
				{/* Section header - terminal style */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
				>
					<div className="flex items-center gap-2 text-sm mb-4">
						<span className="text-primary">$</span>
						<span className="text-muted-foreground">gh repo list --pinned</span>
					</div>
					<div className="flex items-center gap-3">
						<Folder className="w-4 h-4 text-[var(--syntax-yellow)]" />
						<h2 className="text-lg text-foreground">Featured Repositories</h2>
						<span className="h-px flex-1 bg-border" />
					</div>
				</motion.div>

				{/* Projects grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
				>
					{pinnedProjects.map((project) => (
						<motion.div key={project.name} variants={itemVariants}>
							<Link
								href={project.url}
								target="_blank"
								className="group block bg-card border border-border p-5 hover:border-primary transition-colors"
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-2">
											<Star className="w-3 h-3 text-[var(--syntax-yellow)]" />
											<h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
												{project.name}
											</h3>
										</div>
										<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
											{project.description}
										</p>
									</div>
									<ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
								</div>

								<div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
									<span
										className="w-2 h-2 rounded-full"
										style={{ backgroundColor: project.languageColor }}
									/>
									<span className="text-xs text-muted-foreground">
										{project.language}
									</span>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
