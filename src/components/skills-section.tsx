"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Palette, Terminal } from "lucide-react";

const skills = [
  {
    category: "languages",
    icon: <Code2 className="w-4 h-4" />,
    items: ["C++", "C#", "C", "Rust", "TypeScript", "JavaScript"],
    color: "var(--syntax-blue)",
  },
  {
    category: "graphics",
    icon: <Palette className="w-4 h-4" />,
    items: ["Vulkan", "Direct3D", "OpenTK", "Ray Tracing", "Game Engines"],
    color: "var(--syntax-purple)",
  },
  {
    category: "frontend",
    icon: <Terminal className="w-4 h-4" />,
    items: ["React", "Next.js", "Svelte", "Tailwind CSS"],
    color: "var(--syntax-green)",
  },
  {
    category: "systems",
    icon: <Cpu className="w-4 h-4" />,
    items: ["Embedded", "Arduino", "Robotics", "Low-Level"],
    color: "var(--syntax-orange)",
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
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-4 md:px-8 lg:px-16 py-16 scroll-mt-8">
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
            <span className="text-muted-foreground">cat skills.json | jq</span>
          </div>
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-primary" />
            <h2 className="text-lg text-foreground">Technical Skills</h2>
            <span className="h-px flex-1 bg-border" />
          </div>
        </motion.div>

        {/* Skills as JSON-like structure */}
        <motion.div
          className="bg-card border border-border p-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="text-sm">
            <span className="text-[var(--syntax-yellow)]">{"{"}</span>
          </div>

          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              variants={itemVariants}
              className="pl-4 py-2"
            >
              <div className="flex items-start gap-2">
                <span style={{ color: skillGroup.color }}>&quot;{skillGroup.category}&quot;</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-[var(--syntax-yellow)]">[</span>
              </div>
              <div className="pl-4 flex flex-wrap gap-x-1">
                {skillGroup.items.map((skill, index) => (
                  <span key={skill} className="text-sm">
                    <span className="text-[var(--syntax-green)]">&quot;{skill}&quot;</span>
                    {index < skillGroup.items.length - 1 && (
                      <span className="text-muted-foreground">, </span>
                    )}
                  </span>
                ))}
              </div>
              <div>
                <span className="text-[var(--syntax-yellow)]">]</span>
                {groupIndex < skills.length - 1 && (
                  <span className="text-muted-foreground">,</span>
                )}
              </div>
            </motion.div>
          ))}

          <div className="text-sm">
            <span className="text-[var(--syntax-yellow)]">{"}"}</span>
          </div>
        </motion.div>

        {/* Visual skill indicators */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.category}
              variants={itemVariants}
              className="group bg-card border border-border p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: skillGroup.color }}>{skillGroup.icon}</span>
                <span className="text-xs text-foreground uppercase tracking-wider">
                  {skillGroup.category}
                </span>
              </div>
              <div className="space-y-1">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: skillGroup.color }} />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
