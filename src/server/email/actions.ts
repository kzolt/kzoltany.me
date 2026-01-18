"use server";

import { Resend } from "resend";
import { z } from "zod";
import { env } from "~/env";
import {
	type ContactFormData,
	type ContactFormResponse,
	contactFormSchema,
} from "./schema";

// Rate limiting: Track submissions by identifier (IP or session)
// In-memory storage - for production, consider Redis or edge storage
const submissionTracker = new Map<string, number[]>();

// Rate limit configuration
const MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Clean up old entries periodically to prevent memory leak
function cleanupOldEntries() {
	const now = Date.now();
	for (const [key, timestamps] of submissionTracker.entries()) {
		const recentTimestamps = timestamps.filter(
			(timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
		);
		if (recentTimestamps.length === 0) {
			submissionTracker.delete(key);
		} else {
			submissionTracker.set(key, recentTimestamps);
		}
	}
}

// Check if rate limit is exceeded
function isRateLimitExceeded(identifier: string): boolean {
	const now = Date.now();
	const timestamps = submissionTracker.get(identifier) || [];

	// Filter to only recent submissions within the window
	const recentSubmissions = timestamps.filter(
		(timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
	);

	return recentSubmissions.length >= MAX_SUBMISSIONS;
}

// Record a new submission
function recordSubmission(identifier: string) {
	const now = Date.now();
	const timestamps = submissionTracker.get(identifier) || [];
	timestamps.push(now);
	submissionTracker.set(identifier, timestamps);
}

// Initialize Resend client
const resend = new Resend(env.RESEND_API_KEY);

/**
 * Server action to send contact form email
 * @param data - Contact form data (name, email, message)
 * @returns Response indicating success or failure
 */
export async function sendContactEmail(
	data: ContactFormData,
): Promise<ContactFormResponse> {
	try {
		// Validate the input data
		const validatedData = contactFormSchema.parse(data);

		// Create identifier for rate limiting
		// In production, you might want to use IP address or user session
		// For now, using email as identifier (simple but effective)
		const identifier = validatedData.email.toLowerCase();

		// Clean up old entries periodically
		cleanupOldEntries();

		// Check rate limit
		if (isRateLimitExceeded(identifier)) {
			return {
				success: false,
				error:
					"Rate limit exceeded. Please try again later (max 3 submissions per hour).",
			};
		}

		// Record this submission
		recordSubmission(identifier);

		// Send email via Resend
		const { data: emailData, error: emailError } = await resend.emails.send({
			from: "Contact Form <noreply@kzoltany.me>",
			to: [env.CONTACT_EMAIL],
			subject: `New Contact Form Submission from ${validatedData.name}`,
			text: `
You have received a new contact form submission:

Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}

---
Sent from your portfolio contact form
			`.trim(),
		});

		if (emailError) {
			console.error("Resend API error:", emailError);
			return {
				success: false,
				error: "Failed to send message. Please try again later.",
			};
		}

		console.log("Email sent successfully:", emailData?.id);

		return {
			success: true,
			message: "Message sent successfully!",
		};
	} catch (error) {
		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: error.errors[0]?.message || "Invalid form data",
			};
		}

		// Handle other errors
		console.error("Error sending contact email:", error);
		return {
			success: false,
			error: "An unexpected error occurred. Please try again later.",
		};
	}
}
