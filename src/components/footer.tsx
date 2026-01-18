"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="px-4 md:px-8 lg:px-16 py-8 border-t border-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-primary">$</span>
            <span>echo &quot;Built with Next.js + Tailwind&quot;</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--syntax-green)]">{new Date().getFullYear()}</span>
            <span>Kevin Zoltany</span>
            <span className="text-primary cursor-blink">_</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
