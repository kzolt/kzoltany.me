import { z } from "zod";

// Validation schema for contact form
export const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must be less than 100 characters"),
	email: z.string().email("Please enter a valid email address"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormResponse =
	| { success: true; message: string }
	| { success: false; error: string };
