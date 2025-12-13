import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TechPillProps {
  label: string;
  variant?: "default" | "ai" | "web3" | "fullstack";
}

const variantStyles = {
  default: "bg-secondary text-secondary-foreground",
  ai: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  web3: "bg-accent/20 text-accent border-accent/30",
  fullstack: "bg-chart-4/20 text-chart-4 border-chart-4/30",
};

export function TechPill({ label, variant = "default" }: TechPillProps) {
  const isSpecial = variant !== "default";
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge
        variant="outline"
        className={`${variantStyles[variant]} ${isSpecial ? "tech-pill-glow border" : ""} text-xs font-medium`}
        data-testid={`pill-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {label}
      </Badge>
    </motion.div>
  );
}

export function getTechVariant(tech: string): TechPillProps["variant"] {
  const aiKeywords = ["ai", "openai", "gpt", "ml", "machine learning", "tensorflow", "pytorch"];
  const web3Keywords = ["web3", "blockchain", "solidity", "ethereum", "celo", "base", "nft", "defi", "crypto"];
  
  const lowerTech = tech.toLowerCase();
  
  if (aiKeywords.some(keyword => lowerTech.includes(keyword))) return "ai";
  if (web3Keywords.some(keyword => lowerTech.includes(keyword))) return "web3";
  return "fullstack";
}
