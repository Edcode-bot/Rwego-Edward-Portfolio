import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TechPill, getTechVariant } from "@/components/tech-pill";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group overflow-visible hover-elevate active-elevate-2 transition-all duration-300"
        data-testid={`card-project-${project.id}`}
      >
        <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center p-8">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"}
            alt={project.title}
            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
            data-testid={`img-project-${project.id}`}
          />
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-semibold text-lg leading-tight" data-testid={`text-project-title-${project.id}`}>
              {project.title}
            </h3>
            <TechPill 
              label={project.category} 
              variant={project.category.toLowerCase() === "ai" ? "ai" : project.category.toLowerCase() === "web3" ? "web3" : "fullstack"} 
            />
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`text-project-description-${project.id}`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <TechPill key={tech} label={tech} variant={getTechVariant(tech)} />
            ))}
            {project.techStack.length > 4 && (
              <TechPill label={`+${project.techStack.length - 4}`} />
            )}
          </div>

          <Link href={`/projects/${project.id}`}>
            <Button variant="ghost" className="w-full group/btn" data-testid={`button-project-details-${project.id}`}>
              View Details
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
