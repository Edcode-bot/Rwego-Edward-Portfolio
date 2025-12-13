import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { TechPill } from "@/components/tech-pill";
import { ProjectCard } from "@/components/project-card";
import { BlogPostCard } from "@/components/blog-post-card";
import { SectionHeader } from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project, Post } from "@shared/schema";

const techFocus = [
  { label: "AI", variant: "ai" as const },
  { label: "Web3", variant: "web3" as const },
  { label: "Celo/Base", variant: "web3" as const },
  { label: "Full-Stack", variant: "fullstack" as const },
];

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const featuredProjects = projects?.filter(p => p.featured).slice(0, 3) || [];
  const recentPosts = posts?.slice(0, 3) || [];

  return (
    <div className="min-h-screen" data-testid="page-home">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, -20, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm Rwego Edward
            </motion.p>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              data-testid="heading-hero"
            >
              Building the Future with{" "}
              <span className="gradient-text">AI & Web3</span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              data-testid="text-hero-description"
            >
              Self-taught developer from Uganda, focused on building practical AI and Web3 products. 
              I learn by shipping, competing, and solving real problems.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {techFocus.map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <TechPill label={tech.label} variant={tech.variant} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link href="/projects">
                <Button size="lg" className="group" data-testid="button-view-projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" asChild data-testid="button-github">
                <a href="https://github.com/edcode" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28" data-testid="section-featured-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="A selection of my most impactful work in AI and Web3"
          />

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <Button variant="outline" size="lg" className="group" data-testid="button-all-projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card/50" data-testid="section-achievements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Latest Achievements"
            subtitle="Recent milestones, competitions, and recognitions"
          />

          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/blog">
              <Button variant="outline" size="lg" className="group" data-testid="button-view-blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
              Let's Build Something Amazing
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Open to collaborations, new opportunities, and interesting projects.
              Whether it's AI, Web3, or full-stack development – let's connect!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="group" data-testid="button-contact-cta">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:hello@edcode.dev" data-testid="button-email-cta">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  hello@edcode.dev
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
