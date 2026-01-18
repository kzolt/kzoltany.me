"use client";

import React, { useState } from "react";
import { Github, Mail, Send, Terminal, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative px-4 md:px-8 lg:px-16 py-16 scroll-mt-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-primary">$</span>
            <span className="text-muted-foreground">./send-message.sh</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[var(--syntax-cyan)]" />
            <h2 className="text-lg text-foreground">Get in Touch</h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Form - Terminal Style */}
          <motion.div
            className="bg-card border border-border overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-muted-foreground">compose-message.sh</span>
              <Terminal className="w-3 h-3 text-muted-foreground" />
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-[var(--syntax-green)] mb-4" />
                    <p className="text-foreground mb-2">Message sent successfully!</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-[var(--syntax-green)]">exit code: 0</span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Name field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-[var(--syntax-purple)]">const</span>
                        <span className="text-[var(--syntax-blue)]">name</span>
                        <span>=</span>
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder='"Your Name"'
                        required
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-[var(--syntax-purple)]">const</span>
                        <span className="text-[var(--syntax-blue)]">email</span>
                        <span>=</span>
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder='"you@example.com"'
                        required
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-[var(--syntax-purple)]">const</span>
                        <span className="text-[var(--syntax-blue)]">message</span>
                        <span>=</span>
                        <span className="text-[var(--syntax-yellow)]">{"`"}</span>
                      </label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Your message here..."
                        required
                      />
                      <div className="text-xs text-muted-foreground">
                        <span className="text-[var(--syntax-yellow)]">{"`"}</span>
                        <span>;</span>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-pulse">Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>$ ./send.sh</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* README style message */}
            <div className="bg-card border border-border p-6">
              <div className="text-sm text-muted-foreground mb-4">
                <span className="text-[var(--syntax-purple)]"># </span>
                <span>README.md</span>
              </div>
              
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-[var(--syntax-blue)]">## </span>
                  <span className="text-foreground">Contact</span>
                </p>
                <p>
                  I&apos;m always interested in discussing new projects, creative ideas, 
                  or opportunities to be part of something amazing.
                </p>
                <p>
                  Whether you have a question or just want to say hi, feel free to 
                  send a message!
                </p>
              </div>
            </div>

            {/* GitHub link */}
            <div className="text-sm text-muted-foreground mb-4">
              <span className="text-primary">$</span>
              <span> echo $SOCIAL_LINKS</span>
            </div>

            <Link
              href="https://github.com/kzolt"
              target="_blank"
              className="group flex items-center justify-between p-4 bg-card border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">github</p>
                  <p className="text-sm text-foreground">@kzolt</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                {"->"}
              </span>
            </Link>

            {/* Command output style */}
            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <span className="text-primary">$</span>
                <span> echo &quot;Thanks for visiting!&quot;</span>
              </div>
              <div className="text-xs text-[var(--syntax-green)] mt-2">
                Thanks for visiting!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
