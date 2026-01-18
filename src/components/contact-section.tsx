"use client";

import { useForm } from "@tanstack/react-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Github, Mail, Send, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { sendContactEmail } from "~/server/email/actions";
import { contactFormSchema } from "~/server/email/schema";

export function ContactSection() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
		onSubmit: async ({ value }) => {
			setServerError(null);

			try {
				const result = await sendContactEmail(value);

				if (result.success) {
					setIsSubmitted(true);
					form.reset();

					// Reset success state after 5 seconds
					setTimeout(() => setIsSubmitted(false), 5000);
				} else {
					setServerError(result.error);
				}
			} catch (error) {
				console.error("Form submission error:", error);
				setServerError("An unexpected error occurred. Please try again.");
			}
		},
	});

	return (
		<section
			className="relative scroll-mt-8 px-4 py-16 md:px-8 lg:px-16"
			id="contact"
		>
			<div className="mx-auto max-w-5xl">
				{/* Section header */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.4 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1 }}
				>
					<div className="mb-4 flex items-center gap-2 text-sm">
						<span className="text-primary">$</span>
						<span className="text-muted-foreground">./send-message.sh</span>
					</div>
					<div className="flex items-center gap-3">
						<Mail className="h-4 w-4 text-[var(--syntax-cyan)]" />
						<h2 className="text-foreground text-lg">Get in Touch</h2>
						<span className="h-px flex-1 bg-border" />
					</div>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Email Form - Terminal Style */}
					<motion.div
						className="overflow-hidden border border-border bg-card"
						initial={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.4 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						{/* Terminal header */}
						<div className="flex items-center justify-between border-border border-b bg-secondary px-4 py-2">
							<div className="flex items-center gap-2">
								<div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
								<div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
								<div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
							</div>
							<span className="text-muted-foreground text-xs">
								compose-message.sh
							</span>
							<Terminal className="h-3 w-3 text-muted-foreground" />
						</div>

						{/* Form body */}
						<form
							className="space-y-4 p-6"
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<AnimatePresence mode="wait">
								{isSubmitted ? (
									<motion.div
										animate={{ opacity: 1, scale: 1 }}
										className="flex flex-col items-center justify-center py-12 text-center"
										exit={{ opacity: 0, scale: 0.95 }}
										initial={{ opacity: 0, scale: 0.95 }}
										key="success"
									>
										<CheckCircle className="mb-4 h-12 w-12 text-[var(--syntax-green)]" />
										<p className="mb-2 text-foreground">
											Message sent successfully!
										</p>
										<p className="text-muted-foreground text-xs">
											<span className="text-[var(--syntax-green)]">
												exit code: 0
											</span>
										</p>
									</motion.div>
								) : (
									<motion.div
										animate={{ opacity: 1 }}
										className="space-y-4"
										exit={{ opacity: 0 }}
										initial={{ opacity: 0 }}
										key="form"
									>
										{/* Server error display */}
										{serverError && (
											<div className="border border-destructive/20 bg-destructive/10 p-3 text-sm">
												<span className="font-mono text-destructive">
													stderr: {serverError}
												</span>
											</div>
										)}

										{/* Name field */}
										<form.Field
											name="name"
											validators={{
												onChange: ({ value }) => {
													const result =
														contactFormSchema.shape.name.safeParse(value);
													if (!result.success) {
														return (
															result.error.errors[0]?.message ?? "Invalid name"
														);
													}
													return undefined;
												},
											}}
										>
											{(field) => (
												<Field>
													<FieldLabel className="flex items-center gap-2 text-muted-foreground text-xs">
														<span className="text-[var(--syntax-purple)]">
															const
														</span>
														<span className="text-[var(--syntax-blue)]">
															name
														</span>
														<span>=</span>
													</FieldLabel>
													<input
														className="w-full border border-border bg-background px-3 py-2 text-foreground text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder='"Your Name"'
														type="text"
														value={field.state.value}
													/>
													{field.state.meta.errors.length > 0 && (
														<FieldError>
															<span className="font-mono text-xs">
																stderr: {field.state.meta.errors[0]}
															</span>
														</FieldError>
													)}
												</Field>
											)}
										</form.Field>

										{/* Email field */}
										<form.Field
											name="email"
											validators={{
												onChange: ({ value }) => {
													const result =
														contactFormSchema.shape.email.safeParse(value);
													if (!result.success) {
														return (
															result.error.errors[0]?.message ?? "Invalid email"
														);
													}
													return undefined;
												},
											}}
										>
											{(field) => (
												<Field>
													<FieldLabel className="flex items-center gap-2 text-muted-foreground text-xs">
														<span className="text-[var(--syntax-purple)]">
															const
														</span>
														<span className="text-[var(--syntax-blue)]">
															email
														</span>
														<span>=</span>
													</FieldLabel>
													<input
														className="w-full border border-border bg-background px-3 py-2 text-foreground text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder='"you@example.com"'
														type="email"
														value={field.state.value}
													/>
													{field.state.meta.errors.length > 0 && (
														<FieldError>
															<span className="font-mono text-xs">
																stderr: {field.state.meta.errors[0]}
															</span>
														</FieldError>
													)}
												</Field>
											)}
										</form.Field>

										{/* Message field */}
										<form.Field
											name="message"
											validators={{
												onChange: ({ value }) => {
													const result =
														contactFormSchema.shape.message.safeParse(value);
													if (!result.success) {
														return (
															result.error.errors[0]?.message ??
															"Invalid message"
														);
													}
													return undefined;
												},
											}}
										>
											{(field) => (
												<Field>
													<FieldLabel className="flex items-center gap-2 text-muted-foreground text-xs">
														<span className="text-[var(--syntax-purple)]">
															const
														</span>
														<span className="text-[var(--syntax-blue)]">
															message
														</span>
														<span>=</span>
														<span className="text-[var(--syntax-yellow)]">
															{"`"}
														</span>
													</FieldLabel>
													<textarea
														className="w-full resize-none border border-border bg-background px-3 py-2 text-foreground text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Your message here..."
														rows={4}
														value={field.state.value}
													/>
													<div className="flex items-start justify-between gap-2">
														<div className="text-muted-foreground text-xs">
															<span className="text-[var(--syntax-yellow)]">
																{"`"}
															</span>
															<span>;</span>
														</div>
														{field.state.meta.errors.length > 0 && (
															<FieldError className="flex-1 text-right">
																<span className="font-mono text-xs">
																	stderr: {field.state.meta.errors[0]}
																</span>
															</FieldError>
														)}
													</div>
												</Field>
											)}
										</form.Field>

										{/* Submit button */}
										<div className="pt-2">
											<form.Subscribe
												selector={(state) => ({
													isSubmitting: state.isSubmitting,
													canSubmit: state.canSubmit,
												})}
											>
												{({ isSubmitting, canSubmit }) => (
													<button
														className="group flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
														disabled={isSubmitting || !canSubmit}
														type="submit"
													>
														{isSubmitting ? (
															<>
																<span className="animate-pulse">
																	Sending...
																</span>
															</>
														) : (
															<>
																<span>$ ./send.sh</span>
																<Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
															</>
														)}
													</button>
												)}
											</form.Subscribe>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</form>
					</motion.div>

					{/* Info section */}
					<motion.div
						className="space-y-6"
						initial={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.4, delay: 0.1 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						{/* README style message */}
						<div className="border border-border bg-card p-6">
							<div className="mb-4 text-muted-foreground text-sm">
								<span className="text-[var(--syntax-purple)]"># </span>
								<span>README.md</span>
							</div>

							<div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
								<p>
									<span className="text-[var(--syntax-blue)]">## </span>
									<span className="text-foreground">Contact</span>
								</p>
								<p>
									I&apos;m always interested in discussing new projects,
									creative ideas, or opportunities to be part of something
									amazing.
								</p>
								<p>
									Whether you have a question or just want to say hi, feel free
									to send a message!
								</p>
							</div>
						</div>

						{/* GitHub link */}
						<div className="mb-4 text-muted-foreground text-sm">
							<span className="text-primary">$</span>
							<span> echo $SOCIAL_LINKS</span>
						</div>

						<Link
							className="group flex items-center justify-between border border-border bg-card p-4 transition-colors hover:border-primary"
							href="https://github.com/kzolt"
							target="_blank"
						>
							<div className="flex items-center gap-3">
								<span className="text-muted-foreground transition-colors group-hover:text-primary">
									<Github className="h-4 w-4" />
								</span>
								<div>
									<p className="text-muted-foreground text-xs">github</p>
									<p className="text-foreground text-sm">@kzolt</p>
								</div>
							</div>
							<span className="text-muted-foreground text-xs transition-colors group-hover:text-primary">
								{"->"}
							</span>
						</Link>

						{/* Command output style */}
						<div className="border-border border-t pt-4">
							<div className="text-muted-foreground text-xs">
								<span className="text-primary">$</span>
								<span> echo &quot;Thanks for visiting!&quot;</span>
							</div>
							<div className="mt-2 text-[var(--syntax-green)] text-xs">
								Thanks for visiting!
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
