import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Award, Code, Rocket, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { SkillChart, SkillRadar } from "@/components/skill-chart";
import { TechPill } from "@/components/tech-pill";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Skill, Achievement } from "@shared/schema";

const skills: Skill[] = [
  { name: "React/Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Framer Motion", level: 75, category: "frontend" },
  { name: "Node.js", level: 78, category: "backend" },
  { name: "Python", level: 72, category: "backend" },
  { name: "PostgreSQL", level: 70, category: "backend" },
  { name: "Express/FastAPI", level: 75, category: "backend" },
  { name: "Solidity", level: 65, category: "blockchain" },
  { name: "Ethers.js/Web3.js", level: 70, category: "blockchain" },
  { name: "Celo/Base", level: 68, category: "blockchain" },
  { name: "Smart Contracts", level: 62, category: "blockchain" },
  { name: "OpenAI API", level: 80, category: "ai" },
  { name: "LangChain", level: 65, category: "ai" },
  { name: "Machine Learning", level: 55, category: "ai" },
  { name: "Git/GitHub", level: 82, category: "tools" },
  { name: "Docker", level: 60, category: "tools" },
  { name: "Vercel/Railway", level: 78, category: "tools" },
];

const achievements: Achievement[] = [
  {
    id: "1",
    title: "UPSTU Regionals & Nationals",
    description: "Represented school at the Uganda Physics & Sciences Teachers' Union competitions",
    date: "2024",
    type: "award",
    certificateUrl: "https://drive.google.com/file/d/19c8tbX8dEweQ9YlVTia3ar1iyzC_iK0B/view",
    certificateImage: "https://drive.google.com/uc?export=view&id=19c8tbX8dEweQ9YlVTia3ar1iyzC_iK0B",
  },
  {
    id: "2", 
    title: "SESEMAT Exhibition",
    description: "Exhibited IntelliTutor AI at the Secondary Science & Mathematics Teachers conference",
    date: "2024",
    type: "award",
    certificateUrl: "https://drive.google.com/file/d/19alP6G5gVAUdVEg5TYu6J7txMIEVzWcn/view",
    certificateImage: "https://drive.google.com/uc?export=view&id=19alP6G5gVAUdVEg5TYu6J7txMIEVzWcn",
  },
  {
    id: "3",
    title: "ISCC Uganda",
    description: "Participated in the International Science & Computing Challenge",
    date: "2023",
    type: "award",
    certificateUrl: "https://drive.google.com/file/d/1xAYG8lfiHmgB8hEFyGJqLMysADZ6Q01d/view",
    certificateImage: "https://drive.google.com/uc?export=view&id=1xAYG8lfiHmgB8hEFyGJqLMysADZ6Q01d",
  },
];

const services = [
  {
    icon: Code,
    title: "AI-Powered Applications",
    description: "Chatbots, tutors, automation tools, and intelligent systems using OpenAI, LangChain, and custom ML models.",
  },
  {
    icon: Rocket,
    title: "Web3 & Blockchain",
    description: "dApps, wallets, DeFi protocols, mini-apps, and smart contracts on Celo, Base, and Ethereum.",
  },
  {
    icon: Award,
    title: "Full-Stack Development",
    description: "End-to-end web applications with modern React frontends and robust Node.js/Python backends.",
  },
];

const profileImageUrl = "https://drive.google.com/uc?export=view&id=1wATYXPoNKNK13nE85YykDm_k3afvtPUC";

export default function About() {
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null);

  return (
    <div className="min-h-screen pt-24" data-testid="page-about">
      <section className="py-16 md:py-24" data-testid="section-about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={profileImageUrl}
                    alt="Rwego Edward - Profile"
                    className="w-full h-full object-cover"
                    data-testid="img-profile"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-lg border border-border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Kampala, Uganda</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-about">
                About Me
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                I'm <strong>Rwego Edward</strong>, also known as <strong>Edcode</strong> – a self-taught 
                developer and designer from Uganda. I'm passionate about building practical products 
                that leverage AI and Web3 technologies to solve real problems.
              </p>
              <p className="text-muted-foreground mb-6">
                My journey into tech started from pure curiosity. Without formal training, I learned 
                by doing – shipping projects, competing in hackathons, and constantly pushing myself 
                to learn new things. I believe in learning by building and iterating fast.
              </p>
              <p className="text-muted-foreground mb-8">
                Today, I focus on creating AI-powered applications and blockchain solutions. From 
                intelligent tutoring systems to decentralized payment platforms, I'm always working 
                on something that pushes the boundaries of what's possible.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <TechPill label="AI/ML" variant="ai" />
                <TechPill label="Web3" variant="web3" />
                <TechPill label="React" variant="fullstack" />
                <TechPill label="TypeScript" variant="fullstack" />
                <TechPill label="Node.js" variant="fullstack" />
                <TechPill label="Solidity" variant="web3" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50" data-testid="section-skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Skills & Expertise"
            subtitle="Technologies and tools I work with"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SkillRadar skills={skills} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SkillChart skills={skills} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What I Do"
            subtitle="Specialized services I offer"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50" data-testid="section-achievements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Achievements & Recognition"
            subtitle="Milestones and certifications"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer hover-elevate group"
                  onClick={() => setSelectedCertificate(achievement)}
                  data-testid={`card-achievement-${achievement.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img
                      src={achievement.certificateImage}
                      alt={`${achievement.title} Certificate`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid={`img-certificate-${achievement.id}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      {achievement.date}
                    </div>
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCertificate?.title}</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={selectedCertificate.certificateImage}
                  alt={`${selectedCertificate.title} Certificate`}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">{selectedCertificate.description}</p>
                <Button asChild>
                  <a 
                    href={selectedCertificate.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-certificate-external"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
