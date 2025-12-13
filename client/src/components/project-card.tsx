import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
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
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-testid={`img-project-${project.id}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/30">{project.title[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {project.liveUrl && (
              <Button size="sm" variant="secondary" className="backdrop-blur-sm bg-white/90 dark:bg-black/80" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-project-live-${project.id}`}>
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="secondary" className="backdrop-blur-sm bg-white/90 dark:bg-black/80" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-project-github-${project.id}`}>
                  <Github className="h-3 w-3 mr-1" />
                  Code
                </a>
              </Button>
            )}
          </div>
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
