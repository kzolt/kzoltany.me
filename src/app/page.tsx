import Link from 'next/link'
import Image from 'next/image'
import { unstable_cache } from 'next/cache'

import { type HTMLAttributes, Suspense } from 'react'
import { MailIcon } from 'lucide-react'

import { github } from '~/server/github'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

const get_projects = unstable_cache(
	async () => {
		const response = await github.request('GET /users/{username}/repos', {
			username: 'kzolt',
			per_page: 6,
			sort: 'updated'
		})

		return response.data.map((repo: Record<string, unknown>) => ({
			name: repo.name as string,
			description: repo.description as string,
			url: repo.html_url as string
		}))
	},
	['projects'],
	{ tags: ['projects'], revalidate: 3600 }
)

export default function HomePage() {
	return (
		<div className="w-full min-h-screen text-foreground relative z-10">
			<header className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<div className="flex items-center flex-row">
							<Image src="/logo.svg" alt="Kevin Zoltany" width={100} height={100} />
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
								Kevin Zoltany
							</h1>
						</div>
						<p className="text-muted-foreground md:text-lg">Software Engineer | Web Developer</p>
					</div>
					<div className="flex items-center gap-4">
						<Link href="https://github.com/kzolt" target="_blank">
							<GithubIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
						</Link>
						<Link href="mailto:hello@kzoltany.me" prefetch={false}>
							<MailIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
						</Link>
					</div>
				</div>
			</header>
			<main className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
				<section className="mb-12">
					<h2 className="mb-4 text-2xl font-bold tracking-tighter md:text-3xl">Recent Projects</h2>
					<Suspense fallback={<ProjectSkeleton />}>
						<ProjectsDisplay />
					</Suspense>
				</section>
			</main>
		</div>
	)
}

async function ProjectsDisplay() {
	const projects = await get_projects()

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 z-10">
			{projects.map((project) => (
				<Card key={project.name}>
					<CardHeader>
						<CardTitle>{project.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">{project.description}</p>
						<div className="mt-4">
							<Link
								href={project.url}
								className="text-primary  group flex flex-row gap-3"
								target="_blank"
							>
								<GithubIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
								View on GitHub
							</Link>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

function ProjectSkeleton() {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 z-10">
			{Array.from({ length: 6 }).map((_, i) => (
				<Card key={i}>
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-10 w-[70%]" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-[60%] mt-4" />
						<div className="mt-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-6 w-6" />
								<Skeleton className="h-4 w-[80px]" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

function GithubIcon(props: HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	)
}
