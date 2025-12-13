import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TechPill, getTechVariant } from "@/components/tech-pill";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="aspect-video w-full rounded-xl mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24" data-testid="page-project-detail">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/projects">
            <Button variant="ghost" className="mb-8" data-testid="button-back-projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-accent/20">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                data-testid="img-project-detail"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/30">{project.title[0]}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TechPill 
                  label={project.category} 
                  variant={project.category.toLowerCase() === "ai" ? "ai" : project.category.toLowerCase() === "web3" ? "web3" : "fullstack"} 
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold" data-testid="heading-project-title">
                {project.title}
              </h1>
            </div>

            <div className="flex gap-3">
              {project.liveUrl && (
                <Button asChild data-testid="button-live-demo">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild data-testid="button-view-code">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-8" data-testid="text-project-description">
            {project.description}
          </p>

          {project.longDescription && (
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
              <p>{project.longDescription}</p>
            </div>
          )}

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechPill key={tech} label={tech} variant={getTechVariant(tech)} />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">Active Development</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{project.category}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <p className="font-medium">{project.featured ? "Yes" : "No"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
