"use client";

import { ExternalLink, Github, Star, GitFork, FolderGit2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { motion } from "framer-motion";

interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	topics: string[];
	fork: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const languageColors: Record<string, string> = {
	TypeScript: "var(--syntax-blue)",
	JavaScript: "var(--syntax-yellow)",
	"C++": "var(--syntax-purple)",
	"C#": "var(--syntax-green)",
	C: "var(--muted-foreground)",
	Python: "var(--syntax-green)",
	Rust: "var(--syntax-orange)",
	Go: "var(--syntax-cyan)",
	Svelte: "var(--syntax-orange)",
	HTML: "var(--syntax-red)",
	CSS: "var(--syntax-purple)",
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3 },
	},
};

export function ProjectsSection() {
	const {
		data: repos,
		isLoading,
		error,
	} = useSWR<GitHubRepo[]>(
		"https://api.github.com/users/kzolt/repos?sort=updated&per_page=100",
		fetcher,
	);

	const filteredRepos = repos
		?.filter((repo) => !repo.fork)
		.sort((a, b) => b.stargazers_count - a.stargazers_count);

	return (
		<section
			id="projects"
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
						<span className="text-muted-foreground">
							gh repo list kzolt --json name,description,language
						</span>
					</div>
					<div className="flex items-center gap-3">
						<FolderGit2 className="w-4 h-4 text-[var(--syntax-cyan)]" />
						<h2 className="text-lg text-foreground">All Repositories</h2>
						<span className="h-px flex-1 bg-border" />
					</div>
				</motion.div>

				{isLoading && (
					<div className="space-y-2">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="bg-card border border-border p-4 animate-pulse"
							>
								<div className="h-4 bg-muted w-1/4 mb-2" />
								<div className="h-3 bg-muted w-3/4" />
							</div>
						))}
					</div>
				)}

				{error && (
					<div className="text-center py-8 text-sm">
						<span className="text-[var(--syntax-red)]">error:</span>
						<span className="text-muted-foreground">
							{" "}
							Failed to fetch repositories
						</span>
					</div>
				)}

				{filteredRepos && (
					<motion.div
						className="space-y-2"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
					>
						{/* Table header */}
						<div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-muted-foreground border-b border-border">
							<div className="col-span-4">NAME</div>
							<div className="col-span-5 hidden md:block">DESCRIPTION</div>
							<div className="col-span-2">LANG</div>
							<div className="col-span-1 text-right">STATS</div>
						</div>

						{filteredRepos.map((repo, index) => (
							<motion.div key={repo.id} variants={itemVariants} custom={index}>
								<RepoRow repo={repo} index={index} />
							</motion.div>
						))}
					</motion.div>
				)}

				<motion.div
					className="mt-8 pt-6 border-t border-border"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
				>
					<div className="flex items-center gap-2 text-sm mb-4">
						<span className="text-primary">$</span>
						<span className="text-muted-foreground">
							open https://github.com/kzolt
						</span>
					</div>
					<Link
						href="https://github.com/kzolt?tab=repositories"
						target="_blank"
						className="group inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all text-sm"
					>
						<Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
						<span className="text-muted-foreground group-hover:text-foreground transition-colors">
							View all on GitHub
						</span>
						<ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

function RepoRow({ repo, index }: { repo: GitHubRepo; index: number }) {
	return (
		<Link
			href={repo.html_url}
			target="_blank"
			className="group grid grid-cols-12 gap-4 px-4 py-3 bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm"
		>
			<div className="col-span-4 flex items-center gap-2 min-w-0">
				<span className="text-muted-foreground text-xs w-4">
					{String(index + 1).padStart(2, "0")}
				</span>
				<span className="text-foreground group-hover:text-primary transition-colors truncate">
					{repo.name}
				</span>
			</div>

			<div className="col-span-5 hidden md:flex items-center min-w-0">
				<span className="text-muted-foreground text-xs truncate">
					{repo.description || "No description"}
				</span>
			</div>

			<div className="col-span-2 flex items-center gap-2 min-w-0">
				{repo.language && (
					<>
						<span
							className="w-2 h-2 rounded-full flex-shrink-0"
							style={{
								backgroundColor:
									languageColors[repo.language] || "var(--muted-foreground)",
							}}
						/>
						<span className="text-xs text-muted-foreground truncate">
							{repo.language}
						</span>
					</>
				)}
			</div>

			<div className="col-span-1 flex items-center justify-end gap-3">
				{repo.stargazers_count > 0 && (
					<div className="flex items-center gap-1 text-muted-foreground">
						<Star className="w-3 h-3" />
						<span className="text-xs">{repo.stargazers_count}</span>
					</div>
				)}
				{repo.forks_count > 0 && (
					<div className="flex items-center gap-1 text-muted-foreground">
						<GitFork className="w-3 h-3" />
						<span className="text-xs">{repo.forks_count}</span>
					</div>
				)}
				<ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
			</div>
		</Link>
	);
}
