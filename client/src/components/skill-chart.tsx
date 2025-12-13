import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

interface SkillChartProps {
  skills: Skill[];
}

const categoryColors: Record<Skill["category"], string> = {
  frontend: "from-chart-3 to-chart-3/60",
  backend: "from-chart-2 to-chart-2/60",
  blockchain: "from-accent to-accent/60",
  ai: "from-chart-1 to-chart-1/60",
  tools: "from-chart-4 to-chart-4/60",
};

const categoryLabels: Record<Skill["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  blockchain: "Blockchain",
  ai: "AI & ML",
  tools: "Tools",
};

export function SkillChart({ skills }: SkillChartProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<Skill["category"], Skill[]>);

  return (
    <div className="space-y-8" data-testid="skill-chart">
      {(Object.keys(groupedSkills) as Skill["category"][]).map((category) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            {categoryLabels[category]}
          </h4>
          <div className="space-y-3">
            {groupedSkills[category].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
                data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${categoryColors[category]} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillRadar({ skills }: SkillChartProps) {
  const categories = ["frontend", "backend", "blockchain", "ai", "tools"] as const;
  const avgByCategory = categories.map(cat => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length === 0) return 0;
    return catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length;
  });

  const points = avgByCategory.map((level, i) => {
    const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
    const radius = (level / 100) * 80;
    return {
      x: 100 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle),
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative w-full max-w-xs mx-auto" data-testid="skill-radar">
      <svg viewBox="0 0 200 200" className="w-full h-auto">
        {[20, 40, 60, 80, 100].map((level) => {
          const r = (level / 100) * 80;
          return (
            <polygon
              key={level}
              points={categories.map((_, i) => {
                const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
                return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
              }).join(' ')}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
          );
        })}

        {categories.map((_, i) => {
          const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 80 * Math.cos(angle)}
              y2={100 + 80 * Math.sin(angle)}
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
          );
        })}

        <motion.path
          d={pathD}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {categories.map((cat, i) => {
          const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2;
          const labelRadius = 95;
          return (
            <text
              key={cat}
              x={100 + labelRadius * Math.cos(angle)}
              y={100 + labelRadius * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs"
            >
              {categoryLabels[cat]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
