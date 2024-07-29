import { Octokit } from '@octokit/core'
import { env } from '~/env'

const globalForOctokit = global as unknown as { octokit: Octokit }

export const github =
	globalForOctokit.octokit ||
	new Octokit({
		auth: process.env.GITHUB_TOKEN
	})

if (env.NODE_ENV === 'production') {
	globalForOctokit.octokit = github
}
